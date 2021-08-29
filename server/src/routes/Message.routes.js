import express from "express"
const router = express.Router();

import { getAllMessages, createMessage } from '../controllers/Message.controller.js'

router.post('/create', createMessage);
router.get('/all', getAllMessages);

export default router;