const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const cors = require('cors');
const itemTemplate = require('../model/Item')
const teacherTemplate = require('../model/Teacher')

router.post('/newItem', async (request, response) => {
    const newItem = new itemTemplate({
        name:request.body.name,
        price:request.body.price,
        description:request.body.description,
        kategorie:request.body.kategorie,
        imageurl:request.body.imageurl
    })
    newItem.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})
router.get('/getAllItems',async (request, response) => {
    itemTemplate.find({},function(err, result){
        response.json(result)
    })

})

router.post('/getItembyId', (req, res) => {
    itemTemplate.find({
        _id: req.body.id
    },function (err, item){
       if(err) res.json({error: 'Item doesnt exist'})
        res.json(item)
    })
})

router.post('/register', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash('123456',saltPassword)

    let firstname = 'Nicola'
    let lastname = 'Baechi'

    let newTeacher = new teacherTemplate({
        firstname : firstname,
        lastname : lastname,
        password : securePassword,
        username : firstname.toLowerCase().concat("."+lastname.toLowerCase())
    })

    newTeacher.save()
        .then(data => {
            res.json({success : true})
        })
        .catch(err => {
            res.json({errormessage : err})
        })

})

router.post('/login', (req, res) => {
    if(req.body.password !== undefined){
        if(req.body.name !== undefined){
            teacherTemplate.findOne({username : req.body.name}, (error, teacher) => {
                if(teacher !== null){
                    bcrypt.compare(req.body.password,teacher.password,(err, result) => {
                        if(result){
                            if(err){
                                console.log(err)
                                throw err
                            }
                            let data = ({
                                username: teacher.username,
                                success : true,
                                lastname : teacher.lastName
                            })
                            res.json(data)
                        }
                        else if(err) res.json(err)
                        // if wrong password
                        else{
                            res.json({message: "wrong password"})
                        }
                    })
                }
                // If wrong Username
                else{
                    res.json({message: "wrong username"})
                }
            })
        }
        else{
            res.json({error : 'No username'})
        }
    }
    else{
        res.json({error : 'No Input'})
    }
})

module.exports = router;