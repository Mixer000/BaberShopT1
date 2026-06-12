const { check, validationResult } = require('express-validator');

const validateAppointment = [
  check('fullName').notEmpty().withMessage('Full name is required').trim().escape(),
  check('phone').notEmpty().withMessage('Phone number is required').trim().escape(),
  check('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  check('service').notEmpty().withMessage('Service selection is required').trim().escape(),
  check('date').isISO8601().withMessage('Valid date is required').toDate(),
  check('time').notEmpty().withMessage('Time is required').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateAppointment };
