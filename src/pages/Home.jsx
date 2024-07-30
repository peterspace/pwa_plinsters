import React, { useState, useEffect } from "react";
import axios from "axios";

// testing redirect
//production build: yarn preview
//ttp://localhost:4173/

const backend = import.meta.env.VITE_BACKEND_URL;
// const backend = "http://localhost:4000";
// const backend = "https://dm-wings-server.onrender.com";

const Home = () => {
  //============={Local state variables}=============================
  const redirectUrlL = localStorage.getItem("redirectUrl")
    ? JSON.parse(localStorage.getItem("redirectUrl"))
    : null;

  const userIdL = localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : null;

  //============={ state variables}=============================
  const [redirectUrl, setRedirectUrl] = useState(redirectUrlL);
  const [userId, setUserId] = useState(userIdL);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", JSON.stringify(userId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (redirectUrl) {
      localStorage.setItem("redirectUrl", JSON.stringify(redirectUrl));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectUrl]);

  console.log({ userId });
  console.log({ redirectUrl });
  console.log({ errorMessage });

  const landingPageEvent = () => {
    window.fbq("track", "HomePage");
  };

  useEffect(() => {
    landingPageEvent();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 300);
  });

  //https://1xlite-567488.top/en
  //https://1xlite-567488.top/en/registration?type=fast
  //bg-[#205583]

  async function logIn() {
    let newUrl = backend;
    if (userId && userId !== "1") {
      newUrl = `${backend}/?user_id=${userId}`;
    }
    console.log({ newUrl });
    try {
      const response = await axios.get(newUrl);

      if (response.data) {
        // registration successful
        setUserId(response.data.userId);
        setRedirectUrl(response.data.url);
        setIsLoading(false);
      }
    } catch (error) {
      console.log({ error });
      setErrorMessage({ "Lead error": error });
    }
  }

  useEffect(() => {
    logIn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function redirectUser() {
    if (redirectUrl || redirectUrlL) {
      const url = redirectUrl ? redirectUrl : redirectUrlL;
      window.location.replace(url);
    }
  }

  return (
    <div
      // className="w-screen relative [background:linear-gradient(180deg,_#1e1e1e,_#040303)] h-screen overflow-hidden flex flex-col items-center justify-center text-left text-13xl text-gray-100 font-poppins"
      className="w-screen relative h-screen bg-[#205583] overflow-hidden flex flex-col items-center justify-center text-left text-13xl text-gray-100 font-poppins"
    >
      <div className="flex flex-row justify-center items-center text-2xl text-white font-bold">
        <div className="flex flex-col gap-4 items-start justify-start text-[18px]">
          {/* ==============={on component mount}====================== */}

          {!userId && !redirectUrl && !redirectUrlL && (
            <div className="w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]">
              loading ...
            </div>
          )}

          {!userId && !redirectUrl && redirectUrlL && (
            <button
              className="cursor-pointer hover:opacity-90 w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]"
              onClick={redirectUser}
            >
              Launch
            </button>
          )}
          {/* ==============={Server delay}====================== */}

          {userId && !redirectUrl && (
            <button
              className="cursor-pointer hover:opacity-90 w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]"
              onClick={logIn}
            >
              Connecting
            </button>
          )}
          {/* ==============={First time user}====================== */}
          {!userId && redirectUrl && (
            <button
              className="cursor-pointer hover:opacity-90 w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]"
              onClick={redirectUser}
            >
              Launch
            </button>
          )}
          {/* ==============={Existing time user}====================== */}

          {userId && redirectUrl && (
            <button
              className="cursor-pointer hover:opacity-90 w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]"
              onClick={redirectUser}
            >
              Launch
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
