import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';



@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}


  @Post('send-request/:receiverId')
  async sendFriendRequest(@Param('receiverId') receiverId: number, @Body('senderId') senderId: number) {
    return this.friendsService.sendFriendRequest(senderId, receiverId);
  }

  @Patch('accept/:requestId')
  async acceptFriendRequest(@Param('requestId') requestId: number) {
    return this.friendsService.acceptFriendRequest(requestId);
  }

  @Patch('decline/:requestId')
  async declineFriendRequest(@Param('requestId') requestId: number) {
    return this.friendsService.declineFriendRequest(requestId);
  }

}
