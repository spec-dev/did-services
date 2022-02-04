const { SpecGraphClient } = require('@spec.dev/gql')

const graph = new SpecGraphClient(
    process.env.SPEC_URL,
    process.env.SPEC_KEY,
)

module.exports = graph