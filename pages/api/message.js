import request from 'request';

const handler = async (req, res) => {
    if (req.method === 'POST') {

        console.log('req.body: ', req.body.message);
        //POST Request to sendapi

        let request_body = {
            "messaging_type": "RESPONSE",
           "recipient": {
              "id": "2589422804515413"
            },
            "message": {
                "text": req.body.message
              },
          };


    request(
        {
          uri: "https://graph.facebook.com/v10.0/me/messages",
          qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
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
}

export default handler;