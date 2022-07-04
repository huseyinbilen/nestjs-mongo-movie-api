import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import mongoose from "mongoose";
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body('username') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,    
  ) {
    const generatedId = await this.usersService.createUser(
      userName,
      userEmail,
      userPassword
    );
    return {id: generatedId};
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }

  @Post('/login')
  async login(
    @Body('name') userName: string,
    @Body('password') userPassword: string,
    @Req() req: any,
  ) {
    return await this.usersService.loginUser(userName, userPassword, req);
  }

  @Post('/logout')
  async logout(
    @Req() req: any,
  ) {
    // return req.session.destroy();
    return await this.usersService.logoutUser(req);
  }
}
