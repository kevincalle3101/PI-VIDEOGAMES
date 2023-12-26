import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideogames, filterCreated, orderAZ, orderRating, filterGenres } from '../../redux/actions';
import { Card } from '../Card/Card';
import { Paginated } from '../Paginated/Paginated';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './Home.module.css';


export const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getVideogames()) }, []); //when the component is mounted i want to fetch the videogames from the global state 
    const allVideogames = useSelector((state) => state.allVideogames); //all videogames

    const [pageIndex, setPageIndex] = useState(1); //i always want the initial value of the page number to be 1    
    let finalIndex = pageIndex * 15;
    let initialIndex = finalIndex - 15;
    let paginatedVideogames = allVideogames.slice(initialIndex, finalIndex); //so  i always get the first 15 videogames

    const getByIndexs = (numPage) => {  //this is a function that change the state depending on the value it receives from the paginated component
        setPageIndex(numPage);
    }
    const filterVideogamesByGenre = (event) => {
        dispatch(filterGenres(event.target.value)); //these next four functions make distpatch to the reducer
        setPageIndex(1);
    }
    const filterVideogamesCreated = (event) => {
        dispatch(filterCreated(event.target.value));
        setPageIndex(1);
    }
    const orderVideogamesAZ = (event) => {
        dispatch(orderAZ(event.target.value));
        setPageIndex(1);
    }
    const orderVideogamesRating = (event) => {  
        dispatch(orderRating(event.target.value));
        setPageIndex(1);
    }
    return (
        <div>
            <div className={styles.principalContainer} > 
                <SearchBar />
                {/* <Paginated
                    numberOfVideogames={allVideogames.length} //i only pass the number of the all videogames
                    getByIndexs={getByIndexs}
                /> */}
                <div className={styles.containerCards} >
                    {
                        paginatedVideogames ? paginatedVideogames.map(({ id, name, image, genres, Genres }) => {
                            return (
                                <Card
                                    id={id}
                                    key={id}
                                    name={name}
                                    image={image}
                                    genres={genres ? genres : Genres}
                                />
                            )
                        }) :
                            <div>
                                <p>Loading...</p>
                            </div>
                    }
                {/** here i'm mapped the properties that i want pass to my card component */}
                </div>
                <div className={styles.containerSelect} >
                    <select onChange={filterVideogamesByGenre} className={styles.select}>
                        <option value="allGenres">Genres</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="RPG">RPG</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Indie">Indie</option>
                        <option value="Platformer">Platformer</option>
                        <option value="Massively Multiplayer">Massively Multiplayer</option>
                        <option value="Sports">Sports</option>
                        <option value="Racing">Racing</option>
                        <option value="Simulation">Simulation</option>
                        <option value="Arcade">Arcade</option>
                        <option value="Casual">Casual</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Strategy">Strategy</option>
                    </select>
                    <select onChange={filterVideogamesCreated} className={styles.select}>
                        <option value="allVideogames">Created or</option>
                        <option value="created">Created</option>
                        <option value="existing">Existing</option>
                    </select>
                    <select onChange={orderVideogamesAZ} className={styles.select}>
                        <option value="default">Order by</option>
                        <option value="A">A-Z</option>
                        <option value="Z">Z-A</option>
                    </select>
                    <select onChange={orderVideogamesRating} className={styles.select}>
                        <option value="allRatings">Rating</option>
                        <option value="minor">Minor Rating</option>
                        <option value="major">Major Rating</option>
                    </select>
                </div>

                <Paginated
                    numberOfVideogames={allVideogames.length} //i only pass the number of the all videogames
                    getByIndexs={getByIndexs}
                />
                {/* here i'm pass the properties that i want pass to my paginated component  */}
            </div>
        </div>

    )
}