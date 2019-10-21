const handleBadRequest = (req, res, message, details) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(details);
  }

  return res.status(400).json({
    status: 400,
    title: 'Bad request',
    message,
    details: process.env.NODE_ENV !== 'production' ? details : null,
  });
};

const handleInternalServerError = (req, res, message, details) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(details);
  }

  return res.status(500).json({
    status: 500,
    title: 'Internal server error',
    message,
    details: process.env.NODE_ENV !== 'production' ? details : null,
  });
};

const handleForbidden = (req, res, message, details) => {
  res.status(403).json({
    status: 403,
    title: 'Forbidden',
    message,
    details: process.env.NODE_ENV !== 'production' ? details : null,
  });
};

const handleNotFound = (req, res, message, details) => {
  res.status(404).json({
    status: 404,
    title: 'Not found!',
    message,
    details: process.env.NODE_ENV !== 'production' ? details : null,
  });
};

const handleConflict = (req, res, message, details) => {
  res.status(409).json({
    status: 409,
    title: 'Conflict',
    message,
    details: process.env.NODE_ENV !== 'production' ? details : null,
  });
};

const handleSuccess = (req, res, payload) => {
  res.status(200).json({
    status: 200,
    payload,
  });
};

module.exports = (req, res, next) => {
  res.success = payload => handleSuccess(req, res, payload);
  res.forbidden = ({ message = null, details = null } = {}) =>
    handleForbidden(req, res, message, details);
  res.badRequest = ({ message = null, details = null } = {}) =>
    handleBadRequest(req, res, message, details);
  res.notFound = ({ message = null, details = null } = {}) =>
    handleNotFound(req, res, message, details);
  res.conflict = ({ message = null, details = null } = {}) =>
    handleConflict(req, res, message, details);
  res.internalServerError = ({ message = null, details = null } = {}) =>
    handleInternalServerError(req, res, message, details);

  next();
};
