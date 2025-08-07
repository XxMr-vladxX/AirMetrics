import Navegacion2 from "./Navbar2";
import Medidas from './Medidas.png';
import Medidor from './Medidor_Ejemplo.png';

function Home2(){
    return(
        <>
            <Navegacion2></Navegacion2>
            <h1 className="titulo">Monitorea niveles de CO2 en el ambiente con facilidad</h1>
            <hr className="mt-3 mb-2"/>
            <div className='contentBg'>
                <div className='contentItem'>
                    <p className="descripcion">
                        AirMetrics es un dispositivo que busca monitorear los niveles de CO2, la <br/>
                        temperatura y la humedad del ambiente, utilizando sensores y una plataforma<br/>
                        IoT basada en Raspberry Pi, con la finalidad de proporcionar datos en tiempo<br/>
                        real que faciliten la implementación de medidas correctivas y para la mejora<br/>
                        de la calidad del aire.
                    </p><br/>
                    <img src={Medidas} height={151} width={798} alt='Medidor'/>
                </div>
                <div className='contentItem'>
                    <img src={Medidor} style={{marginTop: 20}} height={391} width={241} alt='Medidor'/>
                </div>
            </div>
        </>
    );
}

export default Home2;