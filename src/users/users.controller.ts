import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiOkResponse({ type: User, isArray: true })
  getUsers(@Query('name') name?: string): User[] {
    return this.userService.findAll(name);
  }

  @Get(':id')
  @ApiOkResponse({ type: User, description: 'Select user by user id' })
  getUsersById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: User })
  createUser(@Body() body: CreateUserDto): any {
    return this.userService.createUser(body);
  }
}
