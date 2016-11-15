const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents
}
/**
 * show all events
 */
    function showEvents(req, res) {
        // get all events
    // grab all events, the {} matches all
    Event.find({}, (err, events) => {
        res.render('pages/events', {events: events });
    });

    }

/**
 * show a single event
 */
    function showSingle (req, res)  {
    // grab a single event with the slug ping-pong
    Event.findOne({ slug: req.param(['slug']) }, (err, event) => {
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
            {name : 'Sailing', description: 'For sailing you need at least a boat. With this boat you can sail on a lake or on the sea. Have fun as sailor.'}
        ];
        // use the Event model to insert /save
        Event.remove({}, () => {;
            for (event of events) {
                var newEvent = new Event(event);
                newEvent.save();
            }
        });

        // seeded
        res.send("Database seeded ....")
    }
