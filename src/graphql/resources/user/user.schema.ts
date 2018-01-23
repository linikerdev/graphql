const usertypes = `

    #
    type User {
        id: ID!
        name: String!
        email: String!
        photo: String!
        createdAt: String!
        updatedAt: String!
    }

    input userCreateInput {
        name: String!
        email: String!
        password: String!
    }

    input userUpdateInput {
        name: String!
        email: String!
        photo: String
    }

    input userUpdatePasswordInput {
        password: String!
    }
`;

const userQueries = `
    users(first: Int, offset: Int): [user!]
    user(id: ID!): user
`;

const userMutation = `
    createUser(input: userCreateInput!): user
    updateUser(id: ID!, input: userUpdateInput!): user
    updateUserPassword(id: ID!, input: userUpdatePasswordInput!): Boolean
    deleteuser(id: ID!): Boolean
`;

export {
    usertypes,
    userQueries,
    userMutation
}