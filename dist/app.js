"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHttp = require("express-graphql");
const schema = require("./graphql/schema");
class App {
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
        this.express.use('/graphql', graphqlHttp({
            schema: schema
        }));
    }
}
exports.default = new App().express;
