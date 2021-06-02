export default function handler(req, res) {
  if (req.method == "POST") {
    let body = req.body;

    if (body.object === "page") {
      //Gets the message. entry.message is a an array, but
      // will only ever contain one message, so we get indext 0

      body.entry.forEach((entry) => {
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });
      res.status(200).send("EVENT_RECEIVED");
    } else {
      res.sendStatus(404);
    }
  } else if (req.method == "GET") {
    // verify token should be a random string.
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

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
