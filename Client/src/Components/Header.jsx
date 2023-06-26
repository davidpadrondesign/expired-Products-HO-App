import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../redux/userLoginSlice";
import { removeAllState } from "../redux/listProductsSlice";
import { cleanRegister } from "../redux/userRegisterSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(removeAllState()); //reset listproducts state
        dispatch(cleanRegister());
        dispatch(userLogOut()); //'userLoginId' es el action.payload
        navigate('/');
    }

    return (
        <div className="container-center-space-between">
            <h1>New Product</h1>
            <ul className="ul-container">
                <li className="li-container">
                    <Link to="/addNewProduct" className="general-btn add-product-btn">
                        <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAi9JREFUSEuFluFVIzEMhD9VEqgAqABKCBVABySVJFRwUAG5Du4quNABVKJ7srVryesN/pGXdWR5NCPNRgTQ9sHqKjHxV9+I+55H0DnUtgYrH245BvuDpD0MiEELpDwD9wi3KLd++AycBU4Kv21vAcIDawXjC7bAAbhqiIRSfqb0C9gDpzUuRvtH4MVhfQscFf4Yag+2Sh6AHbBxjBazN7RNA/u+XDV5PbVHsee8srA7VA7eAa9+aWOlo9xo+fBsdxPiNZHDrVbRP39+jHQlDUC/EDao7AW1knvo6kglyuq07FQ4oJgm1/VgpuhZ4JfCdxZ2rtYGRl1kMaVjvzsSS74ReFQXPWrwJvBUhRrwXjPUBqp3jpaJbp33DtbeUwX1lHXIDXAHcm5jm1SqrFXwaXnn2qyYFpbLNIxIJPA7n21pBpYQQEj4nnQKpeYLPF+5YGxVqbJI2TSHpcr4wwpFiYmgwcDsKFZiFH1SvucuuixyzTdR1rXpDGIHchD0XSeRQ6FbgQ8l9PHC+CKNuU09tLQp4MOWKighU0Bt1SULq13kFmEtGuZIkK45tnrRKlYtKVmF27h3dDjjlzWzq25pBjY7w6CjpuGymFe0nPGVBy3COwq8uKJGm136t7Pre6flym93J43vjG7kO3TmrJa4+P2FZZwb6vmFE/MkTxkPFNZdpo3xbFZisD5ROQt6UuE0DdTSfbNV9H8bfgC+8I6Z9/j3o38fDJMuxmERlSPak/AfVbrpJLNFIl4AAAAASUVORK5CYII="/></span>
                    </Link>
                </li>
                <li className="li-container">
                    <button onClick={() => handleLogOut()} className="general-btn power-off-btn"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAfdJREFUSEuVlut1wjAMhT9tEiYBNiGTQCeBThI6CWyiVn7KjgPUPziJsSLdh5SIABp+oF6nDWz567DxdtUICdFv1mcJxqdyAo/Ap1tFiQaoAZYFa7zrUPaspEduZfF/+wTblWxS5DPX8AZGLDiW3Kxx7ODgIGoS9BmNsEIwAc9BqrIVK1lzHW0FZ5BL8pndOwRBg4cKN5SvLSs0ULtDC3DoKMmamr4+4Q2Ys8+r+B1FLsEVOCX4M3BPiXzL2JZRtIBMoDFJXs4zhSKnvoYqhCNaHt5RVMIsyUPAdJq788iqkyFXXypyZxoNnCRXUEN8gaRHRjAQ55EgHx01GfiWTU0r08yotLjKlG+KVFFIIOhOgwXfzKUIzzR4RM1k583WUJTS2sFJYJDgZboBum4WpZ5Y0GDPEUXrPow7xr9pdwOZK4JxJ5+TWEnkNNQGYjl6r4KeNIncaFA7uRh3QoPtrJdWKAZ5DiBLqvoIcvdTdqSBh2yiGeTcaN2I44BglJoVZo0UuYnSUNS6RdCrBm4DRTeFH1fdBLIHNd/bugsc/RxpFV/N2pIs6NHO9/ySKVPqYsPOOd+9iDKClwKGeWOu2oMcEr82oo22b4Snn7Hl3Z7zDxqt4/kTF/W+qV8QUWQ3k/N1r+Z/7ivjH770fUD9vtmqys3pv2p/AT7X5SGXkFBvAAAAAElFTkSuQmCC"/></span></button>
                </li>
            </ul>
        </div>
    );
}

export default Header;