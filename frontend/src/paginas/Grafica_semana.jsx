import {useEffect, useState} from 'react';
import axios from 'axios';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
var options={
  responsive: true,
  maintainAspectRatio: true,
};

export default function CO2_Semanal() {
  const [chartData, setChartData]=useState({labels: [], datasets: []});

  useEffect(() => {
    axios.get(`http://localhost:3001/api/weekly_graph`) //Consulta la vista de la DB
    .then((res) => {  //Asigna los datos recuperados o valores por defecto
      const labels=res.data.map(item => item.dia_nombre) || ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'];
      const max=res.data.map(item => item.co2_max) || [0, 0, 0, 0, 0, 0, 0];
      const min=res.data.map(item => item.co2_min) || [0, 0, 0, 0, 0, 0, 0];
      setChartData({  //Ingresa los datos a la grafica
        labels: labels,
        datasets: [
          {
            label: 'Pico de CO2 del dia',
            data: max,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Nivel mas bajo de CO2 del dia',
            data: min,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ]
      });
    });
  }, []);

  return <Line data={chartData} options={options}/>;
};