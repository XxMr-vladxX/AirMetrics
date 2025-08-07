import {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom'; 
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Pie} from 'react-chartjs-2';
import Navegacion2 from './Navbar2';

ChartJS.register(ArcElement, Tooltip, Legend);
var options={
    responsive: true,
    maintainAspectRatio: false,
};

function Reporte(){
    const [chartData, setChartData]=useState({labels: [], datasets: []});
    const [listaCO2, setListaCO2]=useState([]);
    const [listaTemp, setListaTemp]=useState([]);
    const [listaHum, setListaHum]=useState([]);
    
    //Recupera el mes a traves de la URL
    const location=useLocation(); 
    const query=new URLSearchParams(location.search); 
    const month=query.get('month') || '----';
    const monthName=new Date(month+' 1, 2000').toLocaleString('es-ES', {month: 'long'}) || 'January'; //Traduce el nombre del mes a español

    useEffect(() => {
        axios.get(`http://localhost:3001/api/report?mes=${month}`)  //Consulta los niveles peligrosos del mes especificado
        .then((res) => {
            //Se filtran los registros segun el tipo de dato con medida alta
            setListaCO2(res.data[0].filter(item => item.co2>1000));
            setListaTemp(res.data[0].filter(item => item.temperatura_celsius>35));
            setListaHum(res.data[0].filter(item => item.humedad>60));

            //Se obtienen los datos de la grafica en base a la cantidad de registros en cada categoria
            const labels=['CO2', 'Temperatura', 'Humedad'];
            const values=[listaCO2.length, listaTemp.length, listaHum.length];
            setChartData({  //Ingresa los datos a la grafica
                labels: labels,
                datasets: [
                    {
                        label: 'Instancias de niveles peligrosos',
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        });
    });

    return(
        <>
            <Navegacion2></Navegacion2>
            <h1 className="titulo">Reporte de niveles altos</h1>
            <hr className="mt-3 mb-2"/>
            <div className='contentBg'>
                <div className='contentItem' style={{width: '550px'}}>
                    <p className="subtitulo">Niveles altos en el mes de {monthName}</p>
                    <ol>
                        <li>CO2:</li>
                        <ol>
                            {listaCO2.map(item => ( //Lista los registros con CO2 alto
                                <li key={item.id_lectura}>El {item.fecha} a las {item.hora}, el nivel de CO2 alcanzo {item.co2} PPM</li>
                            ))}<br/>
                        </ol>
                        <li>Temperatura:</li>
                        <ol>
                            {listaTemp.map(item => (    //Lista los registros con temperatura alta
                                <li key={item.id_lectura}>El {item.fecha} a las {item.hora}, la temperatura alcanzo {item.temperatura_celsius} °C</li>
                            ))}<br/>
                        </ol>
                        <li>Humedad:</li>
                        <ol>
                            {listaHum.map(item => ( //Lista los registros con humedad alta
                                <li key={item.id_lectura}>El {item.fecha} a las {item.hora}, la humedad alcanzo {item.humedad} %</li>
                            ))}<br/>
                        </ol>
                    </ol>
                </div>
                <div className='contentItem'>
                    <p className="subtitulo">Atribucion de niveles altos en medidas del ambiente</p>
                    <div className="bg-light mx-auto border border-2 border-primary" style={{height: "250px", width: "456px"}}>
                        <div style={{height: "100%", width: "100%", padding: "10px 0"}}>
                            <Pie data={chartData} options={options}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reporte;