const postTypes = `
    type Post {
        id: ID!
        title: String!
        content: String!
        photo: String!
        createdAt: String!
        updatedAt: String!
        author: User!
        comments(first: Int, offset: Int): [ Comment! ]!
    }

    input PostInput {
        title: String!
        content: String!
        photo: String!
        author: Int!
    }

    input PostUpdateInput {
        name: String!
        email: String!
        photo: String
    }
`;

const postQueries = `
    posts(first: Int, offset: Int): [Post!]
    post(id: ID!): Post
`;

const postMutation = `
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostUpdateInput!): Post
    deletepost(id: ID!): Boolean
`;

export {
    postTypes,
    postQueries,
    postMutation
}