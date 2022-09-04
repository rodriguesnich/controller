import { Box } from '@mui/material';
import { Joystick, JoystickShape } from 'react-joystick-component';

function Joycom(Movement, StopMovement) {
    return (
        <Box sx={{ width: "20vw", height: "100%", display: "flex", alignItems: "start", justifyContent: "center", backgroundColor: "#cec9cc" }}>
            <Box sx={{ pt: 10 }}>
                <Joystick
                    baseShape={JoystickShape.Square}
                    size={100}
                    baseColor="#272929"
                    stickColor="#4f43ae"
                    throttle={200}
                    minDistance={100}
                    move={(e) => Movement(e.direction)}
                    stop={(e) => StopMovement(e)}
                />
            </Box>
        </Box>
    );
}

export default Joycom;