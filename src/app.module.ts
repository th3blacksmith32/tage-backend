import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { UserTask } from './tasks/user-task.entity';
import { Invite } from './invites/invite.entity';
import { Admin } from './admin/admin.entity';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { InvitesModule } from './invites/invites.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Task, UserTask, Invite, Admin]),
    AuthModule,
    UsersModule,
    TasksModule,
    InvitesModule,
    AdminModule
  ]
})
export class AppModule {}
