import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegistrationEntity } from '../entities/registration.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { DatabaseService } from '../database/database.service';
import { LoginEntity } from '../entities/login.entity';
import { SearchUsersDto } from 'src/dtos/searchUsersDto';
import * as dotenv from 'dotenv';
dotenv.config();



@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async register(createUserDto: CreateUserDto): Promise<RegistrationEntity> {

    const { firstName, lastName, email, password, age } = createUserDto;
    const existingUser = await this.databaseService.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );

    if (existingUser.length > 0) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (first_name, last_name, email, password, age)
      VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, password, age, created_at;
    `;


    const result = await this.databaseService.query(query, [ firstName, lastName, email, hashedPassword, age ]);
    const user = result[0];

    return new RegistrationEntity({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      age: user.age,
      created_at: user.created_at,
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginEntity> {

    const { email, password } = loginUserDto;
    const query = 'SELECT * FROM users WHERE email = $1';
    const users = await this.databaseService.query(query, [email]);
    if (users.length === 0)
      throw new UnauthorizedException('User not found');

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');


    const payload = { email: user.email, sub: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    return new LoginEntity(user.id, user.email, user.created_at, token);
  }


  async searchUsers(searchUsersDto: SearchUsersDto) {

    const { firstName, lastName, age } = searchUsersDto;
    let query = 'SELECT * FROM users WHERE 1=1';
    const params: any[] = [];

    if (firstName) {
      query += ' AND first_name ILIKE $' + (params.length + 1);
      params.push(`%${firstName}%`);
    }

    if (lastName) {
      query += ' AND last_name ILIKE $' + (params.length + 1);
      params.push(`%${lastName}%`);
    }

    if (age) {
      query += ' AND age = $' + (params.length + 1);
      params.push(age);
    }

    const result = await this.databaseService.query(query, params);
    return result;
  }

}