const { getDidByUserId, fetchDidFromProvider, upsertUserDidPair } = require('./shared/helpers')
const { addressToUserId, formatDidRecord } = require('./shared/mappings')
const graph = require('./shared/graph')

const DEFAULT_OPTIONS = {
    /**
     * Whether to persist the DID result to storage.
     */
    persist: true,
    /**
     * Whether to fetch & update DID data from source,
     * even if a DID record for this user already exists in storage.
     */
    resync: false,
}

let opts, did, data, error

/**
 * Resolve (and optionally save) the DID for a given user address.
 *
 * @param {string} address The address to fetch the DID for.
 * @param {object} options See DEFAULT_OPTIONS above.
 * @param {object} context Request context.
 */
async function getDid(address, options, { headers }) {
    // Assume auth role of function caller.
    graph.useAuthHeader(headers)

    // Parse options.
    opts = { ...DEFAULT_OPTIONS, ...(options || {}) }

    // Get existing DID from storage if not resyncing data.
    if (!opts.resync) {
        ;({ did, error } = await getDidByUserId(addressToUserId(address)))
        if (error) throw error
        if (did) return { did }
    }

    // Fetch DID data from source.
    ;({ data, error } = await fetchDidFromProvider(address))
    if (error) throw error
    if (!data) return { did: null }

    // If not persisting data to storage, still return the DID data formatted as a record.
    if (!opts.persist) {
        return { did: formatDidRecord(address, data) }
    }

    // Upsert User/DID pair in storage.
    ;({ did, error } = await upsertUserDidPair(address, data))
    if (error) throw error

    return { did }
}

module.exports = getDid