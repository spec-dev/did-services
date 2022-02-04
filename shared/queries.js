const { gql } = require('@spec.dev/gql')

const GET_USER_DID_PAIR = gql`
    query getUserDidPair($id: String!) {
        user(id: $id) {
            id
            did {
                domain
                provider
                email
                url
                avatar
                name
                description
            }
            createdAt
        }
    }
`

const CREATE_USER = gql`
    mutation createUser($id: String!) {
        createUser(input: { user: { id: $id }}) {
            user {
                id
                createdAt
            }
        }
    }
`

const CREATE_DID = gql`
    mutation createDid(
        $userId: String!
        $domain: String!
        $provider: String!
        $email: String
        $url: String
        $avatar: String
        $name: String
        $description: String
    ) {
        createDid(input: { did: {
            userId: $userId
            domain: $domain
            provider: $provider
            email: $email
            url: $url
            avatar: $avatar
            name: $name
            description: $description
        }}) {
            did {
                domain
                provider
                email
                url
                avatar
                name
                description
            }
        }
    }
`

module.exports = {
    GET_USER_DID_PAIR,
    CREATE_USER,
    CREATE_DID,
}