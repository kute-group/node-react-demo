import { Router } from 'express';
import Chat from '../models/chat.model';
import helpers from '../helpers';
import { PAGE_LIMIT } from '../../config.json';
const auth = require('../helpers/auth');
const api = Router();

// get chat and add to req
api.param('id', async (req, res, next, id) => {
  try {
    const chat = await Chat.load({ _id: id });
    req.chat = chat;
    next();
  } catch (err) {
    console.log(err);
  }
});
// get chats list
api.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const options = {
    limit: limit || PAGE_LIMIT,
    page: page || 0,
    criteria: {},
  };
  let chats = await Chat.list(options);
  chats = chats.map(c => Chat.format(c));
  const count = await Chat.count();
  res.status(200).send(
    helpers.db.format({
      limit: options.limit,
      page: options.page,
      count,
      list: chats,
    }),
  );
});

// get one chat by id
api.get('/:id', auth.required, async (req, res) => {
  const { id } = req.params;
  try {
    let chat = await Chat.load({ _id: id });
    chat = Chat.format(chat);
    res.status(200).send(chat);
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not get chat id = ${id}`,
    });
  }
});

// create new chat
api.post('/', (req, res, next) => {
	if(req.body.nickname && req.body.nickname){
		const chat = new Chat({
			nickname: req.body.nickname,
			content: req.body.content,
			createdBy: req.body.createdBy,
		});
		chat.save((err, data) => {
			if (err) return next(err);
			const io = global.io;
			io.emit('RECEIVE_MESSAGE', data);
		});
		res.status(201).send({
			status: 'success',
			message: 'Create new chat successfully.',
		});
	}else{
		res.status(401).send({
			status: 'failed',
			message: 'Nickname and content are required',
		});
	}

});

// update a chat
api.put('/:id', auth.required, async (req, res) => {
  const { id } = req.params;
  const body = {
    name: req.body.name,
    updatedBy: req.body.updatedBy,
    price: req.body.price,
  };
  try {
    await Chat.updateById(id, body);
    res.status(201).send({
      status: 'success',
      message: 'Update chat successfully.',
    });
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not update chat id = ${id}`,
    });
  }
});

// delete a chat
api.delete('/:id', auth.required, async (req, res) => {
  const { id } = req.params;
  try {
    await Chat.deleteById(id);
    res.status(201).send({
      status: 'success',
      message: `Delete chat id = ${id} successfully.`,
    });
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not delete chat id = ${id}`,
    });
  }
});

module.exports = api;
