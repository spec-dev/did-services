const { getUserById, createUser, createDidIfExists } = require('./shared/helpers')
const graph = require('./shared/graph')

let user, did, error

async function createUserDid(address, { headers }) {
    // Assume auth role of function caller.
    graph.useAuthHeader(headers)

    // Find existing user:did pair by address.
    ;({ user, error } = await getUserById(address))
    if (error) throw error

    // Create user if doesn't exist yet.
    if (!user) {
        ;({ user, error } = await createUser({ id: address }))
        if (error) throw error
    }
    if (!user) throw `Failed to find or create user: ${address}`

    // Upsert DID for user.
    if (!user.did) {
        ;({ did, error } = await createDidIfExists(address))
        if (error) throw error
        user.did = did
    }

    return { user }
}

module.exports = createUserDid