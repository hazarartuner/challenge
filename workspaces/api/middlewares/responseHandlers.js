const handleBadRequest = (req, res, details) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(details);
  }

  return res.status(400).json({
    status: 400,
    message: 'Bad request',
    payload: {
      details: process.env.NODE_ENV !== 'production' ? details : null,
    },
  });
};

const handleInternalServerError = (req, res, details) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(details);
  }

  return res.status(500).json({
    status: 500,
    message: 'Internal server error',
    payload: {
      details: process.env.NODE_ENV !== 'production' ? details : null,
    },
  });
};

const handleForbidden = (req, res) => {
  res.status(403).json({
    status: 403,
    message: "Forbidden, you don't have permission to access this content",
  });
};

const handleNotFound = (req, res, details) => {
  res.status(404).json({
    status: 404,
    message: 'Not found!',
    payload: {
      details,
    },
  });
};

const handleConflict = (req, res, details) => {
  res.status(409).json({
    status: 409,
    message: 'Conflict, You may be trying to create existing content!',
    payload: { details },
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
    forbidden: () => handleForbidden(req, res),
    badRequest: details => handleBadRequest(req, res, details),
    notFound: details => handleNotFound(req, res, details),
    conflict: details => handleConflict(req, res, details),
    internalServerError: details => handleInternalServerError(req, res, details),
  };
  next();
};
