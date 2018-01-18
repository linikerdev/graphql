"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHttp = require("express-graphql");
const Schema = require("./graphql/schema");
class App {
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
        this.express.use('/graphql', graphqlHttp({
            schema: Schema,
            graphiql: true
        }));
    }
}
exports.default = new App().express;
