const express = require('express');
const pm = require('../../data/helpers/projectModel');
const am = require('../../data/helpers/projectModel');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    //get can take in an id if needed
});

router.get('/:id', (req, res) => {
    //get can take in an id if needed
});

router.get('/:id/actions', (req, res) => {
    //here
});

router.delete('/:id', (req, res) => {
    //here
});

router.put('/:id', (req, res) => {
    //here
});

router.post('/', (req, res) => {
    //here
});

// router.post('/:id/actions', (req, res) => {
//     //here
// });

module.exports = router;