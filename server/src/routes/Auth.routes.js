import express from "express"
const router = express.Router();

//import { login, register } from '../controllers/Auth.controller.js'
router.get('/', (req, res, next) => {
  res.json({'status': 'Server is up and running'})
  
})

/*router.post('/login', login);
router.post('/register', register);*/

export default router;