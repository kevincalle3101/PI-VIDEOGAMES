import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, addVideogameInDb } from "../../redux/actions";
import styles from "./Create.module.css"

const validator = (dataVideogame) => {  //this is the function that capture the errors of my inputs
    let catchedErrors = {};
    if (dataVideogame.name === "") {
        catchedErrors.name = "Name is required";
    }
    if (dataVideogame.landingDate === "") {
        catchedErrors.landingDate = "Landing Date is required";
    }
    if (dataVideogame.rating === "") {
        catchedErrors.rating = "Rating is required";
    }
    if (dataVideogame.image === "") {
        catchedErrors.image = "Image is required";
    }
    if (dataVideogame.description === "") {
        catchedErrors.description = "Description is required";
    }
    if (dataVideogame.genres.length === 0) {
        catchedErrors.genres = "Genres is required";
    }
    return catchedErrors; //it return an object with the errors
}


export const Create = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres())   //when the component is mount, i bring all of the genres from the DB and put it in my global state
    }, [])
    const allGenres = useSelector((state) => state.allGenres);   // i bring the genres from the global state


    let [dataVideogame, setDataVideogame] = useState({ // i establish the properties of my object that i'll create
        name: "",
        description: "",
        platform: [],
        image: "",
        landingDate: "",
        rating: "",
        genres: [],
        createdInDb: true
    });

    let [catchedErrors, setCatchedErrors] = useState({});

    let [disabledButton, setDisabledButton] = useState(true); //this state is to handler my disabled buttton

    const handleChange = (event) => {
        setDataVideogame({
            ...dataVideogame,
            [event.target.name]: event.target.value //i establish my property state with the input value
        })
        setCatchedErrors(
            validator({
                ...dataVideogame,
                [event.target.name]: event.target.value // i execute the function with the state property and the input value, both updated
            })
        );
        !Object.values(catchedErrors).length ? setDisabledButton(false) : setDisabledButton(true); // when there are no errors, the disabled button will be enabled
    }

    const handleSelectGenre = (event) => {   //these two functions capture the value of the selectors and place them inside their respective arrays
        setDataVideogame({
            ...dataVideogame,
            genres: [...dataVideogame.genres, event.target.value]
        })
    }
    const handleSelectPlatform = (event) => {
        setDataVideogame({
            ...dataVideogame,
            platform: [...dataVideogame.platform, event.target.value]
        })
    }

    const handleSubmit = (event) => {  //this function make the dispatch to create a new Videogame
        event.preventDefault();
        if (!Object.values(catchedErrors).length) { //there should be no errors to dispatch (validation)
            dispatch(addVideogameInDb(dataVideogame));
            setDataVideogame(  //i make that the states  and my inputs to be empty again
                {
                    name: '',
                    description: '',
                    platform: [],
                    image: '',
                    landingDate: '',
                    rating: '',
                    genres: [],
                    createdInDb: true
                }
            );
            setCatchedErrors({})

        }
    }

    return (
        <div className={styles.principalContainer} >
            <form onSubmit={handleSubmit} className={styles.formContainer} >
                <h2 className={styles.presentation} >Create Your Videogame!</h2>
                <div className={styles.containerInputs} >
                    <div className={styles.divName}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input type="text" name="name" id="name" onChange={handleChange} value={dataVideogame.name} className={styles.inputText} />
                        {/*  in my inputs i capture the value of the my state porperty and execute the handleChange function */}
                        {catchedErrors.name && <p className={styles.error}>{catchedErrors.name}</p>} 
                    </div>
                    <div className={styles.divDate}>
                        <label htmlFor="landingDate" className={styles.label}>Released</label>
                        <input type="date" name="landingDate" id="landingDate" onChange={handleChange} value={dataVideogame.landingDate} className={styles.inputDate} />
                        {catchedErrors.landingDate && <p className={styles.error}>{catchedErrors.landingDate}</p>}
                    </div>
                    <div className={styles.divRating}>
                        <label htmlFor="rating" className={styles.label}>Rating</label>
                        <input type="text" name="rating" id="rating" onChange={handleChange} value={dataVideogame.rating} className={styles.inputText} />
                        {catchedErrors.rating && <p className={styles.error}>{catchedErrors.rating}</p>}
                    </div>
                    <div className={styles.divImage}>
                        <label htmlFor="image" className={styles.label}>Image</label>
                        <input type="text" name="image" id="image" onChange={handleChange} value={dataVideogame.image} className={styles.inputText} />
                        {catchedErrors.image && <p className={styles.error}>{catchedErrors.image}</p>}
                    </div>
                    <div className={styles.divDescription}>
                        <label htmlFor="description" className={styles.label}>Game Description</label>
                        <textarea name="description" id="description" onChange={handleChange} value={dataVideogame.description} className={styles.inputDescription} />
                        {catchedErrors.description && <p className={styles.errorDescription}>{catchedErrors.description}</p>}
                    </div>
                    <div className={styles.divGenres}>
                        <label htmlFor="genres" className={styles.label}>Genres</label>
                        <select onChange={handleSelectGenre} id="genres" className={styles.select}>
                            {allGenres?.map(genre => { //i mapped the genres and to render them
                                return (
                                    <option key={genre} value={genre} >{genre} </option>
                                )
                            })}
                        </select>
                        <div className={styles.divMappedElements}>
                            {dataVideogame.genres.length ? dataVideogame.genres.map(genre => {
                                return (
                                    <h5 key={genre} className={styles.elementToRender}>{genre} </h5>
                                ) //i render the genres that i select
                            }) : null}
                        </div>
                    </div>
                    <div className={styles.divPlatform}>
                        <label htmlFor="platforms" className={styles.label}>Platforms</label>
                        <select id="platforms" onChange={handleSelectPlatform} className={styles.select}>
                            <option value="Pc">Pc</option>
                            <option value="Xbox 360">Xbox 360</option>
                            <option value="PlayStation 3">PlayStation 3</option>
                            <option value="Wii">Wii</option>
                            <option value="iOS">iOS</option>
                        </select>
                        <div className={styles.divMappedElements}>
                            {dataVideogame.platform.length ? dataVideogame.platform.map(platform => {
                                return (
                                    <h5 key={platform} className={styles.elementToRender}>{platform}</h5>
                                )   //i render the platforms that i select
                            }) : null} 
                        </div>
                    </div>
                </div>
                <button disabled={disabledButton} className={styles.buttom} >CREATE</button>
            </form>
        </div>

    )
}