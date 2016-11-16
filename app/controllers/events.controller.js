const Event = require('../models/event');

module.exports = {
    showEvents:    showEvents,
    showSingle:    showSingle,
    seedEvents:    seedEvents,
    showCreate:    showCreate,
    processCreate: processCreate,
    showEdit:      showEdit,
    processEdit:   processEdit,
    deleteEvent:   deleteEvent



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
            res.render('pages/events', {
                events: events,
                success: req.flash('success')
            });
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
            res.render('pages/single', {
                event: event,
                success: req.flash('success')
            });
        });
    }

/**
 * Insert records into the DB (for reset of the DB)
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
            {name: 'Mountainbike', description: 'Very heavy run on a bicycle'}
        ];
        // use the Event model to insert /save
        Event.remove({}, () => {;
            for (event of events) {
                var newEvent = new Event(event);
                newEvent.save();
            }
        });
        // seeded
        res.render('pages/events', {
            events: events,
            success: req.flash('success')
        });
    }

/**
 * Show the create form
 */
    function showCreate(req, res){
        res.render('pages/create', {
            errors: req.flash('errors')
        });
    }
/**
 * Process the creation form
 */
    function processCreate(req, res) {
        // validate information
        req.checkBody('name', 'Name is required.').notEmpty();
        req.checkBody('description', 'Description is required.').notEmpty();

        // if there are errors redirect the errors to flash
        const errors = req.validationErrors();
        if (errors) {
            req.flash('errors', errors.map(err => err.msg));
            return res.redirect('/events/create');
        }

        // create a new event
        const event = new Event({
            name: req.body.name,
            description: req.body.description
        });

        // save event
        event.save((err) => {
            if (err)
            throw err;

        // set a successful flash message
        req.flash('success', 'Successfully created event!');

        // redirect to the newly created event
        res.redirect(`/events/${event.slug}`);
        });
    }

    /**
     * show the edit form
     */
    function showEdit(req, res){
        Event.findOne({ slug: req.params.slug }, (err, event) => {
            // return a single event
            res.render('pages/edit', {
                event: event,
                errors: req.flash('errors')
            });
        });
    }

    /**
     * process the edit form
     */
    function processEdit(req, res){
        // validate information
        req.checkBody('name', 'Name is required.').notEmpty();
        req.checkBody('description', 'Description is required.').notEmpty();

        // if there are errors redirect the errors to flash
        const errors = req.validationErrors();
        if (errors) {
            req.flash('errors', errors.map(err => err.msg));
            return res.redirect(`/events/${req.params.slug}/edit`);
        }
        // finding the curren event
        Event.findOne({ slug: req.params.slug }, (err, event) => {

            // updating that event
            event.name = req.body.name;
            event.description = req.body.description;
            event.save((err) => {
                if (err) throw err;
            // success flash message
                req.flash('success', 'Successfully updatet event.');
            // redirect to the /events
                res.redirect('/events');
            });
        });
    }

/**
 * delete an event
 */
    function deleteEvent(req, res){
        Event.remove({ slug: req.params.slug }, (err) => {
            // set the flash data
            req.flash('success', 'Event successfully deleted!');
            // redirect back to the events page
            res.redirect('/events');
        });
    }