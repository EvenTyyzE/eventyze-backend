import { Router } from 'express';
import userRouter from './userRoutes/userRoutes';
import hostRouter from './hostRoutes/hostRoutes';
import adminRouter from './adminRoutes/adminRoutes';

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/host', hostRouter);
rootRouter.use('/admin', adminRouter);

export default rootRouter;
