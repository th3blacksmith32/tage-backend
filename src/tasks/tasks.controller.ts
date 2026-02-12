import { Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  listTasks() {
    return this.tasksService.listTasks();
  }

  @UseGuards(JwtGuard)
  @Post(':taskId/claim')
  claimTask(@Req() req: { userId: number }, @Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.claimTask(req.userId, taskId);
  }
}