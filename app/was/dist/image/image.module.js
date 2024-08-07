"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModule = void 0;
const common_1 = require("@nestjs/common");
const image_controller_1 = require("./image.controller");
const image_service_1 = require("./image.service");
const aws_module_1 = require("../aws/aws.module");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
const common_module_1 = require("../common/common.module");
const typeorm_1 = require("@nestjs/typeorm");
const image_entity_1 = require("./entity/image.entity");
let ImageModule = class ImageModule {
};
exports.ImageModule = ImageModule;
exports.ImageModule = ImageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            aws_module_1.AwsModule,
            user_module_1.UserModule,
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([image_entity_1.ImageModel]),
        ],
        controllers: [image_controller_1.ImageController],
        providers: [image_service_1.ImageService],
    })
], ImageModule);
//# sourceMappingURL=image.module.js.map