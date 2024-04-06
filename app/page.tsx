"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchCount = async () => {

      let responseData;
      try {
        const res = await fetch("http://localhost:3000/api/count",{
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
        console.log("Error: ",error);
      }
    };



    fetchCount();
  }, [])


  async function postData(){
    if (email === "" ) {
      alert("Please insert email correctly");
      return;
    }

    let responseData;
    try {

      console.log("entered")
      console.log(email)

      const response = await fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email ,
        }),
      });

      responseData = await response.json();
      if (response.status !== 201) {
        throw new Error(responseData.message);
      }

      setSubmitted(true)
      setIsLoading(false);
      
    } catch (error) {
      console.log("error submitting email :(");
      console.log("Error: ",error);
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hey there
      {count}
      <div className="flex flex-col">
        <form >
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <button onClick={postData} >
          send
        </button>

        </form>
      </div>
    </main>
  );
}
