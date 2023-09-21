exports.headerHandler = (req, res, next) => {
    console.log(req.headers);
  if (req.headers.authorization) {
    const authToken = process.env.AUTH_TOKEN;

    if (!authToken) {
      return res
        .status(500)
        .json({ error: "No AUTH_TOKEN found in the environment" });
    }
    if (req.headers.authorization == `Bearer ${authToken}`) {
      next();
    } else {
      res.send({ status: 401, message: "Provide invalid token" });
    }
  } else {
    res.send({ status: 401, message: "Provide Valid Headers" });
  }
};
