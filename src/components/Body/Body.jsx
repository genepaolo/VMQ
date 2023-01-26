import React, {Component, useState, useEffect} from "react";
import {User} from "../User/User";
import {PageState} from "../User/PageState";

import Host from "./Host";
import Lobby from "./Lobby";
import Game from "./Game/Game";

import {socket} from '../../global/Global';

export default function Body(){
    const test = new User("Kyle", 1234);
    const [state,setState] = useState({
        user:{
            name: test.name,
            id: test.id,
        },
        pageState: PageState.Home,
        lobby:{
            sessionId: null
        }
        
    })

    useEffect(() =>{

        socket.on("start_lobby", (data)=>{
            let sessionId = data.sessionId;
            let isSolo = data.isSolo;
            console.log(data);
            setState({
                ...state,
                pageState: PageState.Lobby,
                lobby:{
                    ...state.lobby,
                    sessionId: sessionId,
                    isSolo: isSolo
                }
                
            })
        })

        socket.on("start_game", ()=>{
            setState({
                ...state,
                pageState: PageState.Game
            })
        })

        socket.on("reconnect", (n)=>{
            console.log("Reconnected to server, attempt number: ", n);
        })

        return () => {
            // We turn off these socket so we cant start multiple times
            // Component reloading might cause to fire twice
           
            if(state.pageState==PageState.Lobby){
                socket.off("start_lobby");
            }else if(state.pageState==PageState.Game){
                socket.off("start_game");
            }
            
        }

    },[state]);

    function displayPage(ps){
        switch(ps){
            case PageState.Home:
                return ( <Host state={state}></Host>)
            case PageState.Lobby:
                return ( <Lobby state={state}></Lobby>);
            case PageState.Game:
                return (<Game></Game>);
            default:
                return ( <Host state={state}></Host>)
        }
    }


    return(
        <div>
            {displayPage(state.pageState)}
        </div>
    );
    
    
}