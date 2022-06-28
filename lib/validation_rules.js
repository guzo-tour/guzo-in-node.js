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
	[//add Tour
		body("tour_name")
			.trim()
			.notEmpty().withMessage("The tour  must have name"),
		body("duration").notEmpty().withMessage("The must have duration")
			.matches(/^[1-9]+[0-9]*$/).withMessage("The tour duration must be positive integer "),

		body("group_size")
			.notEmpty().withMessage("The tour must have difficulty")
			.isInt().withMessage("Group size must be integer"),
			
		body("difficulty").notEmpty().withMessage("The tour must have difficulty"),

		body("region").notEmpty().withMessage("The must have region"),
		body("direction").notEmpty().withMessage("The must have direction")
			.isAlpha().withMessage("direction only contain alphabet"),
		body("town").notEmpty().withMessage("The tour must have town")
			.isAlpha().withMessage("Town only contain alphabet"),
		body("price").notEmpty().withMessage("The tour must have price")
			.isFloat().withMessage("The tour price must be decimal number")
			.matches(/^[^-]/).withMessage("The price must be postive"),
		body("discount").notEmpty().withMessage("The tour must have discount price")
			.isFloat().withMessage("The tour duration price must be decimal number")
			.matches(/^[^-]/).withMessage("The tour duration  price must be postive"),
		body("start_date").notEmpty().withMessage("The tour must have start_date"),
		body("summary").notEmpty().withMessage("The tour must have summary"),
		body("description").notEmpty().withMessage("The tour must have descrption"),
	
	],
	[//edit Tour
		body("tour_name")
			.trim()
			.notEmpty().withMessage("The tour must have name"),
			
		body("duration").notEmpty().withMessage("The tour must have duration")
			.matches(/^[1-9]+[0-9]*$/).withMessage("The tour duration must be positive integer "),
	
		body("group_size")
			.notEmpty().withMessage("The tour must have group size")
			.isInt().withMessage("Group size must be integer")
			.matches(/^[1-9]+[0-9]*$/).withMessage("The tour group size must be positive integer "),
		
		body("price").notEmpty().withMessage("The tour must have price")
			.isFloat().withMessage("The tour price must be decimal number")
			.matches(/^[^-]/).withMessage("The price must be postive"),
		body("discount").notEmpty().withMessage("The tour  must have discount price")
			.isFloat().withMessage("The tour duration price must be decimal number")
			.matches(/^[^-]/).withMessage("The tour duration  price must be postive"),
		body("region").notEmpty().withMessage("The must have region"),	
		body("town").notEmpty().withMessage("The tour must have town"),
		body("summary").notEmpty().withMessage("The must have summary"),

		
		


		

		]
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