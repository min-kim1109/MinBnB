import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSpotThunk } from '../../store/spots'
import './SingleSpot.css'

const SingleSpot = () => {

    // dispatch is to interact with store
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const spot = useSelector((state) => state.spot.singleSpot);

    const spotImages = useSelector(state => state.spot.singleSpot.SpotImages)

    useEffect(() => {
        dispatch(getSpotThunk(spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    if (spot.id !== parseInt(spotId)) return null;

    // if (!spot) return null;
    if (!spotImages) return null;
    const firstImg = spotImages[0]
    if (!firstImg) return null;

    // if (!sessionUser) return null;

    const topBox = spotImages.slice(1, 3)
    // console.log('imgBox: ', imgBox)

    const bottomBox = spotImages.slice(3)


    const handleClick = (e) => {
        e.preventDefault();
        alert("FEATURE COMING SOON!")
    }

    return (
        <div className="spotPage">
            <div className="location-name">
                <h2>{spot.name}</h2>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </div>

            <div className="image-container">
                <div className="bigImg"><img src={firstImg.url} alt='firstImg' /></div>
                <div className="imgBox">
                    <div className="topBox">
                        {topBox.map(image => (
                            <img key={image.url} src={image.url} className="img" alt="imgBox" />
                        ))}
                    </div>
                    <div className="bottomBox">
                        {bottomBox.map(image => (
                            <img key={image.url} src={image.url} className="img" alt="imgBox" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="spot-details">
                <div className="owner-description">
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <div className="description">{spot.description}</div>
                </div>
                <div className="infoBox">
                    <div className="topInfo">
                        <div className="priceNight">
                            <h3 className="price">${spot.price} </h3>
                            <h5 className="night"> night</h5>
                        </div>
                        <div className="ratingReviews">
                            <h5 className="rating">
                                <i className="fa-solid fa-star"></i>{!spot.avgStarRating ? <span>NEW</span> : spot.avgStarRating.toFixed(1)}
                            </h5>
                            {spot.numReviews ? <i className="fa-solid fa-circle"></i> : <p></p>}
                            <h5 className="numReviews">
                                {spot.numReviews ? `${spot.numReviews}  ${spot.numReviews > 1 ? 'reviews' : 'review'}` : <p></p>}
                            </h5>
                        </div>
                    </div>
                    <button className="reserve" onClick={handleClick}>
                        Reserve
                    </button>
                </div>
            </div>
            <div className="starReviews">
                <h3 className="reviewsRating">
                    <i className="fa-solid fa-star"></i>{!spot.avgStarRating ? <span>NEW</span> : spot.avgStarRating.toFixed(1)}
                </h3>
                {spot.numReviews ? <i className="fa-solid fa-circle"></i> : <p></p>}
                <h3 className="reviewsNumReviews">
                    {spot.numReviews ? `${spot.numReviews} ${spot.numReviews > 1 ? 'reviews' : 'review'}` : <p></p>}
                </h3>
            </div>

        </div>
    )
}


export default SingleSpot;