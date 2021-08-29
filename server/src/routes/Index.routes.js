import express from "express"
const router = express.Router();


router.get('/', (req, res, next) => {
  res.json({ 'status': 'Server is up and running' })
  
  /*res.header("Access-Control-Allow-Origin", "*");
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );*/
  next();
})

export default router;