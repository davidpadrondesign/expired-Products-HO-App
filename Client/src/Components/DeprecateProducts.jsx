import { deleteSingleProduct } from "../redux/listProductsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeprecateProducts = ({dpcteproduct, loginData}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deprecate = dpcteproduct.dpcteproduct.deprecate;

    const handleDeleteClick = () => {
        dispatch(deleteSingleProduct({ _id: dpcteproduct.dpcteproduct._id, loginToken: dpcteproduct.loginData }));
        navigate(0); //refresh page
    }

    return (
        <>
            { deprecate ? (
                <tr className="table-row alert-deprecate">
                    <td className="table-data"><img src={dpcteproduct.dpcteproduct.productImage} alt={dpcteproduct.dpcteproduct.productName} className="imgWidth"/></td>
                    <td className="table-data">{dpcteproduct.dpcteproduct.productName}</td>
                    <td className="table-data">${dpcteproduct.dpcteproduct.price}</td>
                    <td className="table-data">Vto: {dpcteproduct.dpcteproduct.expireTime}</td>
                    <td>
                        <span>
                            <button onClick={() => navigate(`/updateProduct/${dpcteproduct.dpcteproduct._id}`)} className="general-btn update-product-btn">
                                <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAh9JREFUSEuVlWt140AMhT8hqIsgZRBDcJjsMtgy6DJYBk2RuBBiBlsGZqCekTVPj5Pd+ZH4yOMr6epKEsIRQO0pPZcmf7P7+9c7Dxx0YMx0DN/G2w0wX/KnXZaVg1/OwQewloDhVknLpPAOvOQga2RBA5s/gSswADPI6BzfgEvpZHOQz1+EU6pHXZZ4K4ELzAojsPjLM8gNNDkpMhAEVadWHhTQIhcY1cBl8gw+gbPAqwp/QqAtUNLSHQdOi0Uezg3k4g5mtox+A2+B+yoDUHXJFo4ts8jaYLQII+q0CGc0OLEzgiygE8L6fxkIA1rSwuSgRouLZUGZBNao4ooiCSls3Gz2/JNoEVgUA18FBjUVpUKbPStT6hqYg9zPUb4l54vApFv6B3aTbKSsrIHh1Q6SzmOEppYQ4U5Fgq6bZGUW9LmcPB6py7TMwBRisltUmFBLf0CYUYs06D/SFSgNmT156yamUpt1MoiBPLsqNlqyilwtSdR14MFTU8z2QmiVIFPRDl1GSz1Jop59QjwqsndPM/gSLZ0paQG5/gqKMkLbaDGjiLUHL0d37sg04w5GRTBn7Bojr4KO3SgSkNRoTZopg+6SuGN0Eu5T5C3+5FHUU7uzxQ6W0pfASz01882g6SvIySjagfrg64xav/qF8gP4jHu+3QftrsmkOGgZdTFlc3s2smg3Wh11h5ajMuwKXmzD7jd1/0RNVbth/12Hum9OshArV0axpgAAAABJRU5ErkJggg=="/></span>
                            </button>
                            <button onClick={handleDeleteClick} className="general-btn delete-btn">
                                <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAp5JREFUSEuNlo1RKlEMhb90QAdqBUAFagdQgbwKwEqACp5WoK8CsQKhA+xgO8ib5GZ3c3dhdGd2Bu5Pfk5OTlYYPgKoICjqe74wOlYvXD9jO2EjDoWD3mhe/8FPbPfuLNArGaSoVwL3KsxQZnH8CNj7Dvy7aCI5G/mNlBbAFrj9Ie4z8Czw3gLZg1BlUOG4E1hrWfoGdsDBoo5TlskDsAFuLCBBdwrPl7IZ1muHso7aPKNu/GJNw9kGZOukEPaobDIpUpHdhsHyFtbmgfMVhKqMZwJfwbolqNWm4082cEa4QR1TS7l9JkDTEa6sdmtxyOCymllN7lrziUWyAv0LjnkqrLwIOlV4bJ0gTFD5ADUm/ekcC2fUasIyGIYk2r8IPEWhWtwtSivuFOGIymPg+wFO2RPCA0rT18OzeAVWreMWBotmCgyxL06EKercN9JYT5yCSU3qdnP6JXBUt1M3WqJxSEVfxwnCAWUaGZ9QeQBtipJU0qKeZVkKiEoOhfaxMaCOZeGwhE/LpK9JpoyzNVyECtUQCfMOimCLwEdIxSkuG5SXnDhEXptSo6xF8gL6hJCbyyMXmKlfcljsVguXYZ3ZtUHZCryqF7mWioWgb+o8lrukpkZTc2DS4L0QND0ETcOQy7vdvQFdIryXWOru6Rot9KdvNKEZjIWJQNMC7rokbE27BG6z8OWZElLhSM+D+2ngZHmofs8E/Qpny15ZW4jqIWNNtk6Nsx9kOSCYK6o1lwW6R/1/N8RKJ8eVNIl2oEVRi7aY088kfsaQ+4DlNgzsEazIachKlop6Dgu6UMGk27RlFEJK4xtkI2g3cPL58cgcAlAk3F6LunRy4XkZmcGW0bWua8cGR5DnEdj1aCUP1789fpPBLz5cquFThfwfCRMMMgSNNucAAAAASUVORK5CYII="/></span>
                            </button>
                        </span>
                    </td>
                </tr>
            ) : ( null ) }
        </>
    );
}

export default DeprecateProducts;