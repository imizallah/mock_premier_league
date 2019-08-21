module.exports = (req, res, next) => {
  //if user role is not equal to admin display an error message
  if (!req.user.role || req.user.role != 'admin') {
    return res.status(401)
      .json({ status: "error", msg: "UNAUTHORIZED: You are not allowed to perform this action" });
  }
  next();
}