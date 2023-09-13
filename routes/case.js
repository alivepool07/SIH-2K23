import { Router } from 'express';
import { addEvent, createCase, getCaseDetails, getMyCases, initiateCase, markClosed, raiseDispute, rateLawyer, verifyCase } from '../controllers/case.js';
import { checkCase, checkCaseNotBegun, checkCaseActive,checkClient, checkLawyer, checkReference, checkTerminated } from '../middlewares/authHandler.js';

const router = Router();


//working
router.post('/initiate',checkLawyer,checkReference,checkTerminated,initiateCase);
//query = {id:caseId}
router.post('/create',checkLawyer,checkCase,checkCaseNotBegun,checkTerminated,createCase);
router.post('/verify',checkLawyer,checkCase,checkCaseNotBegun,checkTerminated,verifyCase);


//to be implemented
router.route('/specific')
.get(checkCase,checkCaseActive,getCaseDetails)
.post(checkLawyer,checkCase,checkCaseActive,addEvent)
.put(checkLawyer,checkCase,checkCaseActive,markClosed);

router.route('/support')
.post(checkClient,checkCase,checkCaseActive,raiseDispute)
.put(checkClient,checkCase,checkCaseActive,rateLawyer);

router.get('/mine',getMyCases);

export default router;