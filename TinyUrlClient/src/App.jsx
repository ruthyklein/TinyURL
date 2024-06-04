// App.jsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import DaysOfWeekChart from './component/daysOfWeekChart/DaysOfWeekChart';
import SourcesChart from './component/sourcesChart/SourcesChart';
import TotalClicksChart from './component/totalClicksChart/TotalClicksChart';
import UrlClicksChart from './component/urlClicksChart/UrlClicksChart';
import './App.css';

const App = () => {
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/links')
      .then(response => response.json())
      .then(data => setLinks(data))
      .catch(error => console.error('Error fetching links data:', error));
  }, []);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        TinyUrl Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <TotalClicksChart links={links} onLinkClick={handleLinkClick} />
          </Paper>
        </Grid>
       
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <DaysOfWeekChart links={links} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <SourcesChart links={links} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <div> {console.log(selectedLink)}</div>
            <UrlClicksChart data={links} onLinkClick={handleLinkClick} />
          </Paper>
        </Grid>
      </Grid>

    </Container>
  );
};

export default App;
