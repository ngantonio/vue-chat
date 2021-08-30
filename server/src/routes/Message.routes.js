import express from "express"
const router = express.Router();

import { getAllMessages, createMessage, findOccurrencesInMessages } from '../controllers/Message.controller.js'

router.post('/create', createMessage);
router.get('/all', getAllMessages);
router.get('/search', findOccurrencesInMessages);

export default router;