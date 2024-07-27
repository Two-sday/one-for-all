"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs/promises");
const path = require("path");
const app_service_1 = require("./app.service");
const class_serializer_intercepter_1 = require("./common/intercepter/class-serializer.intercepter");
const auth_service_1 = require("./auth/auth.service");
const excute_root_domain_1 = require("./auth/util/excute-root-domain");
const url_decorator_1 = require("./common/decorator/url.decorator");
const getServerUrl_1 = require("./common/util/getServerUrl");
let AppController = class AppController {
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    async getHello(req, redirect, url, res) {
        const refreshCookie = req.cookies.refreshToken;
        const redirectCookie = req.cookies.redirect || '/';
        const redirectUrl = this.appService.checkRedirect(redirect)
            ? redirect
            : (0, getServerUrl_1.getServerUrl)();
        if (refreshCookie) {
            try {
                this.authService.verifyToken(refreshCookie, true);
                res.cookie('refreshToken', refreshCookie, {
                    domain: (0, excute_root_domain_1.excuteRootDomain)(redirectUrl),
                    path: '/',
                });
                res.cookie('redirect', '', {
                    domain: (0, excute_root_domain_1.excuteRootDomain)(url),
                    path: '/',
                    maxAge: 0,
                });
                return res.redirect(redirectCookie);
            }
            catch (e) {
                res.cookie('refreshToken', '', {
                    maxAge: 0,
                    domain: (0, excute_root_domain_1.excuteRootDomain)(url),
                    path: '/',
                });
                return res.redirect('/login');
            }
        }
        else {
            res.cookie('redirect', redirectUrl, {
                domain: (0, excute_root_domain_1.excuteRootDomain)(url),
                path: '/',
            });
            const html = await fs.readFile(path.resolve(__dirname, '../public/index.html'), 'utf-8');
            return res.send(html);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('redirect')),
    __param(2, (0, url_decorator_1.Url)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseInterceptors)(class_serializer_intercepter_1.CustomClassSerializerInterceptor),
    __metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map