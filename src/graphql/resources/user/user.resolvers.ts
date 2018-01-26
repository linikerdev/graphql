import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLDirective } from "graphql/type/directives";
import { UserInstance } from '../../../models/UserModel';
import { Transaction } from 'sequelize';
import { handleError } from '../../../utils/utils';



export const userResolvers = {
    User: {
        posts: (user, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.Post
                .findAll({
                    where: { author: user.get('id') },
                    limit: first,
                    offset: offset
                }).catch(handleError);
        }
    },
    Query: {
        users: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                }).catch(handleError);
        },
        user: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id = parseInt(id);
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if (!user) throw new Error(`user with id ${id} not found`);
                    return user;
                }).catch(handleError);
        }
    },

    Mutation: {
        createUser: (parent, { input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            return db.sequelize.transaction((t: Transaction) => {
                console.log('chamando');
                return db.User
                    .create(input, { transaction: t });
            }).catch(handleError);
        },
        updateUser: (parent, { id, input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found`);
                        return user.update(input, { transaction: t });
                    });
            }).catch(handleError);
        },
        updateUserPassword: (parent, { id, input }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found`);
                        return user.update(input, { transaction: t })
                            .then((user: UserInstance) => !!user);
                    });
            }).catch(handleError);
        },
        deleteUser: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLDirective) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found`);
                        return user.destroy({ transaction: t })
                            .then((user) => !!user);
                    });
            }).catch(handleError);
        },

    }
}