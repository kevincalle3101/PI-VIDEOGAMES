import styles from './Paginated.module.css';


export const Paginated = ({ numberOfVideogames, getByIndexs }) => { //i recive the number of the all videogames and the function that change the state of the page
    let numberOfPages = Math.ceil(numberOfVideogames / 15); // i divide the number of videogames by the number of videogames per page, rounding up
    let setOfNumbers = [];
    for (let i = 1; i <= numberOfPages; i++) { //here i want to get an array of numbers, this numbers to be the page numbers
        setOfNumbers.push(i)
    } 
    return (
            <nav className={styles.containerPaginated}>
                <ul className={styles.unorderedList}>
                    {
                        setOfNumbers.map((numPage) => {  //i'm render the page numbers and execute the function
                            return (
                                <li key={numPage} className={styles.listItem} > 
                                    <a onClick={() => getByIndexs(numPage)} >{numPage}</a>  
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
    )
}