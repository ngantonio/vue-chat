import MessageModel from '../models/Message.model.js'
import { getInstance } from '../socketHandler.js'



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

    const instance = getInstance();
    instance.to('liveroom').emit('NEW_MESSAGE', { username: newMessage.username, text: newMessage.text, createdAt: newMessage.createdAt  })

    return res.status(200).json({ "ok": true, "result": newMessage })
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ "ok": false, error })
  }
}

export const findOccurrencesInMessages = async (req, res) => {

  const { query } = req.query;
  console.log(req.query);
  try {
    // Regular exp para permitir las coincidencias por subString
    const text = new RegExp(query, "i");
    
    // Busqueda en texto
    const messageMatches = await MessageModel.find({ text });

    if (messageMatches.length === 0) return res.status(404).json({ ok: false, msg: 'no matches'});

    return res.status(200).json({ ok: true, result: messageMatches })

  } catch (error) {
    return res.status(404).json({ ok: false, msg: 'no matches', error: error.message });
  }
};
