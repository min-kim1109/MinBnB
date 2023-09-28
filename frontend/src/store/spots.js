import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT = 'spots/GET_SPOT';
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS';


// POJO action creator
const getAllSpots = spot => {
    return {
        type: GET_ALL_SPOTS,
        spot
    }
};

const getASpot = spot => {
    return {
        type: GET_SPOT,
        spot
    }
};





// Thunk action to get all spots
export const getSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`)
    // console.log('response: ', response)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getAllSpots(spot))
        // console.log('spots', spot)
        return spot
    } else {
        const errors = await response.json();
        return errors
    }
};

// Thunk to GET a spot
export const getSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getASpot(spot))
        // console.log('getSpot: ', spot)
        return spot
    }
}

export const createSpotThunk = (spot) => async (dispatch) => {
    // console.log('createSpot spot: ', spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })
    // console.log('store/spot spot: ', spot)
    const newSpot = await response.json()
    dispatch(getASpot(newSpot))
    // console.log('createSpot THUNK newSpot: ', newSpot)
    return newSpot
};




// key into 2nd
const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } }

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_ALL_SPOTS:
            newState = { ...state, allSpots: {} };
            // key into 'spot' from action creator and 'Spots' from the return in backend route
            action.spot.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState;

        case GET_SPOT:
            newState = { ...state, singleSpot: {} }
            newState.singleSpot = action.spot;
            return newState;

        default:
            return state; // Return the current state by default

    }
}

export default spotsReducer;
