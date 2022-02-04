const graph = require('./graph')
const { resolveDid, providers } = require('@spec.dev/did')
const { GET_USER_DID_PAIR, CREATE_USER, CREATE_DID } = require('./queries')
const { textRecordFields } = require('./constants')

async function getUserById(id) {
    const { data, error } = await graph.query(GET_USER_DID_PAIR, { id })
    return { user: data?.user, error }
}

async function createUser(attrs) {
    const { data, error } = await graph.mutate(CREATE_USER, attrs)
    return { user: data?.createUser?.user, error }
}

async function createDidIfExists(address) {
    let { data, error } = await resolveDid(address, providers.ENS, textRecordFields)
    if (!data || error) return { did: null, error }

    const { domain, textRecords = {} } = data

    ;({ data, error } = await graph.mutate(CREATE_DID, {
        userId: address,
        domain: domain,
        provider: providers.ENS,
        email: textRecords.email,
        url: textRecords.url,
        avatar: textRecords.avatar,
        name: textRecords.name,
        description: textRecords.description,
    }))

    if (error) return { did: null, error }

    return {
        did: data?.createDid?.did || null,
        error: null,
    }
}

module.exports = {
    getUserById,
    createUser,
    createDidIfExists,
}