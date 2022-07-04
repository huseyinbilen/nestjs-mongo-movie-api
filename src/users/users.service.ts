import { Injectable, NotFoundException, Req, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async createUser(username: string, email: string, password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    console.log(hash);
    try {
      const newUser = new this.userModel({
        username,
        email,
        password: hash,
      });
      const result = await newUser.save();
      return result.id as string;
    } catch(error) {
      return error;
    }
  }

  async deleteUser(userId: string) {
    const results = await this.userModel.deleteOne({_id: userId}).exec();
    if(results == null) {
      throw new NotFoundException('Could not find user.');
    }
  }
  
  async loginUser(userName: string, userPassword: string, request: any) {
    try {
      if(request.session.userID) {
        return 'User Already Login.';
      }
      else {
        const user = await this.userModel.findOne({ name: userName }).exec();
        const isMatch = await bcrypt.compare(userPassword, user.password);
        if(isMatch) {
          request.session.userID = user.id;
          console.log(request.session.userID);
        }
        else {
          return 'LOGIN FAILED'
        }
      }
    } catch (error) {
      return error;
    }
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
