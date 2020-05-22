const mongoose = require('mongoose');
// Atlas connection string                                                                                                                                        
const mongoUrl = 'mongodb+srv://axian:test@cluster0-9ungs.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connection.on('connected', function() {
    // Hack the database back to the right one, because when using mongodb+srv as protocol.
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db('axian');
    }
    console.log('Connection to MongoDB established.')
});

const conn = mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = conn;