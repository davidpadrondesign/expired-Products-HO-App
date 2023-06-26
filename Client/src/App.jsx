import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //Routes replce switch
import Home from "./Pages/Home";
import ProductsList from "./Pages/ProductsList";
import NotFoundPage from "./Pages/NotFountPage";
import AddProductForm from "./Components/AddProductForm";
import Unauthorized from "./Pages/Unauthorize";
import SessionExpired from "./Components/SessionExpired";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/unauthorized' element={ <Unauthorized /> } />
        <Route path='/sessionExpired' element={ <SessionExpired /> } />
        <Route element={ <PrivateRoute /> }>
          <Route path='/productsList' element={ <ProductsList /> } />
        </Route>
        <Route element={ <PrivateRoute /> }>
          <Route path='/addNewProduct' element={ <AddProductForm /> } />
          <Route path='/updateProduct/:id' element={ <AddProductForm /> } />
        </Route>
        
        <Route path='*' element={ < NotFoundPage/> } />
      </Routes>
    </Router>
  );
}

export default App;
