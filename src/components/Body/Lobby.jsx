import React, {Component, useState, useEffect} from "react";
import {PageState} from "../User/PageState";
import {socket} from '../../global/Global';

export default function Lobby(props){

    const [state, setState] = useState({
        ...props.state,
        lobby: {
            ...props.state.lobby,
            hostName: props.state.user.name,
            hostId: props.state.user.id,
            players: [ [props.state.user.id,props.state.user.name] ], // An array of pairings, [id, name]
            questionNumbers: 5, // Default 5, will be changed
            guessTime: 10 // Default, will be changed
        }
    });

    useState(()=>{
    },[state]);

    
    localStorage.setItem("sessionId", state.lobby.sessionId);

    function handleGameStart(event){
        // Send all the Lobby Information to server
        socket.emit("HOST_START", {lobby: state.lobby});
        //console.log(socket);
    }

    // function handleFormNumberBar(param, n){ // Don't worry abou this
    function handleFormQuestionNumbers(n){
        setState({
            ...state,
            lobby: {
                ...state.lobby,
                questionNumbers: n
            }
        });
        
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <div>
            <h2>Lobby: {state.lobby.sessionId}</h2>

            <br></br>
            <h4>Players</h4>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Number of Songs</label>
                    <input type="range" min={1} max={20} value={state.lobby.questionNumbers} onChange={(e) =>{handleFormQuestionNumbers(Number.parseInt(e.target.value))}} className="slider" id="myRange"></input>
                    <input type="number" value={state.lobby.questionNumbers} onChange={(e) =>{handleFormQuestionNumbers(e.target.value)}} ></input>
                </div>
                <div>
                    {/* 
                        Kyle: To Do
                        Desc: Implement slider/number inputs for guessTime
                    */}
                </div>
                <button onClick={handleGameStart}>Start</button>
            </form>
            {/* <button onClick={test}>Test</button> */}
        </div>
        );
    
}