import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navegacion from './Navbar';

function Login(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const navigate=useNavigate();

    const handleLogin=async () => {
        if (email!=='' && password!==''){   //Si se llenaron ambos campos
            try{    //Intenta consultar la DB
                const res=await axios.get(`http://localhost:3001/api/login?correo=${email}&contrasena=${password}`);
                const result=JSON.stringify(res.data[0]);   //Regresa el resultado en forma de string
                const login_exitoso=result.charAt(result.length-3) || 0;    //Accede al antepenultimo caracter del resultado, 0 para fallido, 1 para exitoso
                if (login_exitoso==='1'){    //Si encuentra un usuario con ambos datos
                    navigate('/dashboard');
                }else{  //Si no encuentra un usuario con ambos datos
                    alert('Correo o contraseña incorrectos');
                }
            }catch{ //Si no se pudo conectar a la DB
                alert('No se pudo conectar al servidor para verificar los datos ingresados');
            }
        }else{  //Si no se llenaron ambos campos
            alert('Ingrese los datos solicitados');
        }
    };

    const showPassword=async () => {    //Revela u oculta la contraseña
        var x=document.getElementById('password');
        if (x.type==='password'){
            x.type='text';
        }else{
            x.type='password';
        }
    };

    return(
        <>
            <Navegacion></Navegacion>
            <form className='loginForm' action={handleLogin}>
                <h1 style={{color: '#6f9e74', textAlign: 'center'}}>Inicio de sesion</h1>

                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Correo electronico'/><br/>
                <input style={{marginBottom: '10px'}} id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Contraseña'/><br/>
                <input style={{marginLeft: '-225px', alignItems: 'last-baseline', height: '16px', width: '16px'}} type='checkbox' onClick={showPassword}/>
                <h3 style={{fontSize: '16px', fontWeight: 'normal', display: 'inline', alignItems: 'center'}}>Mostrar contraseña</h3><br/>

                <a style={{fontSize: '16px'}} href='/signup'>¿No tienes una cuenta? Crea tu cuenta aquí</a><br/><br/>

                <button>Ingresar</button>
            </form>
        </>
    );
}

export default Login;