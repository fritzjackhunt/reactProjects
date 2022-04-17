import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'


function MovieDetails(props){

    const [ highlighted, setHighlighted ] = useState(-1);
    const [ token, setToken ] = useCookies(['mr-token']);

    const mov = props.movie;

    const highlightRate = high => evt => {
        setHighlighted(high);
    }

    const rateClicked = rate => evt => {
        fetch(`http:://127.0.0.1:800/api/movies/${props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mr-token']}`
            },
            body: JSON.stringigy({starts: rate + 1})
        })
        .then( () => getDetails())
        .catch(error => console.log(error))
    }

    const getDetails = () => {
        fetch(`http:://127.0.0.1:800/api/movies/${props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mr-token']}`
            },
        })
        .then( resp => resp.json())
        .then( resp => props.updateMovie(resp))
        .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            { props.movie ? (
                <div>
                    <h1>{props.movie && props.movie.title}</h1>
                    <p>{props.movie && props.movie.description}</p>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 0 ? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 1 ? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 2 ? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 3 ? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 4 ? 'orange': ''}/>
                    ({props.movie.no_of_ratings})

                    <div className="rate-container">
                      <h2>Rate it</h2>
                      { [...Array(5)].map( (e, i) => {
                        return <FontAwesomeIcon key={i} icon={faStar} className={props.movie.highlighted > i -1 ? 'purple': ''}
                        onMouseEnter={highlightRate(i)}
                        onMouseLeave={highlightRate(-1)}
                        onClick={rateClicked(i)}
                        
                        />
                      })}
                    </div>
                </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieDetails;