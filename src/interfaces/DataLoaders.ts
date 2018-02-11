import { UserInstance } from './../models/UserModel';
import * as DataLoader from 'dataloader';
import { PostInstance } from '../models/PostModel';

export interface DataLoaders {

    userLoader: DataLoader<number, UserInstance>;
    postLoader: DataLoader<number, PostInstance>;



}