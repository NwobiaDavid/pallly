"use client"

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
// import { IoCheckmarkDone } from "react-icons/io5";

export default function Home() {
  const [email, setEmail] = useState("");
  const [count, setCount] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true); // Added state for email validation
  const [showPopUp, setShowPopUp] = useState(false); // State to control pop-up visibility

  useEffect(() => {
      // const countt = getCount()
  // console.log("THE COUNT IS => " + countt.then())
    let responseData;
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/count", {
          headers: {
            "Content-Type": "application/json",
          },
          cache: 'no-store'
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

  async function postData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (!isValidEmail) {
      alert("Please insert a valid email address");
      return;
    }

    let responseData;
    try {
      const response = await fetch("/api/subscribe", {
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
      setShowPopUp(true);
      setIsLoading(false);
    } catch (error) {
      console.log("error submitting email :(");
      console.log("Error: ", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (showPopUp) {
      const timeout = setTimeout(() => {
        setShowPopUp(false);
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      }, 3000);
  
      return () => clearTimeout(timeout);
    }
  }, [showPopUp]);


  function validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleEmailChange(event: { target: { value: any; }; }) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  }



  return (
    <>
      <main className="flex h-screen flex-col items-center justify-between lg:p-4 p-2 overflow-hidden relative  bg-black ">

        {/* hey there
      {count}
      {submitted && showPopUp && <div>pop up here</div>}
      <div className="flex flex-col">
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={postData}>send</button>
      </div> */}

        <div className="h-[6%]  ">
          <h1 className=" text-3xl capitalize font-bold text-white " >pallly..</h1>
        </div>
        <div className="border overflow-hidden bg-white relative p-2 lg:px-8 lg:py-3 rounded-xl lg:justify-between justify-center items-center flex flex-col lg:flex-row w-full h-[94%] ">

          <div className="flex flex-col xl:justify-between xl:w-[70%] h-full z-20 ">
            <div>
              <div className=" p-1 text-center lg:text-left " >
                <h2 className=" 3xl:text-9xl text-3xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text " >Tired of Starting Goals You Never Finish?</h2>
                <h3 className="text-lg w-[90%] xl:text-3xl opacity-60  " >We don't promise <span className="bg-gradient-to-tr from-purple-700 font-bold to-pink-600 text-transparent bg-clip-text ">magic</span>. But we do offer something powerful:<span className="font-bold"> accountability that actually works</span>.</h3>
              </div>
              <div className=" p-1 3xl:mt-24 lg:mt-10 mt-5  lg:text-lg lg:mb-16 ">
                <h4 className=" lg:tracking-wider hidden lg:flex 3xl:mb-32 lg:mb-16 lg:w-[70%] xl:w-[80%] 3xl:text-4xl " >We understand the frustration of starting a new goal with excitement, only to see motivation fizzle out a few weeks later. Pally solves this by connecting you with an accountability partner who shares your journey, keeping you focused and motivated for the long haul.</h4>
                <div className="lg:w-[80%]  ">
                  <p className="flex items-center 3xl:text-4xl "> <Image className="mr-2 3xl:w-[60px] " alt="check" src={"/props/check.svg"} width={20} height={20} />Pallly connects you with a partner based on your goals, interests, and preferred communication style</p>
                  <p className="my-3 flex  items-center 3xl:text-4xl  " > <Image className="mr-2 3xl:w-[60px] " alt="check" src={"/props/check.svg"} width={20} height={20} /> Schedule daily or weekly check-ins, set friendly challenges, and send encouraging messages to keep each other motivated.</p>
                  <p className=" flex items-center 3xl:text-4xl  " ><Image className="mr-2 3xl:w-[60px] " alt="check" src={"/props/check.svg"} width={20} height={20} /> Monitor your progress toward your goals, stay focused, and celebrate milestones along the way.</p>
                </div>
              </div>
            </div>

            <div className=" lg:mb-[10%]   mt-12 flex flex-col  ">
              <p className="ml-2 text-sm 3xl:text-2xl font-semibold " >Stop dreaming, start achieving. Be notified when we go live. Sign up now! </p>
              {/* <div > */}
              <form className="relative border w-full lg:w-[60%] 3xl:w-[80%] bg-white overflow-hidden flex items-center rounded-2xl  " onSubmit={(e) => postData(e)} >
                <input value={email} onChange={handleEmailChange} className="p-2 lg:p-4 3xl:p-10 3xl:text-2xl outline-none w-[80%] lg:w-[86%] " type="email" placeholder="example@example.com" name="" id="" />
                <button type="submit" className="absolute px-3 lg:px-6 lg:py-3 3xl:py-5 3xl:px-10 3xl:text-2xl py-1 my-1 3xl:rounded-3xl rounded-2xl right-[10px] bg-gradient-to-tr from-blue-600 to-purple-700 hover:from-black hover:to-black duration-300 text-white flex items-center   " >
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span>Send</span>
                      <Image className="ml-1 3xl:text-2xl " alt="check" src={"/props/send.png"} width={20} height={20} />
                    </>
                  )}
                </button>
              </form>
              <p className="font-semibold ml-2 text-xs lg:text-left 3xl:text-xl text-center " >({count} people signed up)</p>
              {/* </div> */}
            </div>
          </div>

          <div className=" h-full lg:top-0 opacity-50 lg:opacity-100 lg:right-[5%] -bottom-52 absolute flex justify-center items-center  " >
            <Image className=" 3xl:w-[1000px] lg:w-[500px] " alt="main image" src={"/props/phone.png"} width={700} height={700} />
          </div>

        </div>

        {showPopUp && <div className="h-screen w-screen absolute top-0 flex items-center justify-center" >
          <div className="h-screen w-screen opacity-30 bg-black absolute top-0"></div>

          <div className=" h-[50%] w-[90%] md:w-[50%] flex flex-col  z-[100] relative justify-center opacity-100 items-center bg-white border rounded-xl " >
            <div>
              <Image src={"/props/confetti.svg"} alt="confetti" width={100} height={100} />
            </div>

            <h1 className="font-semibold mt-7 " >Thanks for Joining the Pallly Party!</h1>

          </div>

        </div>}
      </main>


    </>
  );
}
