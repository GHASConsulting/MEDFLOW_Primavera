"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
const oracledb_1 = __importDefault(require("oracledb"));
oracledb_1.default.initOracleClient({ libDir: process.env.ORACLE_DIR });
const databaseConfig = {
    client: 'oracledb',
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECTION_STRING,
        pool: {
            min: 1,
            max: 50,
        },
    },
};
/** @description Database connection */
const knex = (0, knex_1.knex)(databaseConfig);
exports.default = knex;
