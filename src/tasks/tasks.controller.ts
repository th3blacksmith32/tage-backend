import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Post('start')
  start(@Body() body: { userId: string; taskId: string }) {
    return this.tasks.start(body.userId, body.taskId);
  }

  @Post('claim')
  claim(@Body() body: { userId: string; taskId: string; reward: number }) {
    return this.tasks.claim(body.userId, body.taskId, body.reward);
  }
}
