const express = require('express');
const am = require('../../data/helpers/actionModel');
const pm = require('../../data/helpers/projectModel');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    //get can take in an id if needed
});

router.get('/:id/actions', (req, res) => {
    //get can take in an id if needed
});

router.delete('/:id', (req, res) => {
    //here
});

router.put('/:id', (req, res) => {
    //here
});

router.post('/:id/actions', (req, res) => {
    //here
});

module.exports = router;