import "./scrollingtext.scss";
import { useState } from "react";
const ScrollingText = () => {
  const [currentMessage, setCurrentMessage] = useState([]);
  const scrollMessage = (offset: number) => {
    setCurrentMessageIndex((prevIndex) =>
      (prevIndex + offset + messages.length) % messages.length
    );
  };
  useEffect(() => {
    const intervalId = setInterval(() => scrollMessage(1), 3000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div id="scrolling-text">
      <span>Défilement des messages{messages[currentMessageIndex]?.content}</span>
    </div>
  );
};
export default ScrollingText;
