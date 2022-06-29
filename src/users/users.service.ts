import { Injectable, NotFoundException, Req, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async createUser(username: string, email: string, password: string) {
    try {
      const newUser = new this.userModel({
        username,
        email,
        password,
      });
      const result = await newUser.save();
      return result.id as string;
    } catch(error) {
      return error;
    }
  }

  async getSingleUser(userId: string) {
    const user = await this.userModel.findById(userId);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password
    };
  }

  async deleteUser(userId: string) {
    const results = await this.userModel.deleteOne({_id: userId}).exec();
    if(results == null) {
      throw new NotFoundException('Could not find user.');
    }
  }
  
  async loginUser(userName: string, userPassword: string, request: any) {
    const user = await this.userModel.findOne({ name: userName, password: userPassword }).exec();
    // request.sessionID = user.id;
    request.session.userID = user.id;
    console.log(request.session.userID);
    // console.log(request.sessionID);
    return user;
  }

  async logoutUser(request: any) {
    console.log(request.session);
    request.session.destroy();
    return "Session Destroyed";
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
