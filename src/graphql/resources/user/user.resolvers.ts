import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLDirective } from "graphql/type/directives";
import { UserInstance } from '../../../models/UserModel';
import { Transaction } from 'sequelize';

export const userResolvers = {
    User: {
        posts: (user, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.Post
                .findAll({
                    where: { author: user.get('id') },
                    limit: first,
                    offset: offset
                })
        }
    },
    Query: {
        users: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                });
        },
        user: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if (!user) throw new Error(`user with id ${id} not found`);
                    return user;
                })
        }
    },

    Mutation: {
        createUser: (parent, { input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .create(input, { transaction: t });
            });
        },
        updateUser: (parent, { id, input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id: { parseInt(id) };
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found`);
                        return user.update(input, { transaction: t });
                    });
            });
        },
        updateUserPassword: (parent, { id, input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id: { parseInt(id) };
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found`);
                        return user.update(input, { transaction: t })
                            .then((user: UserInstance) => !!user);
                    });
            });
        },
        deleteUser: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id: { parseInt(id) };
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found`);
                        return user.destroy({ transaction: t })
                            .then((user) => !!user);
                    });
            });
        },

    }
}