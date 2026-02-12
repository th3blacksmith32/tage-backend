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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_task_entity_1 = require("./user-task.entity");
const users_service_1 = require("../users/users.service");
const invites_service_1 = require("../invites/invites.service");
let TasksService = class TasksService {
    constructor(repo, users, invites) {
        this.repo = repo;
        this.users = users;
        this.invites = invites;
    }
    async start(userId, taskId) {
        return this.repo.save({
            userId,
            taskId,
            startedAt: new Date()
        });
    }
    async claim(userId, taskId, reward) {
        const record = await this.repo.findOne({
            where: { userId, taskId }
        });
        if (!record)
            throw new Error('Task not started');
        const diff = Date.now() - record.startedAt.getTime();
        if (diff < 15000)
            throw new Error('Cooldown not finished');
        if (record.claimedAt)
            throw new Error('Already claimed');
        await this.users.addBalance(userId, reward);
        await this.invites.reward(userId, reward);
        record.claimedAt = new Date();
        return this.repo.save(record);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_task_entity_1.UserTask)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        invites_service_1.InvitesService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map