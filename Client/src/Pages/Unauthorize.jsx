import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../redux/userLoginSlice";
import { cleanRegister } from "../redux/userRegisterSlice";

const Unauthorized = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirectLogin = () => {
        dispatch(cleanRegister());
        dispatch(userLogOut()); 
        navigate('/');
    }

    return (
        <div className="main-unauth-container">
            <div className="unauth-container">
                <img src="data:image/png;base64,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"/>
                <h1>Unauthorized</h1>
                <p>You are not authorized. Wait for access!</p>
                <br/>
                <div >
                    <button onClick={redirectLogin} className="general-btn unauth-btn">Go Login</button>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;
