import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const logout = () =>{
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/auth")
    }
    return (
        <div className="navbar">
            <Link to="/"> Home </Link>
            <Link to="/create-recipe"> Create Recipes </Link>
            <Link to="/saved-recipe"> Saved recipes</Link>
            {!cookies.access_token ? <Link to="/auth"> Login / Register </Link> : 
            <button onClick={logout} class="btn btn-small">Logout</button>}
            
        </div>
    )
}