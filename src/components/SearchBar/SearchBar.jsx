import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterDogs } from '../../actions/index.js';
import { Dog } from "../Dog/Dog.jsx";
import { Pagination } from "../Dogs/Pagination.jsx";
import style from '../../styles/SearchBar.module.css';
import loadingIcon from '../../img/loading.gif';

export function SearchBar() {
    const dispatch = useDispatch()
    //estado
    const dogsLoaded = useSelector(state => state.dogsToMod)
    const [breed, setBreed] = useState('')
    const loading = useSelector(state => state.loading)

    useEffect(() => {
        dispatch(getDogs())
        // setIsLoading(false)
    }, [])

    //paginacion
    const [currentPage, setCurrentPage] = useState(1)
    const [breedsPerPage] = useState(8)

    //handlers de los input de texto
    const handleChange = (e) => setBreed(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(filterDogs({breed: breed, mode: filterCheck, order: radioCheck}))
        setCurrentPage(1)
    }
    const handlePaginate = (e) => {
        // setCurrentPage(Number(e.target.value))
        if (e.target.id === 'back') {
            if (currentPage >= 1) {
                if (currentPage !== 1) setCurrentPage(currentPage - 1) 
            }         
        }
        else if (e.target.id === 'next') {
            if (curretBreeds.length >= 8) setCurrentPage(currentPage + 1)
        }
        else setCurrentPage(Number(e.target.value))
    }
    //ecuación matemática para hallar las razas que voy a mostrar por página
    const curretBreeds = dogsLoaded.slice(((currentPage - 1) * breedsPerPage), (currentPage * breedsPerPage))

    //estados de los radios
    const [filterCheck, setFilterCheck] = useState('byName')
    const [radioCheck, setRadioCheck] = useState('Asc')

    //handlers de los radios
    const handleFilter = (e) => {
        setFilterCheck(e.target.value)
    }

    const handleRadioCheck = (e) => {
        setRadioCheck(e.target.value)
    }

    return (
        <div className={style.container} >
            <form className={style.filters} onSubmit={handleSubmit} >
                <div>
                    <input className={style.searchBar} type="text" value={breed} onChange={handleChange} placeholder='Enter a breed...' />
                    <button className={style.button} >Search</button>
                </div>
                <div className={style.cbFilter} onChange={handleFilter} >
                    <label>Sort by: Name</label>
                    <input type='radio' value='byName' name='filter'  defaultChecked />
                    <label> Temperament</label>
                    <input type='radio' value='byTempt' name='filter' />
                    <label> Origin</label>
                    <input type='radio' value='byOrigin' name='filter' />
                </div>
                <div className={style.cbFilter} onChange={handleRadioCheck} >
                    <label>Order: A-Z</label>
                    <input type='radio' value='Asc' name='order' defaultChecked />
                    <label> Z-A</label>
                    <input type='radio' value='Des' name='order' />
                    <label> Weight Asc</label>
                    <input type='radio' value='W-Asc' name='order' />
                    <label> Weight Des</label>
                    <input type='radio' value='W-Des' name='order' />
                </div>
            </form>
            {loading && (<img className={style.loading} src={loadingIcon} alt="" />)}
            {!loading && <div className={style.dogcontainer} >
                <Dog curretBreeds={curretBreeds} />
            </div>}
            <Pagination currentPage={currentPage} totalDogs={dogsLoaded.length} breedsPerPage={breedsPerPage} handlePaginate={handlePaginate} />
        </div>
    )
}