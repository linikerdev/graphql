
import * as Sequelize from 'sequelize';
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
// import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
// import { encode } from 'punycode';
import { ModelsInterface } from '../interfaces/ModelsInterface';


export interface PostAttributes {
    id?: number;
    title?: string;
    author?: string;
    content?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes> { }

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttributes> { }

export default (sequelize: Sequelize.Sequelize, Datatypes: Sequelize.DataTypes): PostModel => {

    const Post: PostModel = sequelize.define('Post', {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false
        },
        content: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        photo: {
            type: Datatypes.BLOB({
                length: 'long'
            }),
            allowNull: true
        }

    }, {
            tableName: 'posts'
        });

    Post.associate = (models: ModelsInterface): void => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        })
    }

    // User.prototype.isPassword = (encodePassword: string, password: string): boolean => {
    //     return compareSync(password, encodePassword);
    // }

    return Post;
}
