import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box, Typography } from '@mui/material';

const DaysOfWeekChart = ({ links }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (links.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    const daysOfWeekData = Array(7).fill(0);

    links.forEach(link => {
      const { clicks } = link;
      if (clicks) {
        clicks.forEach(click => {
          const date = new Date(click.insertedAt);
          const dayOfWeek = date.getDay();
          daysOfWeekData[dayOfWeek]++;
        });
      }
    });

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
          label: 'Clicks',
          data: daysOfWeekData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [links]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h4" sx={{ mb: 2 }}>Days Of Week Chart</Typography>

    <canvas ref={chartRef} id="daysOfWeekChart"></canvas>
    </Box>
  );
};

export default DaysOfWeekChart;