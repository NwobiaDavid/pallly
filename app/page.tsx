"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [count, setCount] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true); // Added state for email validation
  const [showPopUp, setShowPopUp] = useState(false); // State to control pop-up visibility

  useEffect(() => {
    const fetchCount = async () => {
      let responseData;
      try {
        const res = await fetch("http://localhost:3000/api/count", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        responseData = await res.json();
        if (res.status !== 200) {
          throw new Error(responseData.message);
        }
        setCount(responseData.count);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchCount();
  }, []);

  async function postData() {
    if (!isValidEmail) {
      alert("Please insert a valid email address");
      return;
    }

    let responseData;
    try {
      const response = await fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      responseData = await response.json();
      if (response.status !== 201) {
        throw new Error(responseData.message);
      }

      setEmail("");
      setSubmitted(true);
      setShowPopUp(true); // Show pop-up after successful submission
      setIsLoading(false);
      setTimeout(() => {
        setShowPopUp(false); // Hide pop-up after a few seconds
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.log("error submitting email :(");
      console.log("Error: ", error);
      setIsLoading(false);
    }
  }

  function validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleEmailChange(event: { target: { value: any; }; }) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail)); // Validate email on change
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hey there
      {count}
      {submitted && showPopUp && <div>pop up here</div>}
      <div className="flex flex-col">
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={postData}>send</button>
      </div>
    </main>
  );
}
