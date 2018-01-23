import { userMutation } from './resources/user/user.schema';

const Mutation = `
    type Mutation {
        ${userMutation}
    }
`;

export {
    Mutation
}
