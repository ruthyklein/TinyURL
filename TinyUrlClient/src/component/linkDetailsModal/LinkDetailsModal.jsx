import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, List, ListItem, ListItemText } from '@mui/material';
import { format } from 'date-fns';

const LinkDetailsModal = ({ link }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>Details</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Details for {link && link.originalUrl}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">Total Clicks: {link.clicks.length}</Typography>
          <Typography variant="body1">Target Parameter Name: {link.targetParamName}</Typography>
          <Typography variant="body1">Target Values:</Typography>
          <List>
            {link.targetValues.map((value, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${value.name}: ${value.value}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1">Clicks:</Typography>
          <List>
            {link.clicks.map((click, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${format(new Date(click.insertedAt), 'yyyy-MM-dd HH:mm:ss')} - ${click.ipAddress} `} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LinkDetailsModal;
