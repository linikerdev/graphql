import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLDirective } from "graphql/type/directives";
import { PostInstance } from '../../../models/PostModel';
import { Transaction } from 'sequelize';

export const postResolvers = {
    Post: {
        author: (post, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.User
                .findById(post.get('id'));
        },
        comments: (post, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.Comment
                .findAll({
                    where: { post: post.get('id') },
                    limit: first,
                    offset: offset
                })
        }
    },

    Query: {
        posts: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.Post
                .findAll({
                    limit: first,
                    offset: offset
                });
        },
        post: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.Post
                .findById(id)
                .then((post: PostInstance) => {
                    if (!post) throw new Error(`post with id ${id} not found`);
                    return post;
                })
        }
    },

    Mutation: {
        createPost: (parent, { input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .create(input, { transaction: t });
            });
        },
        updatePost: (parent, { id, input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id: { parseInt(id) };
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        if (!post) throw new Error(`post with id ${id} not found`);
                        return post.update(input, { transaction: t });
                    });
            });
        },
        deletePost: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id: { parseInt(id) };
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        if (!post) throw new Error(`post with id ${id} not found`);
                        return post.destroy({ transaction: t })
                            .then((post) => !!post);
                    });
            });
        },

    }
}
/*
 type Post 
 createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostUpdateInput!): Post
    deletepost(id: ID!): Boolean

*/