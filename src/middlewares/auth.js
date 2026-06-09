const adminAuth = (req, res, next) => {
  console.log("admin authorization in the middleware");
  const token = "xyz";

  const isUserAuthorized = token === "xyz";

  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("user authorization in the middleware");
  const token = "xyz";

  const isUserAuthorized = token === "xyz";

  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
