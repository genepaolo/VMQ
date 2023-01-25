import { Component } from 'react';
import io from 'socket.io-client';

let socket;

class Global extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:5000',
    }
    
    socket = io(this.state.endpoint, {
      maxHttpBufferSize: 1e8,    // 100 MB
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity
    });

  }

  render() {
    return null
  }
}

export {Global, socket};