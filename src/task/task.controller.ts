import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { TaskService } from './task.service';

interface ClaimTaskRequest {
  taskId: string;
}

interface User{
  telegramId: string,
  username: string,
  iat: number,
  exp: number
}

interface CustomRequest extends Request {
  user: User;  
}

@Controller('')
export class TaskController {
  constructor(private taskService: TaskService) {}


  @Get('task/categories')
  async getCategories() {
    return this.taskService.getCategories();
  }

  @Get('tasks')
  async getTasksAndStatus(@Req() req: CustomRequest) {
    const telegramId = req.user.telegramId || "";
    return this.taskService.getTasksAndStatus(telegramId);
  }

  @Post('task/claim')
  async claimTask(@Body() data: ClaimTaskRequest,@Req() req: CustomRequest) {
    const {  taskId } = data;
    const telegramId = req.user.telegramId

    return this.taskService.claimTask(telegramId, taskId);
  }

  @Post('task/start')
  async startTask(@Body() data: any,@Req() req: CustomRequest) {
    const {  taskId, point } = data;
    const telegramId = req.user.telegramId

    return this.taskService.startTask(telegramId, taskId, point);
  }
}
