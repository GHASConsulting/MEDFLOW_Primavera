"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = healthCheck;
async function healthCheck(app) {
    app.get('/', async () => {
        return 'Health Check';
    });
}
