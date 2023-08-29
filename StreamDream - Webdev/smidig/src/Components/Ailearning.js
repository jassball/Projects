import React, { useState, useEffect, useRef } from "react";
import "../Assets/Styles/Ailearning.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';



const Ailearning = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [isWaitingResponse, setWaitingResponse] = useState(false); // New state
  const messagesEndRef = useRef(null);

  const handleButtonClick = (info) => {
    getMessages(info);
  };

  const getMessages = async (message) => {
    addMessageToChat(message, "You");
    setValue("");

    // Ruleset for AI
    const ruleset = "Follow these rules: \n" +
      "You're AI implemented in a streaming graphics website called 'StreamDream'. \n" +
      "In the website you have the following tools: Home, My Packages and Store. \n" +
      "- In the home page you have a choose-scene-navbar, package window, package components window, edit elements window and a scene window. \n" +
      "In the choose-scene-navbar, you can view scenes you have customized, or add / deletes scenes you have made. \n" +
      "In the package window, all your packages from My Packages will show. You can then click one of your packages to open it in the package components window. \n" +
      "In you package components window you have all the components inside the chosen pack. You can add all of them or just the ones you want to the scene window. \n" +
      "In the edit elements window you can customize each component. Change colors, positions and so on.  \n" +
      "The scene window is your preview stream. You can also drag around and select components you want to edit in edit elements. You can also \n" +
      "CTRL+scroll to zoom in and out. You can hold SHIFT to select multiple components at once. \n" +
      "- When you are ready to go live, you can use your streaming software to add the window capture of the scene window as a source in your streaming setup\n" +
      "- In My Packages you can browse all the packages you own. You can filter the packages by Overlays, Sounds or Effects.\n" +
      "- In the store page you can browse and buy stream packages. These can be everything from stream overlays, sounds and effects you can put on your stream.\n" +
      "In the sidebar you have the following filters: Discover (Packages with good rating), Overlays, Sounds, Effects, and items that are free.\n" +
      "You also have a search bar which you can search for packages with.\n" +
      "To see more information about a package, click on the package.\n" +
      "- You are going to use this information to give the user the best answer you can.\n" +
      "- If the user asks you something that doesnt correlate to the above information your answer should be: 'I'm sorry, but I'm only able to provide information and assistance related to the StreamDream website. Please feel free to ask me anything about the Home, My Packages, or Store pages, or click on of the premade options in the sidebar!'\n" +
      "This is the user's question:\n";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: ruleset + message }),
    };

    setValue("");
    setWaitingResponse(true); // Start waiting

    try {
      const response = await fetch("http://localhost:5233/api/completions", requestOptions);
      const data = await response.json();
      console.log(data);
      setMessage(data.choices[0].message);
      setWaitingResponse(false); // Stop waiting
    } catch (error) {
      console.error(error);
      setWaitingResponse(false); // Stop waiting
    }
  };

  // Adds the message 
  const addMessageToChat = (messageContent, role) => {
    setPreviousChats((prevChats) => [
      ...prevChats,
      { role: role, content: messageContent },
    ]);
  }

  // Scrolls to the bottom when a new text appears
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Adds the AI response 
  useEffect(() => {
    if (message) {
      addMessageToChat(message.content, "AI");
    }
  }, [message]);

  useEffect(() => {
    scrollToBottom();
  }, [previousChats]);

  // TypingIndicator is its own component that adds a "loading" tag in the AI's response when we wait for it to get its response. 
  const TypingIndicator = () => {
    const [dots, setDots] = useState('.');

    useEffect(() => {
      const intervalId = setInterval(() => {
        setDots(dots => dots.length < 4 ? dots + '.' : '.');
      }, 250);

      return () => clearInterval(intervalId);
    }, []);

    return (
      <li className="chat-box">
        <p className="role">AI</p>
        <p>{dots}</p>
      </li>
    );

  };
  return (
    <div className="sidebar-fix">
      <section className="sidebar">
        <div className='sidebar-item-title'>
          Information
        </div>
        <div className='sidebar-item' onClick={() => handleButtonClick("Tell me more about Home")}>
          <div class="icon-container">
            <FontAwesomeIcon icon={faMessage} />
          </div>
          Home
        </div>
        <div className='sidebar-item' onClick={() => handleButtonClick("Tell me more about Store")}>
          <div class="icon-container">
            <FontAwesomeIcon icon={faMessage} />
          </div>
          Store
        </div>
        <div className='sidebar-item' onClick={() => handleButtonClick("Tell me more about My Packages")}>
          <div class="icon-container">
            <FontAwesomeIcon icon={faMessage} />
          </div>
          My Packages
        </div>

        <div className='sidebar-item' onClick={() => handleButtonClick("Tell me more about exporting my scenes to my streaming software")}>
          <div class="icon-container">
            <FontAwesomeIcon icon={faMessage} />
          </div>
          Exporting Scenes
        </div>
      </section>
      <div className="sidebar-filler"></div>
      <section className="main">
        <div className="title center">AI Assistant</div>
        <ul className="feed">
          {previousChats?.map((chatMessage, index) => (
            <li className="chat-box" key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
          {isWaitingResponse && <TypingIndicator />}
          {previousChats.length === 0 ?
            <div class="ai-assistant-hints-container">
              <div class="ai-assistant-hints">
                <p>Welcome to the AI Assistant! I'm here to help you navigate and make the most of your experience on the streaming graphics website. You can interact with me in two ways:</p>
                <ol>
                  <li className="margin-bottom">
                    <strong>Manual Input:</strong> Simply type your questions or concerns in the input box below, and I'll provide you with relevant information and assistance.
                  </li>
                  <li className="margin-bottom">
                    <strong>Automatic Questions:</strong> On the left side, you'll find a list of common questions that other users often ask. Click on any question to receive an answer related to that topic.
                  </li>
                </ol>
                <p>Remember, if you have any specific queries or need help regarding the Home, Store, My Packages, or exporting scenes to your streaming software, feel free to ask me directly. I'm here to assist you!</p>
              </div>
            </div>
            : ''
          }
          <div ref={messagesEndRef} />
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  getMessages(value);
                  setValue('');
                }
              }} />
            <div id="submit" onClick={() => { getMessages(value); setValue('') }}>
              ➢
            </div>
          </div>
          <p className="info">
            StreamDream AI Assistant Version 1.0.0 --- 12/06/2023
          </p>
        </div>
      </section>
    </div>
  );
}

export default Ailearning;