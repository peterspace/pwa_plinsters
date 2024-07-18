import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const backend = import.meta.env.VITE_BACKEND_URL;
// const backend = "http://localhost:4000";

const Register = () => {
  const params = useParams();
  const { sub_id_1, sub_id_2 } = params;
  // const [userId, setUserId] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const userIdL = localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : 1;
  const [userId, setUserId] = useState(userIdL);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", JSON.stringify(userId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  console.log({ params });
  console.log({ userId });
  console.log({ redirectUrl });
  console.log({ errorMessage });

  const registrationPageEvent = () => {
    window.fbq("track", "RegistrationPage");
  };

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 300);
  });

  useEffect(() => {
    if (!isLoading) {
      signUp();
    }
  }, [isLoading]);

  async function signUp() {
    let newUrl = "";

    if (sub_id_1 && sub_id_2) {
      newUrl = `${backend}/register/?sub_id_1=${sub_id_1}&sub_id_2=${sub_id_1}`;
    }
    if (sub_id_1 && !sub_id_2) {
      newUrl = `${backend}/register/?sub_id_1=${sub_id_1}`;
    }

    if (!sub_id_1 && !sub_id_2) {
      newUrl = `${backend}/register`;
    }

    console.log({ newUrl });
    try {
      const response = await axios.get(newUrl);

      if (response.data) {
        // registration successful
        registrationPageEvent(); // facebook event
        setUserId(response.data.userId);
        setRedirectUrl(response.data.url);
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
              {" "}
              Registration in progress ...
            </div>
          )}

          {!isLoading && userId && !redirectUrl && (
            <div className="w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]">
              {" "}
              something went wrong ...
            </div>
          )}
          {isLoading && !userId && !redirectUrl && (
            <div className="w-fit text-center text-white font-semibold inline-block rounded-lg px-3 py-1 bg-[#1F4872]">
              {" "}
              processing ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
