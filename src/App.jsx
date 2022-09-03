import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Joystick, JoystickShape } from 'react-joystick-component';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [wsIpAddress, setwsIpAddress] = useState("192.168.0.102:8080");
  var socket

  if (socket) {
    socket.onmessage = function (event) {
      console.log(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
      }
    };

    socket.onerror = function (error) {
      console.log(`[error] ${error.message}`);
    };
  }

  function handleMovement(direction) {
    console.log(direction);
    socket.send(direction);
  }

  function handleStop(event) {
    console.log(event);
    socket.send("STOP");
  }

  function handleConnect() {
    socket = new WebSocket(`ws://${wsIpAddress}/ws`);
    socket.onopen = function (e) {
      console.log("[open] Connection established");
    };
  }

  return (
    <div className='container'>
      <NavBar UpDateIp={setwsIpAddress} Connect={handleConnect} />
      <Box>
        <Joystick
          size={100}
          baseColor="black"
          throttle={200}
          minDistance={100}
          baseShape={JoystickShape.Square}
          move={(e) => handleMovement(e.direction)}
          stop={(e) => handleStop(e)}
        ></Joystick>
      </Box>
    </div>
  );
}

export default App;
