import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';

interface ClaimTaskRequest {
  telegramId: string;
  taskId: string;
}

@Controller('')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('task/categories')
  async getCategories() {
    return this.taskService.getCategories();
  }

  @Get('tasks/:userId')
  async getTasksAndStatus(@Param('userId') telegramId: string) {
    return this.taskService.getTasksAndStatus(telegramId);
  }

  @Post('task/claim')
  async claimTask(@Body() data: ClaimTaskRequest) {
    const { telegramId, taskId } = data;

    return this.taskService.claimTask(telegramId, taskId);
  }

  @Post('task/start')
  async startTask(@Body() data: any) {
    const { telegramId, taskId, point } = data;

    return this.taskService.startTask(telegramId, taskId, point);
  }
}
