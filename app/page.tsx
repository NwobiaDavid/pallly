"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";

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
    <main className="flex h-screen flex-col items-center justify-between lg:p-4 p-2 bg-purple-300 to-blue-500 bg-gradient-to-tr ">

      {/* hey there
      {count}
      {submitted && showPopUp && <div>pop up here</div>}
      <div className="flex flex-col">
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={postData}>send</button>
      </div> */}

      <div className="h-[6%] ">
        <h1 className=" lg:text-3xl capitalize font-bold " >pally.</h1>
      </div>
      <div className="border bg-white relative p-2 lg:px-4 rounded-xl lg:justify-between justify-center items-center flex flex-col lg:flex-row w-full h-[94%] ">

        <div className="flex flex-col lg:justify-between lg:w-[70%] h-full z-20 ">
          <div>
            <div className=" p-1 " >
              <h2 className="text-3xl lg:text-9xl font-bold " >Tired of Starting Goals You Never Finish?</h2>
              <h3 className="text-xl lg:text-4xl opacity-80 " >We don't promise magic. But we do offer something powerful: accountability that actually works.</h3>
            </div>
            <div className=" p-1 lg:mt-10 mt-5  lg:text-lg mb-16 ">
              <h4>We understand the frustration of starting a new goal with excitement, only to see motivation fizzle out a few weeks later. Pally solves this by connecting you with an accountability partner who shares your journey, keeping you focused and motivated for the long haul.</h4>
              <p> <IoCheckmarkDone /> PALLLY connects you with a partner based on your goals, interests, and preferred communication style</p>
              <p className="my-1" > <IoCheckmarkDone /> Schedule daily or weekly check-ins, set friendly challenges, and send encouraging messages to keep each other motivated.</p>
              <p className="my-1" > <IoCheckmarkDone /> Monitor your progress toward your goals, stay focused, and celebrate milestones along the way.</p>
            </div>
          </div>

          <div className=" lg:mb-[10%] mt-12 flex flex-col lg:ml-[10%] ">
            <p>stop dreaming, start achieving. be notified when we go live. sign up now! </p>
            <div className="relative border w-full lg:w-[50%] bg-white overflow-hidden flex items-center rounded-full  ">
              <input className="p-2 lg:p-4 outline-none w-[80%] lg:w-[86%] " type="email" placeholder="email" name="" id="" />
              <button className="absolute px-3 lg:px-5 lg:py-3 py-1 my-1 rounded-full right-[10px] bg-black text-white " >send</button>
            </div>
          </div>
        </div>

        <div className=" h-full lg:top-0 lg:right-[10%] top-[20%] absolute flex justify-center items-center  " >
          <div className="h-[200px] lg:h-[700px]  lg:w-[700px] w-[200px] bg-red-600 rotate-12 " >

          </div>
        </div>

      </div>

    </main>
  );
}
