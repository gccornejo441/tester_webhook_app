import React, { useEffect } from "react";

const Messenger = () => {
  useEffect(() => {
    // Facebook Chat Initialization
    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: "v11.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div
        id="fb-customer-chat"
        class="fb-customerchat"
        page_id="101980465442553"
      ></div>
    </>
  );
};

export default Messenger;
