import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, DatabaseService],
})
export class FriendsModule {}
