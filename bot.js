/**
 * Created by prabh on 2016-06-18.
 */
const botBuilder = require('claudia-bot-builder');

const Logger = require('node-wit').Logger;
const levels = require('node-wit').logLevels;
const Wit = require('node-wit').Wit;

const token = 'TRCCX7N2MIQXXWBWLR3GHXREVUK736BZ';


const context = {};
const sessionId = '_' + Math.random().toString(36).substr(2, 9);

const actions = {
    say(sessionId, context, message, cb) {
        return (message);
        cb();
    },
    merge(sessionId, context, entities, message, cb) {
        cb(context);
    },
    error(sessionId, context, error) {
        return (error.message);
    },
};


const logger = new Logger(levels.DEBUG);
const client = new Wit(token, actions, logger);


var msgback = '';
module.exports = botBuilder(request => {

    /* AI Code*/

    client.runActions(sessionId, request.text, context, (e, context1) => {
        if (e) {
            return 'Error: ' + e.message;
        }
        return context1.type;
        client.runActions(sessionId, request.text, context1, (e, context2) => {
            if (e) {
                return 'Error with wit.ai: ' + e.message;
            }
            return context2.type;
        });
    });


    /* if else code */
    console.log('received', request);
    if ((request.text).search(/password/i) != -1) {
        msgback = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: "Reset Password",
                            image_url: "http://funemployment.altervista.org/wp-content/uploads/2015/07/scelta-call-center.jpg",
                            subtitle: "Please contact IT Support to reset your Sheridan Password",
                            buttons: [
                                {
                                    type: "web_url",
                                    url: "http://it.sheridancollege.ca/service-catalogue/support/",
                                    title: "Call IT Support"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
    else if (((request.text).search(/conference/i) != -1) && (((request.text).search(/normal/i) == -1) || ((request.text).search(/webex/i) != -1))) {
        msgback = 'Which conference type would you like to book? (Normal or Webex)'
    }
    else if ((((request.text).search(/normal/i) != -1) && ((request.text).search(/conference/i) != -1)) || ((request.text).search(/normal/i) != -1)) {
        msgback = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: "Conference Booking",
                            image_url: "http://cliparts.co/cliparts/8iE/bGa/8iEbGaaia.jpg",
                            subtitle: "Conferencing made easy",
                            buttons: [
                                {
                                    type: "web_url",
                                    url: "http://mobile.sheridanc.on.ca/~sing1763/travel",
                                    title: "Book Conference"
                                }
                            ]
                        }
                    ]
                }
            }

        }
    }
    else if ((((request.text).search(/webex/i) != -1) && ((request.text).search(/conference/i) != -1)) || ((request.text).search(/webex/i) != -1)) {
        msgback = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: "Webex Meeting",
                            image_url: "http://www.neteranetworks.com/wp-content/uploads/2015/05/cisco-webex-logo-image-300x167.jpg",
                            subtitle: "Reliable meetings from anywhere",
                            buttons: [
                                {
                                    type: "web_url",
                                    url: "https://sheridancollege.webex.com",
                                    title: "Book Webex Meeting"
                                }
                            ]
                        }
                    ]
                }
            }

        }
    }
    else if ((request.text).search(/phone/i) != -1) {
        msgback = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: "Desktop Telephone",
                            image_url: "http://it.sheridanc.on.ca/service-catalogue/voice-video/images/phones/cisco8945.jpg",
                            subtitle: "Cisco 8945",
                            buttons: [
                                {
                                    type: "web_url",
                                    url: "https://it.sheridancollege.ca/selfhelp/telephony/desktopphonerequest/requests/add",
                                    title: "Order Phone"
                                }
                            ]
                        }
                    ]
                }
            }

        }
    }
    else if ((request.text).search(/hello/i) != -1) {
        msgback = "SheridanBot Welcomes you, My lord"
    }
    return msgback;
});
