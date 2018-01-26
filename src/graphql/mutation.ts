import { userMutation } from './resources/user/user.schema';
import { postMutation } from './resources/post/post.schema';
import { commentMutation } from './resources/comment/comment.schema';

const Mutation = `
    type Mutation {
        ${commentMutation}
        ${postMutation}
        ${userMutation}
        
    }
`;

export {
    Mutation
}
