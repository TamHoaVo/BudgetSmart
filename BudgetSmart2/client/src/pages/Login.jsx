import NavBar from "../components/NavBar";
import moneyback from "../assets/moneyback2.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export default function Login(props){
    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');

    const inputStyle = 'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';

    const verifyLogin = async (e) =>{
        e.preventDefault()

        try{
            const res = await axios.post('http://localhost:8080/login', {
                email: email,
                password: pass
            });

            setMessage('Login Successful');
            props.setLoggedIn(true);
            nav('/dashboard');

        } catch(err) {
            if (err.response){
                setMessage(err.response.data.message);
            } else{
                setMessage('An error occured during login')
            }
        }
    }

    return(
        <>
            <NavBar />
            <div className="flex items-center justify-center w-full h-screen" style={{ backgroundImage: `url(${moneyback})` }}>
                <div className="w-50 bg-white justify-center text-center rounded-md shadow-lg p-5">
                    <span className="font-Outfit text-4xl font-semibold"><h1>Log In</h1></span>
                    <p>Welcome Back!</p>
                    <span className="text-red-500 font-semibold"><p>{message}</p></span>

                    <form onSubmit={verifyLogin} className="mt-5 grid grid-cols-4 gap-4 mb-3">
                        <div className="col-span-4 ">
                            <p>Email</p>
                            <input value={email} className={inputStyle} placeholder="Your Email" onChange={(e) => setEmail(e.target.value)}></input>
                        </div>

                        <div className="col-span-4">
                            <p>Password</p>
                            <input value={pass} className={inputStyle} placeholder="Your Password" onChange={(e) => setPass(e.target.value)}></input>
                        </div>

                        <button type="submit" className="col-span-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</button>
                    </form>

                    <Link to="/create"><p>Dont have an account? Create one here!</p></Link>

                </div>
            </div>
        </>
    );
}