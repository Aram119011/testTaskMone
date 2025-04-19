import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token is required');


    const token = authHeader.split(' ')[1]; // Bearer token

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    next();
  }
}
