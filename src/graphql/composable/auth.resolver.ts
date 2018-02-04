import { GraphQLFieldResolver } from 'graphql';
import { ResolverContext } from './../../interfaces/ResolverContextInterface';
import { ComposableResolver } from './composable.resolver';
import { resolve } from 'path';

export const authResolver: ComposableResolver<any, ResolverContext> =
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {
        
        return (parent, args, context: ResolverContext, info) => {

            if (context.user || context.authorization) {
                return resolver(parent, args, context, info);
            }
            throw new Error('Unauthorizad! Token not provided !');
        }
    }