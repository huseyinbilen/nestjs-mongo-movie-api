import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        let userID = req.session.userID;
        if (!userID) {
            console.log("Giris yok");
            res.json({message: 'User Not Login!'});
        }
        else {
            // @ts-ignore
            console.log(req.session.userID);
            next();
        }
    }

}