import express from 'express';
import { joiValidators } from '../../validations';
import { generalAuthFunction, rolePermit } from '../../middlewares/authorization.middleware';
// import { vendorShopController, vendorProductController } from '../../controllers/index';
import { cloudinaryUpload } from '../../utilities';
import { Roles } from '../../types/modelTypes';

const router = express.Router();


//Shop Routes
// router.post('/create-shop', cloudinaryUpload.single("displayImage"), joiValidators.inputValidator(joiValidators.createShopSchema), generalAuthFunction, vendorShopController.createShop)
// router.put('/update-shop', generalAuthFunction, rolePermit([Roles.Vendor]), vendorShopController.updateShop)

export default router;