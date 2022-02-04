const { getUserById } = require('./shared/helpers')
const graph = require('./shared/graph')

async function getUserDid(address, { headers }) {
    // Assume auth role of function caller.
    graph.useAuthHeader(headers)

    // Find existing user:did pair by address.
    const { user, error } = await getUserById(address)
    if (error) throw error

    return { user }
}

module.exports = getUserDid