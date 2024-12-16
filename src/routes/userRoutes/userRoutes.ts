import express from 'express';
import { joiValidators } from '../../validations';
import { userAuthController, userController } from '../../controllers';
import { generalAuthFunction } from '../../middlewares/authorization.middleware';
import { cloudinaryUpload } from '../../utilities';

const router = express.Router();

//User Email Authentications and profile updates
router.post('/email-signup', joiValidators.inputValidator(joiValidators.userRegisterSchemaViaEmail), userAuthController.userRegisterWithEmail)
router.post('/verify-otp', joiValidators.inputValidator(joiValidators.verifyOtpSchema), userAuthController.userVerifiesOtp)
router.post('/login', joiValidators.inputValidator(joiValidators.loginUserSchemaViaEmail), userAuthController.userLoginWithEmail)
router.get('/resend-otp', userAuthController.userResendsOtp)
router.put('/profile-update', generalAuthFunction, userController.updateUserProfile)
router.put('/image-upload', generalAuthFunction, cloudinaryUpload.single('imageUpdate'), userController.changeUserImage)

export default router;