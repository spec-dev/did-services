const { gql } = require('@spec.dev/gql')

const GET_DID_BY_USER_ID = gql`
    query getDidByUserId($userId: String!) {
        did(userId: $userId) {
            userId
            domain
            provider
            email
            url
            avatar
            name
            description
        }
    }
`

const UPSERT_USER = gql`
    mutation upsertUser($id: String!) {
        upsertUser(
            where: { id: $id }
            input: {
                user: {
                    id: $id
                }
            }
        ) {
            user {
                id
                createdAt
            }
        }
    }
`

const UPSERT_DID = gql`
    mutation upsertDid(
        $userId: String!
        $domain: String!
        $provider: String!
        $email: String
        $url: String
        $avatar: String
        $name: String
        $description: String
    ) {
        upsertDid(
            where: { userId: $userId }
            input: {
                did: {
                    userId: $userId
                    domain: $domain
                    provider: $provider
                    email: $email
                    url: $url
                    avatar: $avatar
                    name: $name
                    description: $description
                }
            }
        ) {
            did {
                userId
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
    GET_DID_BY_USER_ID,
    UPSERT_USER,
    UPSERT_DID,
}