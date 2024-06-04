import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box, Button, Typography } from '@mui/material';
import LinkDetailsModal from '../linkDetailsModal/LinkDetailsModal';

const UrlClicksChart = ({ data, onLinkClick }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (data) {
      const ctx = chartRef.current;

      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const labels = data.map((url) => url.originalUrl);
        const clicks = data.map((url) => url.clicks.length);

        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Clicks per URL',
              data: clicks,
              backgroundColor: 'rgba(0, 191, 255, 0.8)',
              borderColor: 'rgba(255, 20, 147, 0.8)',
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
      }
    }
  }, [data]);

  return (
    <Box className='urlClicksChart' sx={{ p: 3 }} >
      <Typography variant="h5" sx={{ mb: 2 }}>URL Clicks Chart</Typography>

      <canvas id="urlClicksChart" ref={chartRef} sx={{ width: '100%', height: 'auto' }}></canvas>

      <Box className="url-list" sx={{ mt: 2 }}>
        {data.map((url) => (
          <Box key={url.id} className="url-item" id={`url-${url.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
            <Typography>{url.originalUrl}</Typography>
            <LinkDetailsModal link={url} />
          </Box>
        ))}
      </Box>
    </Box>

  );
};

export default UrlClicksChart;
