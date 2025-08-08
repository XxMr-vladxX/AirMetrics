import {useEffect, useState} from 'react';
import axios from 'axios';
import Medidor_Vacio from './Medidor_Vacio.png';

export default function Medidor(){
    const [medidas, setMedidas]=useState({co2: '', temperatura: '', humedad: ''});

    useEffect(() => {
        axios.get('http://localhost:3001/api/current')  //Consulta las medidas actuales de la DB
        .then((res) => {
            const medida_co2=res.data[0].co2 || '----';
            const medida_temperatura=res.data[0].temperatura_celsius || '----';
            const medida_humedad=res.data[0].humedad || '----';
            setMedidas({    //Asigna los datos recuperados o valores por defecto
                co2: medida_co2,
                temperatura: medida_temperatura,
                humedad: medida_humedad
            });
        });
    });

    return (
        <>
            <img src={Medidor_Vacio} style={{marginTop: 20, marginBottom: 50}} height={391} width={241} alt='Medidor'/>
            <p className='CO2'>{medidas.co2}</p>
            <p className='PPM'>PPM</p>
            <p className='Temperatura'>{medidas.temperatura} °C</p>
            <p className='Humedad'>{medidas.humedad} %</p>
        </>
    );
};