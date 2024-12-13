import express from 'express';
import { joiValidators } from '../../validations';
import { userAuthController } from '../../controllers';
import { generalAuthFunction } from '../../middlewares/authorization.middleware';

const router = express.Router();

//User Email Authentications
router.post('/email-signup', joiValidators.inputValidator(joiValidators.userRegisterSchemaViaEmail), userAuthController.userRegisterWithEmail)
router.post('/verify-otp', joiValidators.inputValidator(joiValidators.verifyOtpSchema), userAuthController.userVerifiesOtp)

export default router;