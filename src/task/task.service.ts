import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { taskStatus } from 'src/common/constants/task';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(readonly prisma: PrismaService) {}

  private async ensureUserExists(telegramId: string) {
    const user = await this.prisma.user.findFirst({
      where: { telegram_id: telegramId },
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

    const tasksData = await this.prisma.task.findMany({
      include: {
        task_category: true,
      },
    });
    const userTasks = await this.prisma.userTask.findMany({
      where: { user_telegram_id: telegramId },
    });

    const tasksStatus = tasksData.map((task) => {
      const exists = userTasks.find((userTask) => userTask.task_id === task.id);
      const newTask = exists
        ? { ...task, status: exists.status }
        : { ...task, status: taskStatus.INIT };

      return newTask;
    });

    return tasksStatus;
  }

  async startTask(telegramId: string, taskId: string, point: number) {
    try {
      await this.ensureUserExists(telegramId);

      const result = await this.prisma.userTask.create({
        data: {
          user_telegram_id: telegramId,
          task_id: taskId,
          reward_point: point,
          status: 'ready',
        },
      });

      return {
        isCreate: true,
        data: result,
      };
    } catch (error) {
      console.error('Error starting task:', error);
      return {
        isCreate: false,
        message: `Error creating task: ${error.message}`,
      };
    }
  }

  async claimTask(telegramId: string, taskId: string) {
    try {
      await this.ensureUserExists(telegramId);

      const response = await this.prisma.userTask.updateMany({
        where: {
          user_telegram_id: telegramId,
          task_id: taskId,
        },
        data: {
          status: 'claimed',
        },
      });

      if (response.count === 0) {
        return {
          isUpdated: false,
          message: 'No tasks were updated.',
        };
      }

      return {
        isUpdated: true,
        message: 'Task status updated successfully!',
      };
    } catch (error) {
      console.error('Error claiming task:', error);
      return {
        isUpdated: false,
        message: `Error updating task status: ${error.message}`,
      };
    }
  }
}
