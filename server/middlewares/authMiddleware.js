// Protects company routes: checks the "Authorization: Bearer <token>" header,
// and attaches the company (without its password) to req.company.
import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const company = await Company.findById(decoded.id).select("-password");

      if (!company) {
        return res.status(401).json({ success: false, message: "Company not found" });
      }

      req.company = company;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Not authorized, token missing" });
  }
};
