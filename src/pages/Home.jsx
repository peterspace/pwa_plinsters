import React, { useState, useEffect } from "react";
import axios from "axios";

// testing redirect
//production build: yarn preview
//ttp://localhost:4173/

const backend = import.meta.env.VITE_BACKEND_URL;
// const backend = "http://localhost:4000";
const homeLink = import.meta.env.VITE_FRONTEND_URL;

const Home = () => {
  const [redirectUrl, setRedirectUrl] = useState("");
  const userIdL = localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : null;
  const [userId, setUserId] = useState(userIdL);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", JSON.stringify(userId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  console.log({ userId });
  console.log({ redirectUrl });
  console.log({ errorMessage });

  const landingPageEvent = () => {
    window.fbq("track", "HomePage");
  };

  useEffect(() => {
    landingPageEvent();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     redirectUser();
  //   }, 3000);
  // });
  // async function redirectUser() {
  //   window.location.replace("https://www.apple.com/app-store/");
  // }

  async function redirectHome() {
    window.location.replace(homeLink);
  }

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 300);
  });

  //https://x.com/?lang=en
  //https://1xlite-567488.top/en
  //https://1xlite-567488.top/en/registration?type=fast
  //bg-[#205583]

  // useEffect(() => {
  //   if (!isLoading) {
  //     logIn();
  //   }
  // }, [isLoading]);

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
      // alert("Lead error");
      console.log({ error });
      setErrorMessage({ "Lead error": error });
    }
  }

  useEffect(() => {
    redirectUser();
  }, [redirectUrl]);

  async function redirectUser() {
    if (userId && redirectUrl) {
      // stor user to local storage
      window.location.replace(redirectUrl);
      setRedirectUrl("");
    }
  }

  return (
    <div
      // className="w-screen relative [background:linear-gradient(180deg,_#1e1e1e,_#040303)] h-screen overflow-hidden flex flex-col items-center justify-center text-left text-13xl text-gray-100 font-poppins"
      className="w-screen relative h-screen bg-[#205583] overflow-hidden flex flex-col items-center justify-center text-left text-13xl text-gray-100 font-poppins"
    >
      <div className="flex flex-row justify-center items-center text-2xl text-white font-bold">
        <div className="flex flex-col gap-4 items-start justify-start text-[18px]">
          {isLoading && !userId && !redirectUrl && (
            <div className="w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]">
              loading ...
            </div>
          )}

          {!isLoading && !userId && !redirectUrl && (
            <div
              className="cursor-pointer hover:opacity-90 w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]"
              onClick={logIn}
            >
              Launch
            </div>
          )}

          {userId && !redirectUrl && (
            <div
              className="cursor-pointer hover:opacity-90 w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]"
              onClick={logIn}
            >
              Launch
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
