"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts with SSR disabled
const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const LineChart = ({ series, categories }) => {
  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: categories, // Use passed categories
      tickAmount: 10,
      labels: {
        formatter: function(value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), 'dd MMM');
        }
      }
    },
    title: {
      text: 'Forecast',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    }
  };

  return (
    <div className='mb-10' id="chart">
      <ApexCharts
        options={options}
        series={series} // Use passed series
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;


