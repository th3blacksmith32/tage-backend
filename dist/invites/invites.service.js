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
exports.InvitesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invite_entity_1 = require("./invite.entity");
const users_service_1 = require("../users/users.service");
let InvitesService = class InvitesService {
    constructor(repo, users) {
        this.repo = repo;
        this.users = users;
    }
    async link(inviterId, invitedId) {
        await this.repo.save({ inviterId, invitedUserId: invitedId });
        await this.users.setInviter(invitedId, inviterId);
    }
    async reward(invitedId, amount) {
        const invite = await this.repo.findOne({
            where: { invitedUserId: invitedId }
        });
        if (!invite)
            return;
        const bonus = amount * 0.1;
        await this.users.addBalance(invite.inviterId, bonus);
    }
};
exports.InvitesService = InvitesService;
exports.InvitesService = InvitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invite_entity_1.Invite)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], InvitesService);
