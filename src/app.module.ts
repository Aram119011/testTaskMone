import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MigrationService } from './migration.service'
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { FriendsService } from './friends/friends.service';
import { FriendsController } from './friends/friends.controller';
import { FriendsModule } from './friends/friends.module';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Module({
  imports: [DatabaseModule, AuthModule, FriendsModule],
  controllers: [FriendsController],
  providers: [MigrationService, DatabaseService, AuthService, FriendsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('auth/search');

    consumer
      .apply(JwtMiddleware)
      .forRoutes('friends/send-request/:receiverId');

    consumer
      .apply(JwtMiddleware)
      .forRoutes('friends/accept/:requestId');

    consumer
      .apply(JwtMiddleware)
      .forRoutes('friends/decline/:requestId');
  }
}
