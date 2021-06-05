export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_DETAILS = 'GET_DOG_DETAILS';
export const FILTER_DOGS = 'FILTER_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const LOADING = 'LOADING';

export function getDogs(breed) {
    return function(dispatch) {
        dispatch({type: LOADING, payload: true})
        if (breed) return fetch('https://api.thedogapi.com/v1/breeds?api_key=69f42b57-6fd7-468f-a8cd-1724e7ee01e6')
                            .then(res => res.json())
                            .then(json => dispatch({type: GET_DOGS, payload: {breed: breed, json: json}}))
        else return fetch('http://lhttps://api.thedogapi.com/v1/breeds?api_key=69f42b57-6fd7-468f-a8cd-1724e7ee01e6')
                    .then(res => res.json())
                    .then(json => dispatch({type: GET_DOGS, payload: json}))
    }
}

export function getDogDetails(id) {
    return function(dispatch) {
        dispatch({type: LOADING, payload: true})
        return fetch('https://api.thedogapi.com/v1/breeds?api_key=69f42b57-6fd7-468f-a8cd-1724e7ee01e6')
                .then(res => res.json())
                .then(dispatch({type: LOADING, payload: false}))
                .then(json => dispatch({type: GET_DOG_DETAILS, payload: {id: id, json: json}}))
    }
}

export function filterDogs(payload) {
    return {
        type: FILTER_DOGS,
        payload
    }
}

// export function getTemperaments() {
//     return function(dispatch) {
//         dispatch({type: LOADING, payload: true})
//         return fetch('https://api.thedogapi.com/v1/breeds?api_key=69f42b57-6fd7-468f-a8cd-1724e7ee01e6')
//                 .then(res => res.json())
//                 .then(json => dispatch({type: GET_TEMPERAMENTS, payload: json}))
//     }
// }

export function getTemperaments() {
    return {
        type: GET_TEMPERAMENTS
    }
}