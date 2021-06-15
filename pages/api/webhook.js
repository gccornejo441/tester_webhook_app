import request from "request";
const config = require("../../services/config");

export default function handler(req, res) {
  if (req.method == "POST") {
    let body = req.body;

    if (body.object === "page") {
      //Gets the message. entry.message is a an array, but
      // will only ever contain one message, so we get indext 0

      body.entry.forEach(function (entry) {
        // Gets the body of the webhook event
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        console.log("Sender PSID: " + sender_psid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);
        } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
        }
      });
      res.status(200).send("EVENT_RECEIVED");
    } else {
      res.sendStatus(404);
    }
  } else if (req.method == "GET") {
    // verify token should be a random string.
    let VERIFY_TOKEN = config.verifyToken;

    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  }
}

// function handleMessage(sender_psid, received_message) {
//   let response;
//   // if (received_message)
//   if (received_message.text) {
//     response = {
//       "text": received_message.text,
//       "payload": "MORE_POSTBACK_PAYLOAD",
//   }
// }
//   // Send the response message
//   callSendAPI(sender_psid, response);
// }

function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

function handleMessage(sender_psid, message) {
  // let textMessage = message.text.toLowerCase();

  // This if statement is used to pickout help request.
  // if (textMessage.includes("help")) {
  //   callSendAPI(sender_psid, { text: config.services });
  //   return;
  // }

  let messages = [];
  let i;

  // check greeting is here and is confident
  const greeting = firstTrait(message.nlp, "wit$greetings");
  if (greeting && greeting.confidence > 0.8)  {
    callSendAPI(sender_psid, { text: config.greeting });
  } else {
    messages.push(`"${message.text}"`, "string two", "string three");
    for ( i in messages ) {
      // console.log("Messages to be printed: ",messages[i]);
    
    callSendAPI(sender_psid, { text: messages[i] });
    }
  }
}

function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  payload === "MORE_POSTBACK_PAYLOAD"
    ? (response = { text: config.about })
    : payload === "SERVICES_POSTBACK_PAYLOAD"
    ? (response = { text: config.services })
    : (response = { text: config.moreInfo });

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
    persona_id: config.personas.id
  };
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v10.0/me/messages",
      qs: { access_token: config.pageAccessToken },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}
