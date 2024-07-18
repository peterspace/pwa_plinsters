import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        FB.init({
          appId: "378111948625013",
          cookie: true,
          xfbml: true,
          // version: "4.40.0",
          version: "v2.4",
          // version: 'v2.7'
        });
        FB.AppEvents.logPageView();
      };

      // Load the Facebook SDK script
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    // Check if FB is defined to avoid errors
    if (window.FB) {
      window.fbAsyncInit();

      console.log({ FBInfo: window.FB });
    } else {
      console.log({ FBInfo: "none" });
      loadFacebookSDK();
    }
  }, []);

  return (
    <div className="w-full h-screen bg-figma-400">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/:sub_id_1/:sub_id_2" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
