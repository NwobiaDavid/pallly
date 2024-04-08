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
    <main className="flex h-screen flex-col items-center justify-between lg:p-4 p-2  bg-black ">

      {/* hey there
      {count}
      {submitted && showPopUp && <div>pop up here</div>}
      <div className="flex flex-col">
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={postData}>send</button>
      </div> */}

      <div className="h-[6%] ">
        <h1 className=" lg:text-3xl capitalize font-bold text-white " >pallly..</h1>
      </div>
      <div className="border bg-white relative p-2 lg:px-8 lg:py-3 rounded-xl lg:justify-between justify-center items-center flex flex-col lg:flex-row w-full h-[94%] ">

        <div className="flex flex-col lg:justify-between lg:w-[70%] h-full z-20 ">
          <div>
            <div className=" p-1  " >
              <h2 className="text-3xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text " >Tired of Starting Goals You Never Finish?</h2>
              <h3 className="text-xl w-[90%] lg:text-3xl opacity-60  " >We don't promise <span className="bg-gradient-to-tr from-purple-700 font-bold to-pink-600 text-transparent bg-clip-text ">magic</span>. But we do offer something powerful:<span className="font-bold"> accountability that actually works</span>.</h3>
            </div>
            <div className=" p-1 lg:mt-10 mt-5  lg:text-lg mb-16 ">
              <h4 className=" tracking-wider mb-16 w-[70%] " >We understand the frustration of starting a new goal with excitement, only to see motivation fizzle out a few weeks later. Pally solves this by connecting you with an accountability partner who shares your journey, keeping you focused and motivated for the long haul.</h4>
              <div className="w-[80%]  ">
                <p className="flex items-center"> <Image className="mr-2" alt="check" src={"/props/check.svg"} width={20} height={20} />Pallly connects you with a partner based on your goals, interests, and preferred communication style</p>
                <p className="my-3 flex  items-center " > <Image className="mr-2" alt="check" src={"/props/check.svg"} width={20} height={20} /> Schedule daily or weekly check-ins, set friendly challenges, and send encouraging messages to keep each other motivated.</p>
                <p className=" flex items-center" ><Image className="mr-2" alt="check" src={"/props/check.svg"} width={20} height={20} /> Monitor your progress toward your goals, stay focused, and celebrate milestones along the way.</p>
              </div>
            </div>
          </div>

          <div className=" lg:mb-[10%] mt-12 flex flex-col  ">
            <p className="ml-2 text-sm font-semibold " >Stop dreaming, start achieving. Be notified when we go live. Sign up now! </p>
            {/* <div > */}
            <form className="relative border w-full lg:w-[60%] bg-white overflow-hidden flex items-center rounded-2xl  " onClick={postData} >
              <input value={email} onChange={handleEmailChange} className="p-2 lg:p-4 outline-none w-[80%] lg:w-[86%] " type="email" placeholder="example@example.com" name="" id="" />
              <button type="submit" className="absolute px-3 lg:px-6 lg:py-3 py-1 my-1 rounded-2xl right-[10px] bg-gradient-to-tr from-blue-600 to-purple-700 hover:bg-black duration-200 text-white flex items-center   " >send <Image className=" ml-1" alt="check" src={"/props/send.png"} width={20} height={20} /> </button>
            </form>
            <p className="font-semibold ml-2 " >({count} people signed up)</p>
            {/* </div> */}
          </div>
        </div>

        <div className=" h-full lg:top-0 lg:right-[5%] top-[20%] absolute flex justify-center items-center  " >
          <Image className="  " alt="main image" src={"/props/phone.png"} width={700} height={700} />
        </div>

      </div>

    </main>
  );
}
