import React from "react";
import style from '../../styles/Pagination.module.css';
import icon from '../../icons/paginate.png'

export function Pagination({currentPage, totalDogs, breedsPerPage, handlePaginate}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalDogs / breedsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={style.pags} >
            {/* <button className={style.button} onClick={handlePaginate} id='back' >Back</button> */}
            <img className={style.back} onClick={handlePaginate} id='back' src={icon} alt="" />
            <div onChange={handlePaginate} >
                {/* {
                    pageNumbers.map(num => {
                        return (
                        <option id={num} key={`P` + num}>{num}</option>
                    )})
                } */}
                {
                    pageNumbers.map(num => (
                        currentPage === num && <div className={style.pageNum} id={num} key={`P` + num}>{num}</div>
                    ))
                }
            </div>
            <img className={style.next} onClick={handlePaginate} id='next' src={icon} alt="" />
            {/* <button className={style.button} onClick={handlePaginate} id='next' >Next</button> */}
        </div>
    )
}