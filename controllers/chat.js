const database = require('../database/database');
const Message = require('../models/chatModel');
const User = require('../models/userModel');

function getTimeAgo(createdAt) {
    const seconds = Math.floor((new Date() - createdAt) / 1000);
    const units = [
        ["year", 31536000],
        ["month", 2592000],
        ["week", 604800],
        ["day", 86400],
        ["hour", 3600],
        ["minute", 60],
        ["second", 1],
    ];

    for (let [unit, value] of units) {
        // If seconds is greater than the unit value
        if (seconds >= value) {
            // Calculate the number of units and return the string
            const time = Math.floor(seconds / value);
            return `${time} ${unit}${time > 1 ? 's' : ''} ago`;
        }
    }
    return '';
}

module.exports.postDeleteUser = (req, res, next) => {
    database(db => {
        User.findOneAndDelete({ username: req.session.user }).then().catch();
        Message.deleteMany({ username: req.session.user }).then().catch();
        req.session.user = undefined;
        return res.redirect('/login');
    });
    return;
}
module.exports.getChat = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.redirect('/login');
    }
    database(connect => {
        User.findOne({ username: req.session.user }).then(founduser => {

            if (founduser === null) {
                req.session.user = undefined;
                return res.redirect('/login');
            }
            else {
                Message.find().then(messages => {
                
                    return res.render('chat', { pageTitle: 'Chat', user: req.session.user, messages: messages.reverse() ,getTimeAgo});
                }).catch(err => { console.log(err); });
            }
        })


    });
    return;

};
module.exports.postMessage = (req, res, next) => {
    database(connect => {
        const newmessage = new Message({ username: req.session.user, message: req.body.message });
        newmessage.save();
    });
    return res.redirect('/');
};