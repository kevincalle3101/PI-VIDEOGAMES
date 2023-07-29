import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../redux/actions";
import { useState } from "react";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const handleChange = (event) => {
        setName(event.target.value);  //i capture the value of the input
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getVideogameByName(name)); //i make the dispatch to modify my Home component
        setName(''); // i make my input empty again
    }
    return ( 
        <div className={styles.containerSearchBar}>
            <input type='search' value = {name} onChange={handleChange} placeholder="Search..." className={styles.input} />
            <button type='submit' onClick={handleSubmit} className={styles.button} >Search</button>
        </div>
    )   //i capture the value and execute the function
}