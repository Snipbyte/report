"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts with SSR disabled
const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const CircleChart = () => {
  const options = {
    series: [81, 18],
    chart: {
      type: 'donut',
      width: 400,
      height: 200,
    },
    colors: ['#172554', '#3b82f6'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
            height: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const series = [81, 18]; // Data for the chart

  return (
    <div className='w-full'>
      <ApexCharts
        options={options}
        series={series}
        type="donut"
        height={200}
      />
    </div>
  );
};

export default CircleChart;
