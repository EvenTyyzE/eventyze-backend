import express from 'express';
import { joiValidators } from '../../validations';
// import { userAuthController, cartController, userProductControllers } from '../../controllers';
import { generalAuthFunction } from '../../middlewares/authorization.middleware';

const router = express.Router();

//User Email Authentications
// router.post('/email-signup', joiValidators.inputValidator(joiValidators.userRegisterSchemaViaEmail), userAuthController.userRegisterWithEmail)


export default router;