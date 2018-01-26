import { handleError } from './../../../utils/utils';
import { CommentInstance } from './../../../models/CommentModel';
import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLDirective } from "graphql/type/directives";
import { Transaction } from 'sequelize';

export const commentResolvers = {

    Comment: {
        user: (comment, args, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.User
                .findById(comment.get('user'))
                .catch(handleError);
        },
        posts: (comment, args, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.Post
                .findById(comment.get('post'))
                .catch(handleError);
        }
    },
    Query: {
        commentsByPost: (parent, { postId, first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            postId = parseInt(postId);
            return db.Comment
                .findAll({
                    where: { post: postId },
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        }
    },

    Mutation: {
        createComment: (parent, { input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .create(input, { transaction: t });
            }).catch(handleError);
        },
        updateComment: (parent, { id, input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        if (!comment) throw new Error(`comment with id ${id} not found`);
                        return comment.update(input, { transaction: t });
                    });
            }).catch(handleError);
        },
        deleteComment: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        if (!comment) throw new Error(`comment with id ${id} not found`);
                        return comment.destroy({ transaction: t })
                            .then((comment) => !!comment);
                    });
            }).catch(handleError);
        }

    }
}