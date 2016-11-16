const Event = require('../models/event');

module.exports = {
    showEvents:    showEvents,
    showSingle:    showSingle,
    seedEvents:    seedEvents,
    showCreate:    showCreate,
    processCreate: processCreate

}
/**
 * show all events
 */
    function showEvents(req, res) {
        // grab all events, the {} matches all
        Event.find({}, (err, events) => {
            if (err) {
                res.status(404);
                res.send('Events not found!');
            }
            // return a view with data
            res.render('pages/events', {events: events });
        });
}

/**
 * show a single event
 */
    function showSingle (req, res)  {
        // grab a single event with the slug ping-pong
        Event.findOne({ slug: req.params.slug }, (err, event) => {
            if (err) {
                res.status(404);
                res.send('Event not found!')
            }
            // return a single event
            res.render('pages/single', {event: event});
        });
    }

/**
 * Insert records into the DB
 */
    function seedEvents (req, res) {
        // create some events
        const events = [
            {name: 'Basketball', description: 'Throwing into a basket.'},
            {name: 'Swimming', description: 'Michael Phelps ist the fastest fish!'},
            {name: 'Weightlifting', description: 'Lifting heavy things up.'},
            {name: 'Ping Pong', description: 'Super fast paddles.'},
            {name: 'Soccer', description: 'A game with eleven players on the field.'},
            {name: 'Icehockey', description: 'Canadians an unbeatable on the ice'},
            {name : 'Sailing', description: 'For sailing you need at least a boat. With this boat you can sail on a lake or on the sea. Have fun as sailor.'},
            {name : 'Mountainbike', description: 'Very heavy run on a bicycle'}
        ];
        // use the Event model to insert /save
        Event.remove({}, () => {;
            for (event of events) {
                var newEvent = new Event(event);
                newEvent.save();
            }
        });
        // seeded
        res.render('pages/events', {events: events });
    }

/**
 * Show the create form
 */
    function showCreate(req, res){
        res.render('pages/create');
    }
/**
 * Process the creation form
 */
    function processCreate(req, res) {
        // create a new event
        console.log('req.body.name: ' + req.body.name);
        const event = new Event({
            name: req.body.name,
            description: req.param.description
        });

        // save event
        event.save((err) => {
            if (err)
            throw err;

        // redirect to the newly created event
        res.redirect(`/events/${event.slug}`);
    });
}
