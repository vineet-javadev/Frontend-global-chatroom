"use client";
// Import necessary components
import Image from "next/image";
import { useState, useEffect } from "react";
import ChatService from "@/Service/serviceFile";

// Define the Home component
export default function Home() {
  // Define state variables
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [welcomeTost, setWelcomeTost] = useState(false);

  // Define the useEffect hook
  useEffect(() => {
    //testing Purpose
    // setMessages([
    //   { sender: "vineet", message: "1" },
    //   { sender: "vineet", message: "2" },
    //   { sender: "vineet", message: "3" },
    //   { sender: "vineet", message: "4" },
    //   { sender: "vineet", message: "5" },
    //   { sender: "vineet", message: "6" },
    //   { sender: "vineet", message: "7" },
    //   { sender: "vineet", message: "8" },
    //   { sender: "vineet", message: "9" },
    //   { sender: "vineet", message: "10" },
    //   { sender: "vineet", message: "11" },
    //   { sender: "vineet", message: "1" },
    //   { sender: "vineet", message: "2" },
    //   { sender: "vineet", message: "3" },
    //   { sender: "vineet", message: "4" },
    //   { sender: "vineet", message: "5" },
    //   { sender: "vineet", message: "6" },
    //   { sender: "vineet", message: "7" },
    //   { sender: "vineet", message: "8" },
    //   { sender: "vineet", message: "9" },
    //   { sender: "vineet", message: "10" },
    //   { sender: "vineet", message: "11" },
    // ]);

    // Establish the WebSocket connection
    ChatService.connect(onConnected, onError);

    // Check if the user is already LogIn
    if (localStorage.getItem("user")) {
      setUserName(localStorage.getItem("user"));
      setIsConnected(true);
      setWelcomeTost(true);
      setTimeout(() => {
        setWelcomeTost(false);
      }, 2000);
    }
  }, []);

  // Define the onConnected function
  const onConnected = () => {
    console.log("Connected to WebSocket!");
    // Subscribe to topic messages
    ChatService.subscribe("/topic/subscribers", onMessageReceived);
  };

  // Define the onError function
  const onError = (err) => {
    console.error("Error:", err);
    alert("Error");
  };

  // Define the onMessageReceived function
  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    console.log(message);
    // setMessages((prevMessages) => [...prevMessages, message]);
    // it help to stop single message to multiple messages issue
    setMessages((prevMessages) => prevMessages.concat(message));
  };

  // Define the sendMessage function
  const sendMessage = (message) => {
    // Use ChatService to send the message
    ChatService.sendMessage("/app/message", message);
  };

  // Render the JSX
  return (
    <>
      {/* tost */}
      {welcomeTost && (
        <div className="flex justify-center fixed top-1 w-screen transition-all duration-200 ease-in-out">
          <div
            id="toast-default"
            className="flex  items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                />
              </svg>
              <span className="sr-only">Fire icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">
              Welcome to the Global ChatRoom.
            </div>
          </div>
        </div>
      )}

      {/* main body */}
      <div className="w-screen h-screen">
        {/* Background image */}
        <div className="w-screen h-screen bg-transparent fixed top-0 z-[-2]">
          <Image
            src={"https://wallpapercave.com/wp/wp8822231.jpg"}
            width={1500}
            height={1000}
            className="w-screen h-screen object-cover bg-no-repeat"
            alt="Background Image"
          />
        </div>
        {/* background text */}
        <div
          className={` your-div-class ${
            isConnected ? "scale-95" : "scale-11-"
          } cursor-default select-none font-bold fixed flex gap-5 justify-center lg:items-center top-[-40px] lg:top-0 h-screen w-screen font-mono text-black text-8xl`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="120"
            height="120"
            color="Black"
            fill="none"
          >
            <path
              d="M19.7423 17.4915L20.5917 17.9414C21.1874 18.257 21.4853 18.4148 21.762 18.2331C22.0386 18.0513 22.0173 17.7661 21.9747 17.1958C21.7298 13.9197 17.6728 11.6731 14.8672 13.8841M15.2558 17.4915L14.4065 17.0416C13.8112 16.7262 13.5135 16.5685 13.2365 16.7515C12.9595 16.9345 12.9822 17.2187 13.0275 17.7872C13.2864 21.0359 17.3202 23.3133 20.0565 21.1514"
              stroke="currentColor"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.0107 22C5.95135 21.497 2 17.2229 2 12.0247C2 6.48823 6.48245 2 12.0118 2C17.308 2 21.6437 6.11759 22 11.33"
              stroke="currentColor"
              strokeWidth="2.0"
              strokeLinecap="round"
            />
            <path
              d="M20 5.69899C19.0653 5.76636 17.8681 6.12824 17.0379 7.20277C15.5385 9.14361 14.039 9.30556 13.0394 8.65861C11.5399 7.6882 12.8 6.11636 11.0401 5.26215C9.89313 4.70542 9.73321 3.19045 10.3716 2"
              stroke="currentColor"
              strokeWidth="2.0"
              strokeLinejoin="round"
            />
            <path
              d="M2 11C2.7625 11.6621 3.83046 12.2682 5.08874 12.2682C7.68843 12.2682 8.20837 12.7649 8.20837 14.7518C8.20837 16.7387 8.20837 16.7387 8.72831 18.2288C9.06651 19.1981 9.18472 20.1674 8.5106 21"
              stroke="currentColor"
              strokeWidth="2.0"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-nowrap">Global ChatRoom</span>
        </div>
        {/* user name panel */}
        <div
          className={`fixed right-0 bg-black rounded-bl-xl z-30 ${
            isConnected ? "text-[#46d002]" : "text-red-600"
          }  font-bold py-1 px-5 flex justify-center items-center gap-2 cursor-default select-none`}
        >
          {isConnected ? userName : "Offline"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="10"
            height="10"
            color={isConnected ? "#46d002" : "red"}
            fill={isConnected ? "#46d002" : "red"}
            tooltip="Online"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* leave room panel for mobile device */}
        <div
          className={`md:hidden fixed left-0 bg-black rounded-br-xl z-30 ${
            isConnected ? "text-red-600" : "hidden"
          }  font-bold py-1 px-5 flex justify-center items-center gap-2 cursor-default select-none`}
        >
          <button
                    type="submit"
                    onClick={() => {
                      setIsConnected(false);
                      console.log("LogOut");
                      const obj = {
                        message: "Left the ChatRoom",
                        sender: userName,
                      };
                      sendMessage(obj);
                      ChatService.unsubscribe();
                      setMessages([]);
                      localStorage.removeItem("user");
                    }}
                  >
                    Leave Room
                  </button>
        </div>
        {/* main container */}
        <div className="h-screen lg:px-5 lg:py-16 w-screen flex justify-center items-center">
          <div className="w-full h-full lg:h-[80vh] lg:w-10/12 flex flex-col justify-end backdrop-blur-sm rounded-2xl shadow-2xl shadow-black">
            {/* background text */}
            {/* <div
              className={`${
                isConnected ? "scale-95 hidden" : ""
              } cursor-default select-none font-bold fixed flex-col md:flex-row flex gap-5 justify-center items-center top-0 h-full w-full font-mono lg:text-black text-6xl md:text-5xl lg:text-8xl`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="120"
                height="120"
                color="Black"
                fill="none"
              >
                <path
                  d="M19.7423 17.4915L20.5917 17.9414C21.1874 18.257 21.4853 18.4148 21.762 18.2331C22.0386 18.0513 22.0173 17.7661 21.9747 17.1958C21.7298 13.9197 17.6728 11.6731 14.8672 13.8841M15.2558 17.4915L14.4065 17.0416C13.8112 16.7262 13.5135 16.5685 13.2365 16.7515C12.9595 16.9345 12.9822 17.2187 13.0275 17.7872C13.2864 21.0359 17.3202 23.3133 20.0565 21.1514"
                  stroke="currentColor"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.0107 22C5.95135 21.497 2 17.2229 2 12.0247C2 6.48823 6.48245 2 12.0118 2C17.308 2 21.6437 6.11759 22 11.33"
                  stroke="currentColor"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                />
                <path
                  d="M20 5.69899C19.0653 5.76636 17.8681 6.12824 17.0379 7.20277C15.5385 9.14361 14.039 9.30556 13.0394 8.65861C11.5399 7.6882 12.8 6.11636 11.0401 5.26215C9.89313 4.70542 9.73321 3.19045 10.3716 2"
                  stroke="currentColor"
                  strokeWidth="2.0"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 11C2.7625 11.6621 3.83046 12.2682 5.08874 12.2682C7.68843 12.2682 8.20837 12.7649 8.20837 14.7518C8.20837 16.7387 8.20837 16.7387 8.72831 18.2288C9.06651 19.1981 9.18472 20.1674 8.5106 21"
                  stroke="currentColor"
                  strokeWidth="2.0"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Global</span>
              <span>ChatRoom</span>
            </div> */}
            {/* chat container */}
            <div
              className={`${
                isConnected ? "" : "hidden"
              } w-full h-[85%] px-10 overflow-y-auto flex pt-10 flex-col-reverse rounded-t-2xl`}
            >
              {messages
                .slice()
                .reverse()
                .map((item, index) => {
                  return (
                    <div key={index} className="m-[2px] p-1">
                      {" "}
                      <div
                        className={`${
                          item.message == "Left the ChatRoom" ||
                          item.message == "Joined the ChatRoom"
                            ? "bg-gray-500 text-sm py-1 px-5  rounded-t-full rounded-b-full ml-4 inline-block"
                            : item.sender == userName
                            ? "bg-yellow-800"
                            : " bg-orange-500"
                        }  text-lg px-5 py-1 rounded-t-md rounded-r-md inline-block`}
                      >
                        <b>
                          {item.sender == userName ? "You" : item.sender} :{" "}
                        </b>
                        {item.message}
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* input area */}
            <div className="z-20 w-full h-[80px] md:h-[15%] flex gap-1 md:gap-5 items-center justify-center px-5 lg:px-10 bg-yellow-400 rounded-b-2xl">
              {isConnected ? (
                <>
                  <input
                    placeholder="Message Here...."
                    id="InputMessage"
                    autoFocus
                    className="w-full h-[45px] md:h-[50px] lg:h-[55px] bg-yellow-200 border-yellow-600 border-[1px] text-black px-5 py-3 rounded-2xl"
                  />
                  <button
                    type="submit"
                    className="h-[45px] md:h-[50px] lg:h-[55px] px-3 flex justify-center items-center  md:px-10  bg-yellow-200 border-yellow-600 border-[1px] text-black rounded-full font-bold"
                    onClick={() => {
                      setIsConnected(true);
                      console.log("Message Send");
                      const obj = {
                        message: document
                          .getElementById("InputMessage")
                          .value.trim(),
                        sender: userName,
                      };
                      sendMessage(obj);
                      document.getElementById("InputMessage").value = "";
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      color="black"
                      fill="gray"
                    >
                      <path
                        d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M11.5 12.5L15 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className="hidden lg:flex h-[45px] md:h-[50px] lg:h-[55px] p-4 md:px-10  bg-yellow-200 border-yellow-600 border-[1px] text-black rounded-full font-bold"
                    onClick={() => {
                      setIsConnected(false);
                      console.log("LogOut");
                      const obj = {
                        message: "Left the ChatRoom",
                        sender: userName,
                      };
                      sendMessage(obj);
                      ChatService.unsubscribe();
                      setMessages([]);
                      localStorage.removeItem("user");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      color="#000000"
                      fill="gray"
                    >
                      <path
                        d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <input
                    placeholder="Enter your name Here...."
                    id="InputUserName"
                    autoFocus
                    className="w-full lg:w-[70%] h-[45px] md:h-[50px] lg:h-[55px] bg-yellow-200 border-yellow-600 border-[1px] text-black px-5 py-3 rounded-2xl"
                  />
                  <button
                    type="submit"
                    className="h-[45px] md:h-[50px] lg:h-[55px]  px-3 lg:px-10 text-sm lg:text-base bg-yellow-200 border-yellow-600 border-[1px] text-black rounded-full font-bold"
                    onClick={() => {
                      let name = document
                        .getElementById("InputUserName")
                        .value.trim();
                      name = name.charAt(0).toUpperCase() + name.slice(1);
                      if (name != "") {
                        setIsConnected(true);
                        console.log("Message Send");
                        setUserName(name);
                        ChatService.subscribe(
                          "/topic/subscribers",
                          onMessageReceived
                        );
                        const obj = {
                          message: "Joined the ChatRoom",
                          sender: name,
                        };
                        sendMessage(obj);
                        document.getElementById("InputUserName").value = "";
                        localStorage.setItem("user", name);
                        setWelcomeTost(true);
                        setTimeout(() => {
                          setWelcomeTost(false);
                        }, 2000);
                      } else {
                        alert("User Name is required*");
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M7.02331 5.5C4.59826 7.11238 3 9.86954 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 9.86954 19.4017 7.11238 16.9767 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 2V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
