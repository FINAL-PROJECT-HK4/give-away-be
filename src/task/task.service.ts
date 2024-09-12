import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { taskStatus } from 'src/common/constants/task';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(readonly prisma: PrismaService) {}

  private async ensureUserExists(telegramId: string) {
    const user = await this.prisma.user.findFirst({
      where: { telegramId },
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return user;
  }

  async getCategories() {
    return await this.prisma.taskCategory.findMany({});
  }

  async getTasksAndStatus(telegramId: string) {
    await this.ensureUserExists(telegramId);

    const tasksData = await this.prisma.task.findMany({});
    const userTasks = await this.prisma.userTask.findMany({
      where: { userTelegramId: telegramId },
    });

    const tasksStatus = tasksData.map((task) => {
      const exists = userTasks.find((userTask) => userTask.taskId === task.id);
      const newTask = exists
        ? { ...task, status: exists.status }
        : { ...task, status: taskStatus.INIT };

      return newTask;
    });

    return tasksStatus;
  }

  async claimTask(telegramId: string, taskId: string) {
    await this.ensureUserExists(telegramId);

    const response = await this.prisma.userTask.updateMany({
      where: {
        userTelegramId: telegramId,
        taskId: taskId,
      },
      data: {
        status: 'claimed',
      },
    });

    console.log(response, 'chaubui22');

    if (response.count === 0) {
      return {
        isUpdated: false,
      };
    }

    return {
      isUpdated: true,
    };
  }
}
