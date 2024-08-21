import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const CircleChart = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            var options = {
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

            var chart = new ApexCharts(document.querySelector('#donut-chart'), options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, []);

    return <div className='w-full' id='donut-chart'></div>;
};

export default CircleChart;
