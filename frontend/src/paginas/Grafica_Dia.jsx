import {useEffect, useState} from 'react';
import axios from 'axios';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
var options={
    responsive: true,
    maintainAspectRatio: true,
};

export default function CO2_Ultimas_24_hrs(){
    const [chartData, setChartData]=useState({labels: [], datasets: []});

    useEffect(() => {
        axios.get(`http://localhost:3001/api/daily_graph`)  //Consulta la vista de la DB
        .then((res) => {  //Asigna los datos recuperados o valores por defecto
            const labels=res.data.map(item => item.hora) || [
                'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA',
                'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA',
            ];
            const values=res.data.map(item => item.co2_promedio) || [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            setChartData({  //Ingresa los datos a la grafica
                labels: labels,
                datasets: [
                    {
                        label: 'Promedio de CO2 de la hora',
                        data: values,
                        borderColor: 'rgb(255, 122, 99)',
                        backgroundColor: 'rgba(255, 122, 99, 0.5)',
                    },
                ]
            });
        });
    }, []);

    return (<Line data={chartData} options={options}/>);
};