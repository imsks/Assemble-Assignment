import { Router } from 'express';
import { getStatus, getVisitors } from '../controllers';

const indexRouter = Router();

indexRouter.route('/test').get(getStatus);
indexRouter.route('/visitors').get(getVisitors);

export default indexRouter;
