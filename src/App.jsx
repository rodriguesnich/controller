import { Box, Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { Joystick, JoystickShape } from 'react-joystick-component';

import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [wsIpAddress, setwsIpAddress] = useState("192.168.79.249:8080");
  var socket

  if (socket) {
    socket.onmessage = function (event) {
      console.log(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.log('[close] Connection died');
      }
    };

    socket.onerror = function (error) {
      console.log(`[error] ${error.message}`);
    };
  }

  function handleMovement(direction) {
    socket.send(direction);
  }

  function handleStop(event) {
    console.log(event);
    socket.send("STOP");
  }

  function handleConnect() {
    socket = new WebSocket(`ws://${wsIpAddress}:8080/ws`);
    socket.onopen = function (e) {
      console.log("[open] Connection established");
    };
  }

  return (
    <div className='container'>
      <Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "space-evenly" }}>
        <Box sx={{ width: "20vw", height: "100%", display: "flex", alignItems: "start", justifyContent: "center", backgroundColor: "#cec9cc" }}>
          <Box sx={{ pt: 10 }}>
            <Joystick
              baseShape={JoystickShape.Square}
              size={100}
              baseColor="#272929"
              stickColor="#4f43ae"
              throttle={200}
              minDistance={100}
              move={(e) => handleMovement(e.direction)}
              stop={(e) => handleStop(e)}
            />
          </Box>
        </Box>
        <Box>
          <Box sx={{ width: "60vw", height: "85%", backgroundColor: "#272929" }}>
          </Box>
          <Box sx={{ display: "flex", height: "15%", alignItems: "center", justifyContent: "space-evenly", backgroundColor: "#cec9cc" }}>
            <ButtonGroup
              disableElevation
              variant="contained"
            >
              <Button color="secondary">Connect</Button>
            </ButtonGroup>
          </Box>
        </Box>
        <Box sx={{ width: "20vw", height: "100%", display: "flex", alignItems: "start", justifyContent: "center", backgroundColor: "#cec9cc" }}>
          <Box sx={{ pt: 10 }}>
            <Joystick
              baseShape={JoystickShape.Square}
              size={100}
              baseColor="#272929"
              stickColor="#4f43ae"
              throttle={200}
              minDistance={100}
              move={(e) => handleMovement(e.direction)}
              stop={(e) => handleStop(e)}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
