"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = makeRequest;
const axios_1 = __importDefault(require("axios"));
/** @description Performs the request regardless of the configuration */
async function makeRequest(options) {
    try {
        const response = await (0, axios_1.default)(options)
            .then(function (response) {
            return response;
        })
            .catch((err) => {
            return err.response;
        });
        return response;
    }
    catch (error) {
        return error;
    }
}
