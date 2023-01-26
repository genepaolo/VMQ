import React, {Component, useState, useEffect} from "react";
import {socket} from '../../global/Global';

function Host(props){
    const [state, setState] = useState({
        ...props.state
    });

    function handleSubmit(event){
        event.preventDefault(); //Prevents reloading
        
        socket.emit("HOST_JOINED", {
            hostName: state.user.name,
            hostId: parseInt(state.user.id),
            isSolo: true
          });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
    
                Hello {state.user.name} : {state.user.id}
                <br></br>
                <button>Solo Host</button>
            </form>
        </div>
    )
    
    
}

export default Host;