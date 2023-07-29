import {Link} from 'react-router-dom';
import styles from './Landing.module.css';

export const Landing = () => {
    return (
        <div className={styles.principalContainer} >
            <div className={styles.container} >
                <h1 className = {styles.greeting}>Welcome to my gaming page</h1>
                <h2 className = {styles.presentation}>On this page you'll find incredible games and you can even create your own!</h2>
                <Link to="/home" className={styles.button} >
                    Go!
                </Link>
            </div>
        </div>
    )
}

