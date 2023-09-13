import { Router } from 'express';
import { getLawyerDetails,requestCallback,searchCase } from '../controllers/explore.js';
import { checkClient, checkTerminated, checkSession } from '../middlewares/authHandler.js';
import { lawyerTags } from '../scripts/algo.js';

const router = Router();

router.route('/lawyer') //query = {id:lawyerId}
.get(getLawyerDetails)
.post(checkSession,checkClient,checkTerminated,requestCallback);

///in development
router.get('/search',searchCase);

router.post('/testByLawyerArr',lawyerTags)

export default router;