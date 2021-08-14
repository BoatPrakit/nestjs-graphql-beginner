import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<User> | null {
    const user = await this.userService.getUserByUserName(username);
    if (!user) return null;
    const isPasswordValid = user.password === password;
    return isPasswordValid ? user : null;
  }

  login(user: User): { access_token: string } {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  verify(token: string) {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = this.userService.getUserByUserName(decoded.username);
    if (!user) throw new UnauthorizedException(null, 'Your Token is invalid');
    return user;
  }
}
