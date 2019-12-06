const express = require('express');
const pm = require('../../data/helpers/projectModel');
const am = require('../../data/helpers/projectModel');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    pm.get()
        .then(projects => {
            res
                .status(200)
                .json(projects);
        })
        .catch(error => {
            console.log('error on GET /projects', error);
            res
                .status(500)
                .json({ errorMessage: 'The project information could not be retrieved.' });
        });
});

router.get('/:id', (req, res) => {
    pm.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res
                    .status(404)
                    .json({ message: 'The project with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log('error on GET /project/:id', error);
            res
                .status(500)
                .json({
                    message: 'The project information could not be retrieved.',
                });
        });
});

router.get('/:id/actions', (req, res) => {
    pm.getProjectActions(req.params.id)
        .then(project => {
            if (project.length === 0) {
                res
                    .status(404)
                    .json({ message: 'The project with the specified ID does not exist.' });
            } else {
                res.status(200).json(project);
            }
        })
        .catch(error => {
            console.log('error on GET /:id/project/actions', error);
            res
                .status(500)
                .json({
                    message: 'The project information could not be retrieved.',
                });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    pm.get(id)
        .then(project => {
            if (!project) {
                res
                    .status(404)
                    .json({ message: "The project with the specified ID does not exist." })
            } else {
                pm.remove(id)
                    .then(project => {
                        res
                            .status(201)
                            .json(project)
                    })
                    .catch(error => {
                        console.log('error on DELETE /project/:id', error);
                        res
                            .status(500)
                            .json({ error: "The project could not be removed." });
                    });
            };
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    console.log(req.body)

    pm.get(id)
        .then(project => {
            console.log('project put by id', project)
            if (!project) {
                res
                    .status(404)
                    .json({ message: "The project with the specified ID does not exist." })
            } else if (!changes.completed || !changes.description || !changes.name) {
                res
                    .status(400)
                    .json({ errorMessage: "Please provide update for the project." })
            } else {
                pm.update(id, changes)
                    .then(project => {
                        res
                            .status(200)
                            .json(project)
                    })
                    .catch(error => {
                        console.log('error on PUT /project/:id', error);
                        res
                            .status(500)
                            .json({ error: "The project information could not be modified." });
                    });
            }
        });
});

router.post('/', (req, res) => {
    const project = req.body;
    const { name, description, completed } = project;
    console.log(project);
    if (name.length === 0) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide NAME for the project.' })
    } else {
        pm.insert(project)
            .then(project => {
                res
                    .status(201)
                    .json(project);
            })
            .catch(error => {
                console.log('error on POST project', error);
                res
                    .status(500)
                    .json({ error: 'There was an error while saving the project to the database.' })
            });
    };
});

// router.post('/:id/actions', (req, res) => {
//     //here
// });

module.exports = router;