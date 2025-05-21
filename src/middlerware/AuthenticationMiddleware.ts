import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
@Service()
@Middleware({ type: "before" }) 
export class AuthMiddleware implements ExpressMiddlewareInterface {
  use(req: any, res: any, next: (err?: any) => any): any {
    const secretkey = "3fa85f6457174562b3fc2c963f66afa6"
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing." });
    }

    try {
      const decoded = jwt.verify(token, secretkey);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  }
}
