"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const Config = require("config");
async function bootstrap(config) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({ logger: true }));
    await app.listen(config.port, config.host);
    common_1.Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');
}
bootstrap(Config.get('server'));
//# sourceMappingURL=main.js.map