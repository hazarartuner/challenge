const express = require('express');
const slugify = require('slugify');
const createSessionValidator = require('../validators/createSessionValidator');
const models = require('./../models');
const checkPermission = require('./../middlewares/checkPermission');

const router = express.Router();

router.post('/', checkPermission(['MASTER']), async (req, res) => {
  const sessionObj = {
    ...req.body,
    slug: slugify(req.body.title),
  };

  if (!createSessionValidator(sessionObj)) {
    return res.responseHandlers.badRequest(createSessionValidator.errors);
  }

  try {
    const session = await models.Session.create(
      {
        ...sessionObj,
        stories: req.body.stories.reduce((acc, curr) => {
          acc.push({
            title: curr,
          });

          return acc;
        }, []),
      },
      {
        include: [models.Story],
      }
    );

    return res.responseHandlers.success(session);
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
  }
});

module.exports = router;
