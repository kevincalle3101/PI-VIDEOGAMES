import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import sonicGif from "./sonicGif.gif";

export const Detail = () => {
    const { id } = useParams(); //i detect the id to use with useParams
    const [dataVideogame, setDataVideogame] = useState({}); //here i'm save the object that i receive from the API or the BD

    useEffect(() => {
        const fetchVideogame = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3001/videogames/${id}`) // i search in the backend route the videogame with the id
                setDataVideogame(data) //i save the videogame in the state
            } catch (error) {
                console.log(error);
            }
        }
        fetchVideogame() //this is the correct form to make an async request in useEffect, here i execute the function
    }, [id])


    return (
        <div className={styles.container}>
            {dataVideogame.name ? //i ask if the object is not empty, else i render Loading...
                <div className={styles.principalContainer}>
                    <img src={dataVideogame.image} alt="image not found" width="700px" height="400px" className={styles.image} />
                    <div className={styles.dataContainer}>
                        <div className={styles.textContainer} >
                            <h3 className={styles.textDescription}>VIDEOGAME:</h3>
                            <h3 className={styles.text} >{dataVideogame.name}</h3>
                        </div>
                        <div className={styles.textContainer}>
                            <h3 className={styles.textDescription}>RELEASE:</h3>
                            <h3 className={styles.date}>{dataVideogame.released ? dataVideogame.released : dataVideogame.landingDate}</h3>
                            {/* i ask if the object has property from the API or from the DB*/}
                        </div>
                        <div className={styles.textContainer}>
                            <h3 className={styles.textDescription}>PLATFORMS:</h3>
                            <h3 className={styles.text}>{dataVideogame.platform ? dataVideogame.platform.join(", ") : dataVideogame.platforms.join(", ")}</h3>
                            {/* i ask if the object has property from the API or from the DB*/}
                        </div>
                        <div  className={styles.textContainer}>
                            <h3 className={styles.textDescription}>RATING:</h3>
                            <h3 className={styles.text}>{dataVideogame.rating}</h3>
                        </div>
                        <div className={styles.textContainer}>
                            <h3 className={styles.textDescription}>GENRES:</h3>
                            <h3 className={styles.text}>{dataVideogame.genres ? dataVideogame.genres.join(", ") : dataVideogame.Genres.map(genre => genre.name).join(", ")}</h3>
                            {/* i ask if the object has property from the API or from the DB, if it's from the DB i map and access it on its name property*/}
                        </div>
                        <div className={styles.divDescription}>
                            <h3 className={styles.descriptionDescription}>DESCRIPTION:</h3>
                            <h3 className={styles.description}>{dataVideogame.description}</h3>
                        </div>
                    </div>
                </div> :
                <img src={sonicGif} alt="image not found" width="400px" height="400px"  />
            }
        </div>
    )
}