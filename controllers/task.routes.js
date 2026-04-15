const router = require('express').Router() 
const Task = require('../models/Task')
const verifyToken = require('../middleware/verify-token')


// post router 
router.post('/',verifyToken, async(req, res)=>{
    try{
        req.body.username = req.body._id
        const createdTask= await Task.create(req.body)
        res.status(201).json(createdTask)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


// get router

router.get('/', async (req,res)=>{
    try{

        const allTasks = await Task.find().populate('username').populate('category')
        res.json(allTasks)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router