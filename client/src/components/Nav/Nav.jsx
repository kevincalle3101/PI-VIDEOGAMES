import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetHome } from "../../redux/actions" //i import the action that will return to home component to its initial state
import style from "./Nav.module.css"


export const Nav = () => {
    const dispatch = useDispatch();
    const resetTheHome = () => { //i establish the function that the dispatch will do 
        dispatch(resetHome());
    }
    return ( //i make the routes that i'm going to use
        <div className={style.principalContainer} >
            <nav className={style.navbarContainer} >
                <button onClick={resetTheHome} className={style.buttom} >
                    <Link to="/home" className={style.Link}>Home</Link>
                    {/* i execute the function when an event happens*/}
                </button >
                <button className={style.buttom}>
                    <Link to="/create"  className={style.Link}>Create Videogame</Link>
                </button>
                <button className={style.buttom}>
                    <Link to="/"  className={style.Link}>Exit</Link>
                </button>
            </nav>
        </div>

    )
}