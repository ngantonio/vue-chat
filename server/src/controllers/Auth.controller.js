import UserModel from '../models/User.model.js'


export const login = async (req, res) => {

  const { username } = req.body;
  
  if (!username || username === '' )
    return res.status(400).json({ "ok": false, 'msg': 'Username is required' })
  
  try {
    // validate if user exist
    let userExist = await UserModel.findOne({ username })
    if (!userExist) return res.status(400).json({"ok": false, "msg":`User does not register`})
  
    let userSend = {
      "_id": userExist._id,
      "username": userExist.username,
    }
    return res.status(200).json({"ok": true, "result": userSend})

  } catch (error) {
    return res.status(400).json({"ok": false, error})
  }
}


export const register = async (req, res) => {

  const { username } = req.body;

  if (!username || username === '' )
    return res.status(400).json({ "ok": false, 'msg': 'Username is required' })
  
  try {
    // validate if user not exist
    let userExist = await UserModel.findOne({ username })
    if (userExist) return res.status(400).json({ "ok": false, "msg": `user already exists with this username` })
    
    // create user 
    let newUser = new UserModel(req.body);
  
    // save user
    await newUser.save();
  
    let userSend = {
      "_id": newUser._id,
      "username": newUser.username,
    }
    return res.status(200).json({"ok": true, "result": userSend })
    
  } catch (error) {
    res.status(400).json({"ok": false, error})
  }
}