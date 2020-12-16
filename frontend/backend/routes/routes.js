const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const cors = require('cors');
const itemTemplate = require('../model/Item')

router.post('/newItem', async (request, response) => {
    const newItem = new itemTemplate({
        name:request.body.name,
        price:request.body.price,
        description:request.body.description,
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
router.get('/getItems',async (request, response) => {
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

module.exports = router;