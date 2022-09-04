import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConnectionDialog({ Open, SetOpen, Connect, UpDateIp }) {

    const handleClose = () => {
        SetOpen(false);
        Connect()
    };

    return (
        <div>
            <Dialog open={Open} onClose={handleClose}>
                <DialogTitle>Connection Management Tab</DialogTitle>
                <DialogContent>
                    <form autoComplete="off">
                        <TextField
                            onChange={(e)=>{UpDateIp(e.target.value)}}
                            autoFocus
                            margin="dense"
                            label="Robot Ip Address"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Connect</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
