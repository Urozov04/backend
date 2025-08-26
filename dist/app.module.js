"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const config_1 = require("./config");
const user_entity_1 = require("./user/entities/user.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const images_module_1 = require("./image/images.module");
const image_entity_1 = require("./image/entities/image.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: config_1.default.DB_URL,
                synchronize: true,
                autoLoadEntities: true,
                entities: [user_entity_1.UserEntity, image_entity_1.FileEntity],
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.resolve)(__dirname, '..', '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            jwt_1.JwtModule.register({ global: true }),
            user_module_1.UserModule,
            images_module_1.ImagesModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: cache_manager_1.CacheInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map