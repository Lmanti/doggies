import { GET_DOGS, GET_DOG_DETAILS, LOADING, FILTER_DOGS, GET_TEMPERAMENTS } from '../actions/index.js';

const inicialState = {
    dogsLoaded: [],
    dogsToMod:[],
    dogDetails: {},
    temperaments: [],
    loading: false
}

export default function rootReducer(state = inicialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogsLoaded: action.payload,
                dogsToMod: action.payload,
                loading: false,
            }
        case GET_DOG_DETAILS:
            // if (Array.isArray(action.payload)) {
            //     return {
            //         ...state,
            //         dogDetails: action.payload[0],
            //         loading: false
            //     }
            // }
            let x = {};
            for (let i = 0; i < state.dogsLoaded.length; i++) {
                if (Number(action.payload)  === state.dogsLoaded[i].id) {
                    x = state.dogsLoaded[i]
                }
            }
            return {
                ...state,
                dogDetails: x,
                loading: false
            }
        case FILTER_DOGS:
            let aux
            if (action.payload.mode === 'byName') aux = state.dogsLoaded.filter(ele => ele.name.toLowerCase().includes(action.payload.breed.toLowerCase()))
            else if (action.payload.mode === 'byTempt') {
                var aux2 = state.dogsLoaded.filter(ele => ele.temperament !== undefined)
                aux = aux2.filter(ele => ele.temperament.toLowerCase().includes(action.payload.breed.toLowerCase()))
                if (action.payload.breed.split(' ').length > 1) {
                    for (let i = 0; i < action.payload.breed.split(' ').join('').split(',').length; i++) {
                        aux.push(...aux2.filter(ele => ele.temperament.toLowerCase().includes(action.payload.breed.split(' ').join('').split(',')[i].toLowerCase())))
                    }
                    var set = new Set(aux)
                    aux = Array.from(set)
                }
            }
            else if (action.payload.mode === 'byOrigin') {
                aux = state.dogsLoaded.filter(ele => ele.id.toString().includes('-'))
            }
            switch (action.payload.order) {
                case "Asc": aux = aux.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
                    break;
                case "Des": aux = aux.sort(function (a, b) {
                    if (a.name < b.name) return 1;
                    if (a.name > b.name) return -1;
                    return 0;
                })
                    break;
                case "W-Asc": aux = aux.sort(function (a, b) {
                    let pesoA, pesoB;
                    a.weight.imperial ? pesoA = a.weight.imperial : pesoA = a.weight;
                    b.weight.imperial ? pesoB = b.weight.imperial : pesoA = b.weight;
                    if (parseInt(pesoA) < parseInt(pesoB)) return 1;
                    if (parseInt(pesoA) > parseInt(pesoB)) return -1;
                    return 0;
                })
                    break;
                case "W-Des": aux = aux.sort(function (a, b) {
                    let pesoA, pesoB;
                    a.weight.metric ? pesoA = a.weight.metric : pesoA = a.weight;
                    b.weight.metric ? pesoB = b.weight.metric : pesoA = b.weight;
                    if (parseInt(pesoA) > parseInt(pesoB)) return 1;
                    if (parseInt(pesoA) < parseInt(pesoB)) return -1;
                    return 0;
                })
                    break;
                default: break;
            }
            if (!aux.length) alert("There's nothing to show here in this version 1.0.0, choose Name or temperament and press search to show the dogs again.")
            return {
                ...state,
                dogsToMod: aux
            }
        case GET_TEMPERAMENTS:
            let t = []
            for (let i = 0; i < action.payload.length; i++) {
                if (action.payload[i].temperament) action.payload[i].temperament.split(', ').map((temp, index) => {
                    if (!t.includes(temp)) t.push(temp)
                })
            }
            for (let j in t) {
                t[j] = {id: Number(j) + 1 , name: t[j]}
            }
            return {
                ...state,
                temperaments: t,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}