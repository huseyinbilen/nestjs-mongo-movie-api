import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    let userID = req.session.userID;
    if(!userID) {
        console.log("Giris yok");
    }
    else{
        console.log("basarili giris");
    }
    // @ts-ignore
    console.log(req.sessionID);
    next();
  }

}