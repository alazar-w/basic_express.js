//inorder to use express router
const express = require('express');
const router = express.Router();

const members = require('../../members')

//Gets all members, the slash( / ) represents api/members as described in the index.js file
router.get('/', (req, res) => {
    res.json(members);

});

//Get single member
router.get('/:id', (req, res) => {
    //.some returns true or false
    const found = members.some((member => member.id === parseInt(req.params.id)));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

//Create Member
router.post('/',(req,res) => {
    const newMember = {
        id:1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'please include a name and email'});
    }
    members.push(newMember);
    res.json(members);
})

//update member
router.put('/:id', (req, res) => {
    //.some returns true or false
    const found = members.some((member => member.id === parseInt(req.params.id)));
    if (found) {
      const updateMember = req.body;
      members.forEach(member => {
          if(member.id === parseInt(req.params.id)){
              member.name = updateMember.name? updateMember.name: member.name;
              member.email = updateMember.email? updateMember.email: member.email;

              res.json({msg: 'Member updated',member})
          }
      })
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

//Delete Member
router.delete('/:id', (req, res) => {
    //.some returns true or false
    const found = members.some((member => member.id === parseInt(req.params.id)));
    if (found) {
        res.json({ meg:'Member Deleted', memberrs: members.filter(member => member.id !== parseInt(req.params.id))})
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

module.exports = router;