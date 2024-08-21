"use client";
import React from 'react';
import ApexCharts from 'react-apexcharts';
import { FaPlus } from 'react-icons/fa';

const SummaryChart = () => {
    const options = {
        series: [{
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        title: {
            text: 'Monthly Inflation in Argentina, 2002',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };

    const series = [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }];

    return (
        <div className='border w-full h-full bg-white shadow-2xl my-8'>
            <p className='lg:text-2xl text-xl text-center bg-desColor p-2 font-bold text-btnColor '>Summary of your investment over 10 years</p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>

                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border border-gray-200">Year</th>
                            {[...Array(11)].map((_, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-600 border border-gray-200"
                                >

                                    {2024 + index}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="even:bg-gray-100">
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">Payments</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">27,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">4,000</td>
                        </tr>
                        <tr className="even:bg-gray-100">
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">Financial products</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">209</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">972</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">1,199</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">1,433</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">1,674</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">1,923</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">2,180</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">2,446</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">2,720</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">3,003</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">2,164</td>
                        </tr>
                        <tr className="even:bg-gray-100">
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">Available capital</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">27,209</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">34,181</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">41,380</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">48,812</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">56,486</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">64,409</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">72,590</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">81,036</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">89,756</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">98,759</td>
                            <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">104,924</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='  border p-2 rounded-md'>
                <ApexCharts
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                />
            </div>
            <div className='flex items-center'>
                <p className='lg:text-2xl text-xl w-full bg-desColor p-2 font-bold text-btnColor '>Detaills of the evolution of your investment over 10 years</p>
                <FaPlus className='w-10 h-12 bg-btnColor text-white hover:bg-hoverBtnColor p-2' />
            </div>
        </div>
    );
}

export default SummaryChart;
