import { userMutation } from './resources/user/user.schema';
import { postMutation } from './resources/post/post.schema';
import { commentMutation } from './resources/comment/comment.schema';
import { tokenMutation } from './resources/token/token.schema';

const Mutation = `
    type Mutation {
        ${tokenMutation}
        ${commentMutation}
        ${postMutation}
        ${userMutation}
        
    }
`;

export {
    Mutation
}
