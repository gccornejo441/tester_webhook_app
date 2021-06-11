import request from "request";

const config = require("../../services/config");

const handler = async (req, res) => {
  if (req.method === "POST") {
    let url = `https://graph.facebook.com/v7.0/me/messenger_profile?access_token=${config.PAGE_ACCESS_TOKEN}`;
    let request_body = {
      get_started: {
        payload: "GET_STARTED",
      },
      persistent_menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: "postback",
              title: "Talk to an agent",
              payload: "TALK_AGENT",
            },
            {
              type: "postback",
              title: "Restart this conversation",
              payload: "RESTART_CONVERSATION",
            },
            {
              type: "nested",
              title: "More info",
              call_to_actions: [
                {
                  type: "web_url",
                  title: "View Facebook Fan Page",
                  url: "https://www.facebook.com",
                  webview_height_ratio: "full",
                },
                {
                  type: "web_url",
                  title: "View website WebWorks Dreams",
                  url: "https://webworksdreams.com",
                  webview_height_ratio: "full",
                },
              ],
            },
          ],
        },
      ],
      whitelisted_domains: ["https://7e6bd1a09c33.ngrok.io/"],
    };
    // Send the HTTP request to the Messenger Platform
    request(
      {
        uri: url,
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
  } else {
    res.sendStatus(404);
  }
};

export default handler;
