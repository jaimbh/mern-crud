const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

router.get('/getusers', async (req, res)=>{
	try{
		const users = await User.find();				
		res.status(200).json(users);
				
	}catch(err){
		res.status(500).json({error: err});
	}
});

router.post('/add', async (req, res)=>{
	const {name, email, phone, sex} = req.body;
	
	if(!name || !email || !phone || !sex){
		return res.status(422).json({error: 'fill all fields'});
	}
	
	try{
		const userExist = await User.findOne({email: email});
		
		if(userExist){
			return res.status(422).json({error: 'email already exists'});
		}
		
		const user = new User({name, email, phone, sex});
		
		await user.save();
		
		res.status(201).json({message: 'user saved'});
				
	}catch(err){
		res.json({error: err});
	}
});

router.put('/add/:id', async (req, res)=>{
	const {name, email, phone, sex} = req.body;
	const id = req.params.id;
	
	if(!name || !email || !phone || !sex){
		return res.status(422).json({error: 'fill all fields'});
	}
	
	try{
		const userExist = await User.findOne({_id: id});
		
		if(!userExist){
			return res.status(422).json({error: 'User does not exist'});
		}
				
		const update = await User.findOneAndUpdate({_id: id}, {name, email, phone, sex}, {new: true});
		
		if(!update){
			return res.status(500).json({error: 'error updating user'});
		}
		
		res.status(201).json({message: 'user saved'});
				
	}catch(err){
		res.json({error: 'catch error'});
	}
});

router.delete('/deleteuser/:userId', async (req, res) => {
	const userId = req.params.userId;
	
	try{
		const deletedUser = await User.findByIdAndDelete(userId);
		
		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
	
		res.status(200).json({ message: 'User deleted successfully' });
		
	}catch(error){
		res.status(500).json({ error: 'Failed to delete user' });
	}
});

module.exports = router;