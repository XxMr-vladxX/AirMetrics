import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navegacion from './Navbar';

function SignUp(){
    const [username, setUsername]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [password2, setPassword2]=useState('');
    const navigate=useNavigate();

    const handleSignUp=async () => {
        if (username!=='' && email!=='' && password!=='' && password2!==''){    //Si se llenaron todos los campos
            if (password!==password2){  //Si la contraseña ingresada y su confirmacion no son identicas
                alert('La contraseña ingresada para confirmacion es incorrecta');
            }else{  //Si la contraseña ingresada y su confirmacion son identicas
                try{    //Intenta insertar en la DB
                    const response=await fetch(`http://localhost:3001/api/signup`, {
                        method: "POST", headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({nombre: username, correo: email, contrasena: password}),
                    });
                    const result=await response.json();
                    if (result.creado){ //Si se inserto en la DB
                        navigate('/dashboard');
                    }else{  //Si no se inserto en la DB
                        alert('Error al intentar registrar el usuario');
                    }
                }catch{ //Si no se pudo conectar a la DB
                    alert('No se pudo conectar al servidor para registrar el usuario');
                }
            }
        }else{  //Si no se llenaron todos los campos
            alert("Ingrese los datos solicitados");
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
            <form className='loginForm' action={handleSignUp}>
                <h1 style={{color: '#6f9e74', textAlign: 'center'}}>Nueva cuenta</h1>

                <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Nombre de usuario'/><br/>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Correo electronico'/><br/>
                <input type='text' value={password} onChange={e => setPassword(e.target.value)} placeholder='Contraseña'/><br/>
                <input style={{marginBottom: '10px'}} id='password' type='password' value={password2} onChange={e => setPassword2(e.target.value)} placeholder='Confirmar contraseña'/><br/>
                <input style={{marginLeft: '-225px', alignItems: 'last-baseline', height: '16px', width: '16px'}} type='checkbox' onClick={showPassword}/>
                <h3 style={{fontSize: '16px', fontWeight: 'normal', display: 'inline', alignItems: 'center'}}>Mostrar contraseña</h3><br/>

                <a style={{fontSize: '16px'}} href='/login'>¿Ya tienes una cuenta? Inicia sesion aquí</a><br/><br/>

                <button>Crear cuenta</button>
            </form>
        </>
    );
}

export default SignUp;