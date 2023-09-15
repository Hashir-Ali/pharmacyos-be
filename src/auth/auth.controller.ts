import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login-user-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from './guards/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() signInDto: UserLoginDto) {
        return this.authService.login(signInDto.username, signInDto.password);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
