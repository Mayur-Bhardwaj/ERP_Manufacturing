  // This middleware is used to protect the ERP Dashboard.

  // What is authMiddleware?

  // 👉 It is a gatekeeper 🚪
  // Before accessing a route, it checks:

  // Token exists or not
  // Token is valid or not
  // If valid → allow access
  // If invalid → block access

  import jwt from "jsonwebtoken";

  // const JWT_SECRET = process.env.JWT_SECRET;
  import { JWT_SECRET } from "../config/env.js";

  export const authMiddleware = (req, res, next) => {
    try {
      // 1. Get Authorization header
      const authHeader = req.headers.authorization;

      // 2. Check if token exists and follows Bearer format
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Access denied. No token provided",
        });
      }

      // 3. Extract token
      const token = authHeader.split(" ")[1];

      // 4. Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("TOKEN PAYLOAD:", decoded);


      // 5. Attach user info to request
      // req.user = decoded;
       req.user = {
      ...decoded,
      role: decoded.role?.toUpperCase(),
    };

      // 6. Move to next middleware/controller
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please login again.",
      });
    }
  };


  // ---------------------------------- Role Middleware-----------------------------------------------

  export const authorizeRoles = (...roles) => {
    return (req, res, next) =>{
      try{
        if(!req.user){
          return res.status(403).json({
            success: false,
            message: "Unauthorized",
          });
        }
        // ✅ normalize both sides
      const allowedRoles = roles.map((r) => r.toUpperCase());

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access Denied. You don't have Permission",
        });
      }
        console.log("USER ROLE:", req.user.role);
        console.log("ALLOWED ROLES:", roles);

        next();
      } catch(error){
        return res.status(500).json({
          success: false,
          message: "Authorization Error",
        });
      }
    };
  };

  // Always send token like:

  // Authorization: Bearer YOUR_TOKEN