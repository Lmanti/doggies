import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../styles/Dog.module.css';

export function Dog({curretBreeds}) {
    return (
        curretBreeds.map(dog => (
            <div className={style.card} key={dog.id} >
                {dog.image && <img className={style.picture} src={dog.image.url} alt="" />}
                {dog.img && <img className={style.picture} src={dog.img} alt="" />}
                <div className={style.tc} >
                    <h3 ><Link className={style.name} to={`/dogs/${dog.id}`} >{dog.name}</Link></h3>
                    {dog.temperament && <h3 className={style.tempts} >{dog.temperament}</h3>}
                    {dog.temperaments && <h3 className={style.tempts} >{[`${dog.temperaments.map(tem => ' ' + tem.name)}`]}</h3>}
                </div>
            </div>
        ))
    )
}