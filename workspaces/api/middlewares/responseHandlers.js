const handleBadRequest = (req, res, details) => {
  return res.status(400).json({
    status: 400,
    message: 'Bad request',
    payload: {
      details: process.env.NODE_ENV !== 'production' ? details : null,
    },
  });
};

const handleInternalServerError = (req, res, details) => {
  res.status(500).json({
    status: 500,
    message: 'Internal server error',
    payload: {
      details: process.env.NODE_ENV !== 'production' ? details : null,
    },
  });
};

const handleSuccess = (req, res, payload) => {
  res.status(200).json({
    status: 200,
    payload,
  });
};

module.exports = (req, res, next) => {
  res.responseHandlers = {
    success: payload => handleSuccess(req, res, payload),
    badRequest: details => handleBadRequest(req, res, details),
    internalServerError: details => handleInternalServerError(req, res, details),
  };
  next();
};
