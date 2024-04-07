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
    <main className="flex h-screen flex-col items-center justify-between p-2">
      {/* hey there
      {count}
      {submitted && showPopUp && <div>pop up here</div>}
      <div className="flex flex-col">
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={postData}>send</button>
      </div> */}

      <div className="h-[6%] ">
        <h1>pally</h1>
      </div>
      <div className="border relative p-2 rounded-xl lg:justify-between justify-center items-center flex flex-col lg:flex-row w-full h-[94%] ">

        <div className="flex flex-col lg:justify-around lg:w-[60%] h-full z-20 ">
          <div>
            <div className=" p-1 " >
              <h2 className="text-3xl font-bold " > main header header header here</h2>
              <h3 className="text-xl opacity-80 " >sub header header header header header header here</h3>
            </div>
            <div className=" p-1 mt-5 mb-16 ">
              <h4>a very long intro here long o a very long intro here long o a very long intro here long o</h4>
              <p>some other text here</p>
              <p className="my-1" >some other text here</p>
              <p>some other text here</p>
              <p className="my-1" >some other text here</p>
            </div>
          </div>

          <div className=" mt-12 lg:w-[50%] ">
            <div className="relative border bg-white overflow-hidden flex items-center rounded-full  ">
              <input className="p-2 outline-none w-[80%] " type="email" placeholder="email" name="" id="" />
              <button className="absolute px-3 py-1 my-1 rounded-full right-[10px] bg-black text-white " >send</button>
            </div>
          </div>
        </div>

        <div className=" h-full lg:top-0 top-[20%] lg:relative absolute flex justify-center items-center  " >
          <div className="h-[200px]  w-[200px] bg-red-600 rotate-12 " >

          </div>
        </div>

      </div>

    </main>
  );
}
