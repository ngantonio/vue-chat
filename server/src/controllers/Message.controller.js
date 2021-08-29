import MessageModel from '../models/Message.model.js'

export const getAllMessages = async (req, res) => {
  
  try {
    const messages = await MessageModel.find().sort({ createdAt: 1 })
    return res.json({ ok: true, messages });
  } catch (error) {
    return res.status(404).json({ok: true, msg:'No messages ...', error: error.message });
  }
}

export const createMessage = async (req, res) => {
  const { username, text } = req.body;
  
  if (!username || username === '' || !text || text === '')
    return res.status(400).json({ "ok": false, 'msg': 'Username and text message are required' })
  
  try {
    // create Message
    let newMessage = new MessageModel(req.body);
  
    // save Message
    await newMessage.save();
    return res.status(200).json({ "ok": true, "result": newMessage })
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ "ok": false, error })
  }
}