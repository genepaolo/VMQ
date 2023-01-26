import React, {Component, useState, useEffect} from "react";
import {PageState} from "../User/PageState";
import {socket} from '../../global/Global';

export default function Lobby(props){

    const [state, setState] = useState({
        ...props.state,
        lobby:{
            ...props.state.lobby,
            hostName: props.state.user.name,
            hostId: props.state.user.id,
            players: [ [props.state.user.id,props.state.user.name] ] // An array of pairings, [id, name]
        }
    });
    localStorage.setItem("sessionId", state.lobby.sessionId);

    function handleGameStart(event){
        // Send all the Lobby Information to server
        socket.emit("HOST_START", {lobby: state.lobby});
        //console.log(socket);
    }

    return(
        <div>
            <h2>Lobby: {state.lobby.sessionId}</h2>

            <br></br>
            <h4>Players</h4>
            <br></br>
            <button onClick={handleGameStart}>Start</button>
            {/* <button onClick={test}>Test</button> */}
        </div>
        );
    
}