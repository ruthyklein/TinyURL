import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Grid,Typography } from '@mui/material';

const SourcesChart = ({ links }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (links.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const sourcesData = links.reduce((acc, link) => {
      const { clicks } = link;
      if (clicks) {
        clicks.forEach(click => {
          const source = click.ipAddress;
          if (!acc[source]) {
            acc[source] = 0;
          }
          acc[source]++;
        });
      }
      return acc;
    }, {});

    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(sourcesData),
        datasets: [{
          data: Object.values(sourcesData),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0']
        }]
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [links]);

  return (
    <Grid container justifyContent="center" alignItems="center" >
    <Typography variant="h4" sx={{ mb: 2 }}>Sources Chart</Typography>
    <Grid item xs={12}>
    <canvas ref={chartRef} id="sourcesChart"></canvas>
    </Grid>
</Grid>
  );
};

export default SourcesChart;