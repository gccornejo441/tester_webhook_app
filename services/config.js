

module.exports = {
    // Messenger Platform API
mPlatformDomain: "https://graph.facebook.com",
mPlatformVersion: "v10.0",

// Page and Application information
pageId: "101980465442553",
appId: "254907099748012",
pageAccesToken: "EAADn1i8hlqwBAPN4qFne2DNjG50GbLDQ11d7urufxJipMAP38hsU2EtCGrnV1e97ZAZBpGba7WTTMZAtjtFG2C1TzBvNhJ15eZAfdUNdQ7ybspRj7yzVA0oZAQ6x5ZCDfRUy4HeavydQSB2dGKcc1JonhITSGaeLEfKE5ZBbUeEqm8a3DnrTReFp2r06QGZB0tIZD",
appSecret: "a70719ed212f0e6f11182399752c2cd0",
verifyToken: "somestring",

// URL of your app domain
appUrl: "https://36b501610e14.ngrok.io",

// URL of your website
shopUrl: "https://www.webworksdreams.com",

// Persona IDs
personas: { id: "952576632265181"},

get newPersonas() {
  return [
    {
      name: "Gabriel",
      profile_picture_url: `${this.appUrl}/favicon-`
    },
  ];
},

get mPlatform() {
    return this.mPlatformDomain + "/" + this.mPlatformVersion;
},

// URL of your webhook endpoint
get webhookUrl() {
  return this.appUrl + "/webhook";
},

// POSTBACK TEXT
about: "We offer websites that are tailored to your needs and your user demands, so we have cultivated our process to target customer satisfaction.",
services: "We offer website development, website design, and website upgrades.",
moreInfo: "Oops, no response.  Try asking a custom question.",
}