
import * as Sequelize from 'sequelize';
import { BaseModelInterface } from "../interfaces/BaseModelInterface";

export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;

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

    });

    return User;
}
