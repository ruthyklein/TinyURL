import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Grid } from '@material-ui/core';
import { Typography } from '@mui/material';

const TotalClicksChart = ({ links }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (links.length === 0) return;

        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const totalClicks = links.reduce((acc, link) => {
            return acc + (link.clicks ? link.clicks.length : 0);
        }, 0);

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total Clicks'],
                datasets: [{
                    label: 'Total Clicks',
                    data: [totalClicks],
                    backgroundColor: '#2196f3'
                }]
            },
            options: {
                indexAxis: 'y',
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
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
        <Grid container justifyContent="center" alignItems="center" style={{ height: '300px' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Total Clicks Chart</Typography>
            <Grid item xs={12}>
                <canvas ref={chartRef} id="totalClicksChart"></canvas>
            </Grid>
        </Grid>
    );
};

export default TotalClicksChart;
