
import * as Sequelize from 'sequelize';
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { encode } from 'punycode';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {

    isPassword(
        encodedPassword: string,
        password: string
    ): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> { }

export default (sequelize: Sequelize.Sequelize, Datatypes: Sequelize.DataTypes): UserModel => {

    const User: UserModel = sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING(128),
            allowNull: false
        },
        email: {
            type: Datatypes.INTEGER,
            allowNull: false,
            unique: true
        },
        password: {
            type: Datatypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: Datatypes.BLOB({
                length: 'long'
            }),
            allowNull: true
        }

    },
        {
            tableName: 'users',
            hooks: {
                beforeCreate: (User: UserInstance, options: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync();
                    User.password = hashSync(User.password, salt);
                }
            }
        });

    User.associate = (models: ModelsInterface): void => { }

    User.prototype.isPassword = (encodePassword: string, password: string): boolean => {
        return compareSync(password, encodePassword);
    }

    return User;
}
