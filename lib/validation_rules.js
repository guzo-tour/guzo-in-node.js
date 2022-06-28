const { body } = require('express-validator')
exports.validationRules =
	[[//Login validation
		body("user_name", "Invalid user name address or password")
			.notEmpty()
			.trim()
			.escape(),
	
		body("password", "The Password must be of minimum 5 characters length")
			.notEmpty()
			.trim()
			.isLength({ min: 5 }),
	],
	[//signup validation
        body("user_name")
			.notEmpty()
			.trim()
			.escape(),

		body('first_name')
			.notEmpty()
			.trim()
			.escape()
			.withMessage('First Name required')
			.matches(/^[a-zA-Z ]*$/)
			.withMessage('First Name: Only Characters with white space are allowed'),	

		body('last_name')
			.trim()
			.escape()
			.matches(/^[a-zA-Z ]*$/)
            .notEmpty().withMessage('Last Name required')
			.isAlpha().withMessage('Last Name: Only Characters with white space are allowed'),

		body("email")
			.notEmpty()
			.escape()
			.trim().withMessage('Email Address required')
			.normalizeEmail()
			.isEmail().withMessage('Invalid email address, Provide a valid email address!'),
        
        body("phone")
			.notEmpty()
			.escape()
			.trim().withMessage('Phone number required')
			.matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
            .withMessage('Invalid phone number'),

		body("password")
			.trim()
			.notEmpty().withMessage("Password is required")
			.isLength({min: 5, max: 20})
			.withMessage("Password lenght must be minimum 5 & maximum 20 character length")
			.isStrongPassword({ minLength: 5, 
								minLowercase: 1, 
								minUppercase: 1, 
								minNumbers: 1, 
								minSymbols: 0, 
								returnScore: false})
			.withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),				

		// confirm password validation
		 body('confpassword').custom((value, { req }) => {
			   if (value !== req.body.password) {
					 throw new Error('Password does not match password');
				}
				return true;
		   })
	],
	[//editprofile
		body('first_name')
		.notEmpty()
		.trim()
		.escape()
		.withMessage('First Name required')
		.matches(/^[a-zA-Z ]*$/)
		.withMessage('First Name: Only Characters with white space are allowed'),	

		body('last_name')
			.trim()
			.escape()
			.matches(/^[a-zA-Z ]*$/)
			.notEmpty().withMessage('Last Name required')
			.isAlpha().withMessage('Last Name: Only Characters with white space are allowed'),
		body("phone")
			.notEmpty()
			.escape()
			.trim().withMessage('Phone number required')
			.matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
            .withMessage('Invalid phone number')
	],
	[//email
		body("email")
			.notEmpty()
			.escape()
			.trim().withMessage('Email Address required')
			.normalizeEmail()
			.isEmail().withMessage('Invalid email address, Provide a valid email address!')
	]
]