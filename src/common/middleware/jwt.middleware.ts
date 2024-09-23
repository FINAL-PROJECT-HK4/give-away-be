import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Authorization header missing',
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const secret = process.env.SECRET_KEY_JWT;
      const payload = await this.jwtService.verifyAsync(token, { secret });
      req.user = payload;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
