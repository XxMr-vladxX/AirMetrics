import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navegacion2 from './Navbar2';
import Medidor from './Medidor';
import CO2_Ultimas_24_hrs from './Grafica_Dia';
import CO2_Semanal from './Grafica_semana';

function Dashboard(){
    const [month, setMonth]=useState('');
    const navigate=useNavigate();

    const createReport=async () => {
        if (month!==''){    //Si se ha seleccionado un mes
            navigate(`/report?month=${month}`);    //Envia el mes a utilizar para el reporte
        }else{  //Si no se ha seleccionado un mes
            alert('Seleccione el mes del reporte');
        }
    };

    return(
        <>
            <Navegacion2></Navegacion2>
            <h1 className="titulo">Dashboard</h1>
            <hr className="mt-3 mb-2"/>
            <div className='contentBg'>
                <div className='contentItem'>
                    <Medidor></Medidor>
                </div>
                <div className='contentItem'>
                    <p className="subtitulo">Niveles de CO2 durante las ultimas 24 horas</p>
                    <div className="bg-light mx-auto border border-2 border-primary" style={{height: "250px", width: "456px"}}>
                        <CO2_Ultimas_24_hrs></CO2_Ultimas_24_hrs>
                    </div>
                </div>
                <div className='dashItem'>
                    <p className="subtitulo">Niveles de CO2 durante la ultima semana</p>
                    <div className="bg-light mx-auto border border-2 border-primary" style={{height: "250px", width: "456px"}}>
                        <CO2_Semanal></CO2_Semanal>
                    </div>
                </div>
            </div>
            <div className='contentBg'>
                <form action={createReport}>
                    <select name='Meses' value={month} onChange={e => setMonth(e.target.value)}>
                        <option value={''}>------</option>
                        <option value={'June'}>Junio</option>
                        <option value={'July'}>Julio</option>
                        <option value={'August'}>Agosto</option>
                    </select>
                    
                    <button>Reporte de niveles altos</button>
                </form>
            </div>
        </>
    );
}

export default Dashboard;