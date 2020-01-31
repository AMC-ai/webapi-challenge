const express = require('express');
const am = require('../../data/helpers/actionModel');
const pm = require('../../data/helpers/projectModel');
const router = express.Router();
router.use(express.json());


router.get('/', (req, res) => {
    am.get()
        .then(actions => {
            res
                .status(200)
                .json(actions);
        })
        .catch(error => {
            console.log('error on GET /actions', error);
            res
                .status(500)
                .json({ errorMessage: 'The actions information could not be retrieved.' });
        });
});

router.get('/:id', (req, res) => {
    pm.get(req.params.id)
        .then(project => {
            if (project) {
                am.get()
                    .then(actions => {
                        res
                            .status(200)
                            .json(actions)
                    })
            } else {
                res
                    .status(404)
                    .json({ message: 'The project with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log('error on GET /:id /actions', error);
            res
                .status(500)
                .json({
                    message: 'The project\'s actions information could not be retrieved.',
                });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    am.get(id)
        .then(action => {
            if (!action) {
                res
                    .status(404)
                    .json({ message: "The action with the specified ID does not exist." })
            } else {
                am.remove(id)
                    .then(action => {
                        res
                            .status(201)
                            .json(action)
                    })
                    .catch(error => {
                        console.log('error on DELETE /action/:id', error);
                        res
                            .status(500)
                            .json({ error: "The action could not be removed." });
                    });
            };
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    console.log(req.body)

    am.get(id)
        .then(action => {
            console.log('action put by id', action)
            if (!action) {
                res
                    .status(404)
                    .json({ message: "The action with the specified ID does not exist." })
            } else if (!changes.description || !changes.notes) {
                res
                    .status(400)
                    .json({ errorMessage: "Please provide update for the action." })
            } else {
                am.update(id, changes)
                    .then(action => {
                        res
                            .status(200)
                            .json(action)
                    })
                    .catch(error => {
                        console.log('error on PUT /action/:id', error);
                        res
                            .status(500)
                            .json({ error: "The action information could not be modified." });
                    });
            }
        });
});


router.post('/', validateProjectId, (req, res) => {
    const action = req.body;
    const { description, completed, notes } = action;
    console.log(action);

    if (action.description && action.description.length === 0) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide Description for the action.' })
    } else {
        am.insert(action)
            .then(action => {
                res
                    .status(201)
                    .json(action);
            })
            .catch(error => {
                console.log('error on POST action', error);
                res
                    .status(500)
                    .json({ error: 'There was an error while saving the action to the database.' })
            });
    };
});

function validateProjectId(req, res, next) {
    const id = req.params.id;
    console.log('valid id', id)
    am.get(id)
        .then(project => {
            if (!project) {
                res.status(401).json({ message: "invalid project id" });
            } else {
                next();
            }
        })
        .catch(error => {
            console.log('error on Validating /Project ID', error);
            res
                .status(500)
                .json({ error: "Server Error Validating ID." });
        });
}

module.exports = router;