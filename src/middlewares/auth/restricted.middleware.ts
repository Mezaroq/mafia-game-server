import {NextFunction, Request, Response} from "express";
import {validateToken} from "../../utils/jwt/jwt.util";
import {User, UserRole} from "../../models/user/user.model";

export function restricted(req: Request | any, res: Response, next: NextFunction) {
  const token = req.get('Authorization');
  if (!token || !token.includes('Bearer '))
    return res.sendStatus(403);

  validateToken(token.substring(7)).subscribe(
    token => {
      token && !token.refresh ? User.findById(token.id).exec((err, user: any) => {
        if (err)
          res.sendStatus(500);
        else {
          if (req.path.split('/').includes('admin') && user.role !== UserRole.ADMIN)
            return res.sendStatus(403);
          req.user = user?.toObject();
          next();
        }
      }) : res.sendStatus(403)
    }
  )
}
