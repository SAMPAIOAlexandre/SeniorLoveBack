const authenticateAdmin = (req, res, next) => {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.status(401).render("error", {
      error: "401 | Unauthorized",
    });
  }
};

export default authenticateAdmin;