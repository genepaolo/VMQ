import {useEffect, useState} from "react";
import Body from "./components/Body/Body";
import {Global, socket} from "./global/Global";

function App() {
  const [disc, setDisc] = useState(false);
  useEffect(() => {

    // if(disc){
    //   // The socket was connected but it wasnt emitting properly when you attempt to reload but don't. so actually need to unplug/replug
    //   // socket.disconnect();
    //   // socket.connect();
    //   //socket.emit("RECONNECT", {sessionId: localStorage.getItem("sessionId")});
    //   console.log(localStorage.getItem("sessionId"));
    //   setDisc(false);
    // }

    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";

      socket.disconnect();
      socket.connect();
      //setDisc(true);
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => {
      
      window.removeEventListener("beforeunload", unloadCallback);
      
    }
  }, [disc]);

  return (
    <div className="App">
      {/* Creates the user connection to socket immediately */}
      <Global></Global> 
      <Body> </Body>
    </div>
  );
}

export default App;
