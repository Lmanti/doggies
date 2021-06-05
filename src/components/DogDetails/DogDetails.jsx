import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetails} from '../../actions';
import { Link } from 'react-router-dom';
import style from '../../styles/DogDetails.module.css';
import logoDogs from '../../icons/Dogs-icon.png';

export function DogDetails({match}) {
    const dispatch = useDispatch()
    const dogDetails = useSelector(state => state.dogDetails);

    useEffect(() => {
        dispatch(getDogDetails(match.params.id))
        // eslint-disable-next-line
    }, [])

    
    const [existe, setExiste] = useState(false)

    useEffect(() => {
        if (dogDetails.id) {
            if (dogDetails.id === Number(match.params.id)) setExiste(true)
            else setExiste(false)
        }
        // eslint-disable-next-line
    }, [dogDetails])

    return (
        <div className={style.container} >
            {
                existe && <div className={style.dog} >
                {dogDetails.image && <img className={style.img} src={dogDetails.image.url} alt="" />}
                {dogDetails.img && <img className={style.img} src={dogDetails.img} alt="" />}
                <h1>{dogDetails.name}</h1>
                {dogDetails.temperament && <h2 className={style.h2} >Temperaments: {dogDetails.temperament}</h2>}
                {dogDetails.temperaments && <h2 className={style.h2} >Temperaments: {[`${dogDetails.temperaments.map(tem => ' ' + tem.name)}`]}</h2>}
                {dogDetails.height.imperial && <h3>Height: {dogDetails.height.imperial} Inches</h3>}
                {!dogDetails.height.imperial && <h3>Height: {dogDetails.height} Inches</h3>}
                {dogDetails.weight.imperial && <h3>Weight: {dogDetails.weight.imperial} Lbs</h3>}
                {!dogDetails.weight.imperial && <h3>Weight: {dogDetails.weight} Lbs</h3>}
                <h3>Life Span: {dogDetails.life_span}</h3>
                </div>
            }             
            <Link to='/dogs'><img className={style.back} src={logoDogs} alt="" /></Link>
        </div>
    )
}