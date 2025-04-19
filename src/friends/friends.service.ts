import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";



@Injectable()
export class FriendsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async sendFriendRequest(senderId: number, receiverId: number) {

    if (senderId === receiverId)
      throw new BadRequestException('You cannot send a friend request to yourself');

    const existingRequest = await this.databaseService.query(
      `SELECT * FROM friend_requests WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)`,  // Ուշադրություն՝ sender_id և receiver_id
      [senderId, receiverId]
    );

    if (existingRequest.length > 0) throw new BadRequestException('A friend request already exists');

    const query = `
      INSERT INTO friend_requests (sender_id, receiver_id, status)
      VALUES ($1, $2, 'pending')
        RETURNING *;
    `;
    const result = await this.databaseService.query(query, [senderId, receiverId]);

    return result[0];
  }

  async acceptFriendRequest(requestId: number) {

    const query = `
    UPDATE friend_requests
    SET status = 'accepted'
    WHERE id = $1 AND status = 'pending'
    RETURNING *;
  `;
    const result = await this.databaseService.query(query, [requestId]);
    if (result.length === 0)
      throw new BadRequestException('Request not found or already accepted');


    const request = result[0];
    const { sender_id, receiver_id } = request;
    const insertQuery = `
    INSERT INTO friends (user_id, friend_id)
    VALUES ($1, $2),($2, $1);`;
    await this.databaseService.query(insertQuery, [sender_id, receiver_id]);

    return { message: 'Friend request accepted and friends added!' };

  }

  async declineFriendRequest(requestId: number) {

    const query = `
      UPDATE friend_requests
      SET status = 'declined'
      WHERE id = $1 AND status = 'pending'
      RETURNING *;
    `;

    const result = await this.databaseService.query(query, [requestId]);
    if (result.length === 0)
      throw new BadRequestException('Request not found or already processed');

    return { message: 'Friend request declined.' };
  }
}
