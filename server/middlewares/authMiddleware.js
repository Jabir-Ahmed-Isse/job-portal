
// import jwt from 'jsonwebtoken';
// import Company from '../models/Company.js';
// export const protectCompany = async (req, res, next) => {

//     const token = req.headers.token
//     if (!token) {
//         return res.json({ success: false, message: "Not Authorized , login Again" });
//     }

//    try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.company = await Company.findById(decoded.id).select("-password");
//         next();
//     }catch (err) {
//         return res.json({ success: false, message:err.message });
//     }

// }















// import jwt from 'jsonwebtoken';
// import Company from '../models/Company.js';

// export const protectCompany = async (req, res, next) => {
//   const token = req.headers.token;

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Not authorized, token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const company = await Company.findById(decoded.id).select('-password');

//     if (!company) {
//       return res.status(401).json({ success: false, message: "Company not found" });
//     }

//     req.company = company;
//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Token invalid or expired" });
//   }
// };






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
