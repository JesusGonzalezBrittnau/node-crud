const express =require('express');
    router = express.Router();
    mainController = require('./controllers/main.controller');
    eventsController =require('./controllers/events.controller')

// export the router
module.exports = router;


// define routes
// main routes
router.get("/", mainController.showHome);

// event routes
router.get('/events',      eventsController.showEvents);

// seed events
router.get('/events/seed', eventsController.seedEvents);

// create Events
// edit Events
// delete Events


// show a single event
router.get('/events/:slug', eventsController.showSingle);
