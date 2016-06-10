/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Vegas Geek for a Vegas fact"
 *  Alexa: "Here's your Vegas fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Vegas facts.
 */
var FACTS = [
    "42312216 people visited Las Vegas last year",
    "5891151 people attended a convention in Las Vegas last year",
    "Clark County had 9.6 billion dollars in gaming revenue last year.",
    "The Las Vegas Strip had 6.3 billion in gaming revenue last year.",
    "The average Las Vegas Visitor has a gambling budget of five hundred seventy nine dollars.",
    "The average nightly cost of a hotel room in Las Vegas is one hundred twenty dollars.",
    "There are over one hundred twenty thousand hotel rooms in Las Vegas.",
    "The average visitor stays 3.4 nights in Las Vegas",
    "8 percent of visitors travel to Las Vegas, with someone younger then 21",
    "16 percent of visitors, are first time visitors of Las Vegas.",
    "16 percent of visitors, travel to Las Vegas internationally.",
    "The hotel occupancy rate in Las Vegas is almost 90 percent.",
    "The City of Las Vegas was incorporated in nineteen eleven.",
    "There’s estimated to be at least 1,000 people living beneath Vegas in underground tunnels.",
    "Michael Jackson had plans to build a 50 foot tall moon walking robot replica of himself to roam the Las Vegas desert. It was intended to be an advertisement for a planned 2005 comeback.",
    "In nineteen thirty one Gambling was legalized in Nevada.",
    "It would take 288 years for one person to spend one night in every hotel room in Las Vegas.",
    "Contrary to popular belief, prostitution in Las Vegas is not legal.",
    "According to suppliers, Vegas Bingo players’ favorite color ink daubers are purple.",
    "Water structures in Las Vegas, like fountains and man-made lakes, use something called grey-water, which is recycled water from sinks, bathtubs and showers.",
    "Las Vegas is informally known as Hawaii’s 9th island, due to the city’s large community of Hawaiians.",
    "Approximately 34% of thefts and cheating in Las Vegas casinos are committed by staff.",
    "Tangiers Casino used in Martin Scorcese’s film, “Casino” never actually existed.",
    "At 1,149 feet, the Stratosphere Las Vegas is the tallest freestanding observation tower in the nation.",
    "Mobster Bugsy Siegel named his casino, The Flamingo, after his showgirl girlfriend, whose long legs garnered her the same name.",
    "The Luxor Las Vegas’ Sphinx, a re-creation of the Great Sphinx of Giza, is 101 feet high and larger than the original.",
    "Las Vegas is translated to “the meadows” in Spanish.",
    "Las Vegas is home to more than half of the 20 largest hotels in the world.",
    "McCarran International Airport is the seventh busiest airport in the United States and North America.",
    "Annual rainfall in Las Vegas totals slightly more than four inches.",
    "Downtown's Golden Gate is the oldest continuously operating hotel and casino in Las Vegas; it opened in 1906 as Hotel Nevada."
    
    
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * VegasGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a Vegas fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Vegas fact from the Vegas facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the VegasGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

