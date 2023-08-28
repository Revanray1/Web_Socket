import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("https://socket-65xl.onrender.com");


function App() {
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState([]);
  const [socketID, setSocketID] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleMessage = () => {
    const data = message;
    data.push(inputText);
    setMessage(data);
    setInputText("");
    
    socket.emit("sendMessage",{message:inputText})
    
  };



  useEffect(() => {
    socket.on("connect", () => {
      console.log(`you are connected witha Socket Id :-  ${socket.id}  `);
      setSocketID(socket.id)
    });

    // socket.on("sendReply",(replyMessage)=>
    // {
    //   // alert(replyMessage.reply)
    //   // const data = message;
    //   // data.push(replyMessage.reply);
    //   setMessage(prev => [prev,replyMessage.reply]);
    // })
    
  socket.on("sendReply", (replyMessage) => {
    setMessage(prevMessages => [...prevMessages, replyMessage.reply]);
  });


  return () => {
    console.log("Cleaning up socket listeners...");
    socket.off("connect");
    socket.off("sendReply");
  };

  }, []);
  


  return (
    <>
     {  <h1>{`you are connected witha Socket Id :-  ${socketID}  `} </h1>}
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text"
        />
        <br></br>
        <br></br>
        <button onClick={() => handleMessage()}>Send</button>

        {message.map((data) => (
          <p>{data}</p>
        ))}
      </div>
    </>
  );
}

export default App;
