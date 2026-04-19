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

// GET /tasks/:id
router.get('/:id', async(req,res)=>{
    try{
        const foundTask = await Task.findById(req.params.id)
        console.log(foundTask)

        if(!foundTask){
            return res.status(404).json({message:"No Task with this ID exists"})
        }

        res.json(foundTask)



    }
    catch(err){
        console.log(err)
        res.json(err)
    }
})

// DELETE /tasks/:id
router.delete('/:id',async(req,res)=>{
    try{
        const foudnTask = await Task.findById(req.params.id)
        console.log(foudnTask)

        if(!foundTask){
            return res.status(404).json({message:"No Task with this ID exists"})
        }

        await Task.findByIdAndDelete(req.params.id)

        res.json({message:"Task successfully deleted"})

    }
    catch(err){
        console.log(err)
        res.json(err)
    }
})

// PUT /task/:id

router.put('/:id',async(req,res)=>{
    try{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body)
        res.json(updatedTask)
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
})



module.exports = router