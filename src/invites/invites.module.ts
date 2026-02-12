import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from './invite.entity';
import { InvitesService } from './invites.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invite]), forwardRef(() => UsersModule)],
  providers: [InvitesService],
  exports: [InvitesService]
})
export class InvitesModule {}
