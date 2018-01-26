import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLDirective } from "graphql/type/directives";
import { UserInstance } from '../../../models/UserModel';

export const userResolvers = {
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
    }
}