import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const loginData = useSelector((state) => state.usersLogin.users);

  const [activeOutlet, setActiveOutlet] = useState(false);
  const [activeUnauthorize, setActiveUnauthorize] = useState(false);
  const [activeLoginPage, setActiveLoginPage] = useState(false);

  useEffect(() => {
    //VERIFY DATA FROM REDUX
    loginData.token && loginData.authorization ? setActiveOutlet(true) : loginData.token ? setActiveUnauthorize(true) : setActiveLoginPage(true)
  }, [loginData]);

  return (
    activeOutlet 
    ? <Outlet /> 
    : activeUnauthorize 
    ? <Navigate to='/unauthorized' /> 
    : activeLoginPage 
    ? <Navigate replace to='/' /> : null
  );
}

export default PrivateRoute;





