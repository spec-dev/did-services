const graph = require('./graph')
const { addressToUserId, formatDidRecord } = require('./mappings')
const { resolveDid, providers } = require('@spec.dev/did')
const { GET_DID_BY_USER_ID, UPSERT_USER, UPSERT_DID } = require('./queries')
const { textRecordFields } = require('./constants')

async function getDidByUserId(userId) {
    const { data, error } = await graph.query(GET_DID_BY_USER_ID, { userId })
    return { did: data?.did, error }
}

async function fetchDidFromProvider(address) {
    const { data, error } = await resolveDid(address, providers.ENS, textRecordFields)

    if (error === 'timeout') {
        console.error(`Got DID timeout for address ${address}`)
        return { data: null, error: null }
    }

    if (data) {
        data.provider = providers.ENS
    }

    return { data, error }
}

async function upsertUserDidPair(address, didData) {
    // Upsert user by id.
    const { user, error: userError } = await upsertUser(addressToUserId(address))
    if (userError) {
        return { user: null, did: null, error: userError }
    }
    if (!user) {
        return { user: null, did: null, error: 'got null result to upserting user' }
    }

    // Upsert DID for user.
    const { did, error: didError } = await upsertDid(formatDidRecord(address, didData))
    if (didError) {
        return { user, did: null, error: didError }
    }
    if (!did) {
        return { user, did: null, error: 'got null result to upserting DID' }
    }

    return { user, did, error: null }
}

async function upsertUser(id) {
    const { data, error } = await graph.mutate(UPSERT_USER, { id })
    return { user: data?.upsertUser?.user, error }
}

async function upsertDid(attrs) {
    const { data, error } = await graph.mutate(UPSERT_DID, attrs)
    return { did: data?.upsertDid?.did, error }
}

module.exports = {
    getDidByUserId,
    fetchDidFromProvider,
    upsertUserDidPair,
}