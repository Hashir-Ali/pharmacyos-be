import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { decodePassword } from 'src/common/utils';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByMail(username);
    if (!decodePassword(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByMail(username);
    if (user && decodePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, pass: string) {
    const user = await this.usersService.findOneByMail(username);
    if (!decodePassword(pass, user?.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
