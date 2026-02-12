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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const invites_service_1 = require("../invites/invites.service");
let AuthService = class AuthService {
    constructor(users, invites, jwt) {
        this.users = users;
        this.invites = invites;
        this.jwt = jwt;
    }
    verifyTelegram(initData) {
        const params = new URLSearchParams(initData);
        const hash = params.get('hash');
        params.delete('hash');
        const data = [...params.entries()]
            .sort()
            .map(([k, v]) => `${k}=${v}`)
            .join('\n');
        const secret = crypto
            .createHash('sha256')
            .update(process.env.TG_BOT_TOKEN)
            .digest();
        const check = crypto
            .createHmac('sha256', secret)
            .update(data)
            .digest('hex');
        if (check !== hash)
            throw new Error('Invalid Telegram');
        return Object.fromEntries(params);
    }
    async login(initData, startParam) {
        const tg = this.verifyTelegram(initData);
        const user = await this.users.findOrCreate(tg.id);
        if (startParam?.startsWith('ref_') && !user.inviterId) {
            const inviterId = startParam.replace('ref_', '');
            await this.invites.link(inviterId, user.id);
        }
        return {
            token: this.jwt.sign({ sub: user.id })
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        invites_service_1.InvitesService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map