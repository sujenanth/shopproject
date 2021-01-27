const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const cors = require('cors');
const itemTemplate = require('../model/Item')
const teacherTemplate = require('../model/Teacher')

const jwt = require('jsonwebtoken')

router.post('/newItem',authenticateToken, async (request, response) => {
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
                                res.json(err)
                                throw err
                            }
                            let token = jwt.sign({teacher}, process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: '12h'
                            });
                            let data = ({
                                username: teacher.username,
                                success : true,
                                lastname : teacher.lastName,
                                accesstoken: token
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

function authenticateToken(req, res, next){
    const token = req.headers['authorization']
    if(token == null){
        console.log("no token")
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = {
            _id: user.teacher._id,
            firstName: user.teacher.firstName,
            lastName: user.teacher.lastName,
            username: user.teacher.username
        }
        next()
    })
}

module.exports = router;