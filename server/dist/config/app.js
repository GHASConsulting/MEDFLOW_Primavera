"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const cors_1 = __importDefault(require("@fastify/cors"));
const healthCheckRoutes_1 = require("../modules/healthCheck/healthCheckRoutes");
const promptuaryRoutes_1 = require("../modules/promptuary/promptuaryRoutes");
const app = (0, fastify_1.fastify)();
const apiPort = Number(process.env.PORT);
app.register(cors_1.default, {
    origin: true,
});
app.register(healthCheckRoutes_1.healthCheck);
app.register(promptuaryRoutes_1.promptuary);
app.setErrorHandler((error, _request, reply) => {
    console.log(error);
    return reply.status(500).send({ message: error });
});
app
    .listen({
    host: '0.0.0.0',
    port: apiPort,
})
    .then(() => {
    console.log(`HTTP server running on http://localhost:${apiPort}`);
});
