import { ChartConfiguration } from 'chart.js';

import { ChartData, Charts } from '../interfaces';

export const createChartConfig = ({ labels, data, label, color }: ChartData): ChartConfiguration => {
  const isIncomeChart = label.toLowerCase() === Charts.INCOME;

  return {
    type: 'line',
    options: {
      responsive: true,
      interaction: {
        intersect: false,
        axis: 'x',
      },
      scales: {
        y: {
          ticks: isIncomeChart
            ? {
                callback: function (value) {
                  return '$' + value;
                },
              }
            : undefined,
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: isIncomeChart
          ? {
              callbacks: {
                label(tooltipItem): string | string[] {
                  return `Income: $${tooltipItem.parsed.y}`;
                },
              },
            }
          : undefined,
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: false,
        },
      },
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
          fill: false,
        },
      ],
    },
  };
};
