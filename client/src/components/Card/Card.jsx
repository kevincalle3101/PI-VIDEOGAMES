import { Link } from 'react-router-dom';
import styles from './Card.module.css';


export const Card = ({ id, name, image, genres }) => {
    return (
        <div className={styles.containerCard}>
            <img src={image} alt="image not found" width="500px" height="300px" className={styles.image} />
            <div className={styles.containerDescription} >
                <h3>{name}</h3>
                <h4>{typeof genres[0] === 'string' ? genres.join(", ") : genres.map(genre => genre.name).join(", ")}</h4>
            </div>
            <div  className={styles.divDetail}>
                <Link to={`/detail/${id}`} className={styles.detail} >
                    Detail
                </Link>
            </div>

            {/* the above component checks if Genres comes from the API or from the DB*/}
        </div>
    )
}
