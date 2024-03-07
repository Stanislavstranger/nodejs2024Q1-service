import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DBModule } from '../db/db.module';

@Module({
  imports: [DBModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
