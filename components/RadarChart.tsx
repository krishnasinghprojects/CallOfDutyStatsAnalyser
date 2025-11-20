import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface RadarChartProps {
  data: {
    labels: string[]
    values: number[]
  }
  username: string
}

export default function RadarChart({ data, username }: RadarChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: username,
        data: data.values,
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderColor: '#FFD700',
        borderWidth: 2,
        pointBackgroundColor: '#000',
        pointBorderColor: '#FFD700',
        pointBorderWidth: 1.5,
        pointHoverBackgroundColor: '#FFD700',
        pointHoverBorderColor: '#fff',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  }

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.08)',
          circular: true,
        },
        pointLabels: {
          color: '#94a3b8',
          font: {
            size: 9,
            family: "'Rajdhani', sans-serif",
            weight: 700,
          },
        },
        ticks: {
          display: false,
          backdropColor: 'transparent',
        },
        suggestedMin: 20,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(5, 5, 5, 0.95)',
        titleColor: '#FFD700',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        titleFont: {
          family: "'Black Ops One', cursive",
        },
        bodyFont: {
          family: "'Rajdhani', sans-serif",
        },
        displayColors: false,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
  }

  return <Radar data={chartData} options={options} />
}
