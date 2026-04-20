const router = require('express').Router() 
const Task = require('../models/Task')
const verifyToken = require('../middleware/verify-token')


// post router 
router.post('/', verifyToken, async (req, res) => {
  try {
    req.body.username = req.user._id

    if (!req.body.category || req.body.category === "") {
      delete req.body.category
    }

    const createdTask = await Task.create(req.body)
    res.status(201).json(createdTask)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


// get router

router.get('/', verifyToken, async (req, res) => {
    try {
        const allTasks = await Task.find({ username: req.user._id })
            .populate('username')
            .populate('category')

        res.status(200).json(allTasks)   

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// GET /tasks/:id
router.get('/:id',verifyToken, async(req,res)=>{
    try{
        const foundTask = await Task.findById(req.params.id).populate('username')
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
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const foundTask = await Task.findById(req.params.id)

    if (!foundTask) {
      return res.status(404).json({ message: "No Task with this ID exists" })
    }

    if (foundTask.username.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await Task.findByIdAndDelete(req.params.id)

    res.json({ message: "Task successfully deleted" })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// PUT /task/:id

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const foundTask = await Task.findById(req.params.id)

    if (!foundTask) {
      return res.status(404).json({ message: "No Task with this ID exists" })
    }

    if (foundTask.username.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized" })
    }


    const updateData = { ...req.body }

    if (!updateData.category) delete updateData.category
    if (updateData.category === "") delete updateData.category

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )

    res.json(updatedTask)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


module.exports = router