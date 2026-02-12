import { TasksService } from './tasks.service';
export declare class TasksController {
    private tasks;
    constructor(tasks: TasksService);
    start(body: {
        userId: string;
        taskId: string;
    }): Promise<{
        userId: string;
        taskId: string;
        startedAt: Date;
    } & import("./user-task.entity").UserTask>;
    claim(body: {
        userId: string;
        taskId: string;
        reward: number;
    }): Promise<import("./user-task.entity").UserTask>;
}
