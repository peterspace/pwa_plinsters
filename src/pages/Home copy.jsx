import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  signUpOTPVerificationEvent,
  signUpPhoneNumberEvent,
  landingPageEvent,
  kycUploadEvent,
  leadEvent,
  purchaseEvent,
  purchaseEventStandard,
} from "../../utils/FacebookPixelEvents";

//http://localhost:5173/purchase/123/user245
const Home = () => {
  const params = useParams();
  const { event, client_ip_address, fbclid, external_id } = params;
  const [errorMessage, setErrorMessage] = useState();
  const [facebookResponse, setFacebookResponse] = useState();
  const [initialData, setInitialData] = useState();

  console.log({ leadParams: params });
  console.log({ initialData });
  console.log({ facebookResponse });
  console.log({ errorMessage });

  useEffect(() => {
    landingPageEvent();
  }, []);

  // //=================={Registration}==================
  useEffect(() => {
    if (event === "purchase") {
      sendPurchase();
      // purchaseEventStandard();
    }
    if (event === "lead") {
      sendLead();
    }
    if (event === "registration") {
      userRegistration();
    }
  }, [event]);

  // useEffect(() => {
  //   checkWindow();
  // }, []);

  // async function checkWindow() {
  //   if (typeof window !== "undefined" && window.fbq) {
  //     console.log({ window });
  //     console.log({ facebookLoaded: window.fbq });

  //     // window.fbq("init", "YOUR_PIXEL_ID"); // Replace with your Facebook Pixel ID
  //     // window.fbq("track", "PageView");
  //   }
  // }
  //new
  async function sendLead() {
    let userData = "";
    if (!external_id) {
      return;
    }

    let ip;

    if (client_ip_address) {
      ip = "192.168.1.1";
    }

    if (!fbclid) {
    }
    if (client_ip_address || fbclid || external_id) {
      userData = {
        client_ip_address: ip,
        fbclid: fbclid ? fbclid : null,
        external_id: external_id || "",
      };

      setInitialData(userData);
      try {
        const data = await leadEvent(userData);
        setFacebookResponse("Lead event logged successfully");

        setInitialData(null);
      } catch (error) {
        // alert("Lead error");
        console.log({ error });
        setErrorMessage({ "Lead error": error });
        setInitialData(null);
      }
    }
  }

  async function sendPurchase() {
    let userData = "";
    if (!external_id) {
      return;
    }

    let ip;

    if (client_ip_address) {
      ip = "192.168.1.1";
    }

    if (!fbclid) {
    }
    if (client_ip_address || fbclid || external_id) {
      userData = {
        client_ip_address: ip,
        fbclid: fbclid ? fbclid : null,
        external_id: external_id || "",
      };

      setInitialData(userData);
      try {
        // const data = purchaseEvent()
        const data = await purchaseEvent(userData);
        setFacebookResponse("Purchase event logged successfully");
        setInitialData(null);
      } catch (error) {
        // alert("Purchase error");
        console.log({ error });
        setErrorMessage({ "Purchase error": error });
        setInitialData(null);
      }
    }
  }

  async function userRegistration() {
    signUpOTPVerificationEvent();
    signUpPhoneNumberEvent();
  }

  return (
    <div className="w-screen relative [background:linear-gradient(180deg,_#1e1e1e,_#040303)] h-screen overflow-hidden flex flex-col items-center justify-center text-left text-13xl text-gray-100 font-poppins">
      <div className="flex flex-row justify-center items-center text-2xl text-white font-bold">
        Welcome Home!
        {/* <img
          className="h-full relative object-cover overflow-hidden shrink-0"
          alt=""
          src="/welcome.png"
        /> */}
      </div>
    </div>
  );
};

export default Home;
