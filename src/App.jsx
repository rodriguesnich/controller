import { Box, ButtonGroup, IconButton, } from '@mui/material';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import './App.css';
import Joycom from './components/Joycom';

function App() {
  var ipAddress = window.prompt("Please insert the robot IP Address")

  var socket = new WebSocket(`ws://${ipAddress}:8080/ws`)

  if (socket) {
    socket.onopen = function (e) {
      console.log("[open] Connection established");
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
    console.log(direction);
    socket.send(direction);
  }

  function handleStop(event) {
    console.log("STOP");
    socket.send("STOP");
  }

  return (
    <div className='container'>
      <Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "space-evenly" }}>
        <Joycom Movement={handleMovement} StopMovement={handleStop} />
        <Box>
          <Box sx={{ width: "60vw", height: "85%", backgroundColor: "#272929" }}>
          </Box>
          <Box sx={{ display: "flex", height: "15%", alignItems: "center", justifyContent: "space-evenly", backgroundColor: "#cec9cc" }}>
            <ButtonGroup
              disableElevation
            >
              <IconButton>
                <SignalWifi4BarIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        </Box>
        <Joycom Movement={handleMovement} StopMovement={handleStop} />
      </Box>
    </div>
  );
}

export default App;
