import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserRegister } from "../redux/userRegisterSlice";
import { userLogin } from "../redux/userLoginSlice";
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify'; 

//REGULAR EXPRESSION
const REGEX_USER_NAME = /^[a-zA-Z0-9]{1,20}$/;
const REGEX_PASSWORD = /^[a-zA-Z0-9.\-_:\/]{1,20}$/;

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerName, setRegisterName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    //VALID
    const [validregisterName, setValidregisterName] = useState(false);
    const [validregisterPassword, setValidregisterPassword] = useState(false);
    const [validloginName, setValidloginName] = useState(false);
    const [validloginPassword, setValidloginPassword] = useState(false);
    const [errorRegisterMsg, setErrorRegisterMsg] = useState(false);
    const [errorLoginMsg, setErrorLoginMsg] = useState(false);

    //REACT-TOAST-FUNCTIONS
    const loginIncorrect = () => toast.error('User or Password Incorrect', { position: "top-center", theme: "colored" });
    const registerSuccessful = () => toast.success('Regiter Successful', { position: "top-center", theme: "colored" });
    const registerIncorrect = () => toast.info('User already exist!', { position: "top-center", theme: "dark" });
    const registerFail = () => toast.error('Register Fail', { position: "top-center", theme: "colored" });
    const alertCard = () => toast.warn('Some empty field ☹️', { position: "top-center", theme: "dark" });

    useEffect(() => {
        //REGISTER
        const resultNameRegister = REGEX_USER_NAME.test(registerName);
        setValidregisterName(resultNameRegister);

        const resultPasswordRegister = REGEX_PASSWORD.test(registerPassword);
        setValidregisterPassword(resultPasswordRegister);

        //LOGIN
        const resultNameLogin = REGEX_USER_NAME.test(loginName);
        setValidloginName(resultNameLogin);

        const resultPasswordLogin = REGEX_PASSWORD.test(loginPassword);
        setValidloginPassword(resultPasswordLogin);

        if(resultNameRegister || resultPasswordRegister || resultNameLogin || resultPasswordLogin) setErrorRegisterMsg(false);
    }, [registerName, registerPassword, loginName, loginPassword]);

    //REGISTER-FORM
    const handleRegister = (e) => {
        e.preventDefault();

        //VALIDATION BLACK-FIELDS
        if(!registerName || !registerPassword) {
            alertCard();
            return 
        }

        //VALIDATION HACK JS
        const v1 = REGEX_USER_NAME.test(registerName);
        const v2 = REGEX_PASSWORD.test(registerPassword);

        //if 'user' or 'pwd' are incorrect send error-message and DON´T SEND THE FORM!
        if(!v1 || !v2) {
            setErrorRegisterMsg(true);
            return;
        }

        dispatch(addUserRegister({ registerName, registerPassword })).then((response) => { 
            if(response.payload.registerUser.token) {
                setRegisterName('');
                setRegisterPassword('');
                registerSuccessful();
            }
            if(response.payload.registerUser.msg) {
                if(response.payload.registerUser.msg === 'user already exist') { 
                    registerIncorrect();
                } else {
                    registerFail();
                }
                
            }
        });
    }

    //LOGIN-FORM
    const handleLogin = (e) => {
        e.preventDefault();

        //VALIDATION BLACK-FIELDS
        if(!loginName || !loginPassword) {
            alertCard();
            return 
        }

        //VALIDATION HACK JS
        const v1 = REGEX_USER_NAME.test(loginName);
        const v2 = REGEX_PASSWORD.test(loginPassword);

        //if 'user' or 'pwd' are incorrect send error-message and DON´T SEND THE FORM!
        if(!v1 || !v2) {
            setErrorLoginMsg(true);
            return;
        }

        dispatch(userLogin({ loginName, loginPassword })).then((response) => { 
            if(response.payload.loginUser.token) {
                setLoginName('');
                setLoginPassword('');
                navigate('/productsList');
            } 
            if(response.payload.loginUser.msg) { 
                loginIncorrect();
            }
        }); 
    }


    return (
        <div className="center-container-flex middle-screen">
            <div className="container-form">
                <div className="container-register-login">
                    <div className="bg-title-regis-log">
                        <h1 className="">Register</h1>
                    </div>
                    <form onSubmit={handleRegister} className="center-container-flex-colum">
                        <div className="elements-container">
                            <input type="text" className="inputTitleForm-rl input-color" placeholder="User name" value={registerName} name="registerName" onChange={(e) => setRegisterName(e.target.value)}/>
                        </div>
                        <p className={validregisterName || !registerName ? 'display-Off' : 'display-On warning-info' }>
                            1 to 20 characters.<br />
                            Characters allowed: "aA-zZ", "0-9"
                        </p>

                        <div className="elements-container">
                            <input type="password" className="inputTitleForm-rl input-color" placeholder="User password" value={registerPassword} name="registerPassword" onChange={(e) => setRegisterPassword(e.target.value)}/>
                        </div>
                        <p className={validregisterPassword || !registerPassword ? 'display-Off' : 'display-On warning-info' }>
                            1 to 20 characters.<br />
                            Characters allowed: "aA-zZ", "0-9", ":" "/" "." "-" "_"
                        </p>

                        <p className={errorRegisterMsg ? 'display-On warning-info' : 'display-Off' }>
                            ERROR: INVALID ENTRY
                        </p>
                        
                        <div className="elements-container">
                            <button disable={!validregisterName || !validregisterPassword ? "true" : "false" } className="general-btn register-btn" type="submit">Register</button>
                        </div>
                    </form>
                </div>

                <div className="container-register-login">
                    <div className="bg-title-regis-log">
                        <h1 className="">Login</h1>
                    </div>
                    <form onSubmit={handleLogin} className="center-container-flex-colum">
                        <div className="elements-container">
                            <input type="text" className="inputTitleForm-rl input-color" placeholder="User name" value={loginName} name="loginName" onChange={(e) => setLoginName(e.target.value)}/>
                        </div>
                        <p className={validloginName || !loginName ? 'display-Off' : 'display-On warning-info' }>
                            1 to 20 characters.<br />
                            Characters allowed: "aA-zZ", "0-9"
                        </p>
                        
                        <div className="elements-container">
                            <input type="password" className="inputTitleForm-rl input-color" placeholder="User password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                        </div>
                        <p className={validloginPassword || !loginPassword ? 'display-Off' : 'display-On warning-info' }>
                            1 to 20 characters.<br />
                            Characters allowed: "aA-zZ", "0-9", ":" "/" "." "-" "_"
                        </p>

                        <p className={errorLoginMsg ? 'display-On warning-info' : 'display-Off' }>
                            ERROR: INVALID ENTRY
                        </p>

                        <div className="elements-container">
                            <button disable={!validloginName || !validloginPassword ? "true" : "false" } className="general-btn login-btn" type="submit">Login</button>
                        </div>
                    </form>  
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;