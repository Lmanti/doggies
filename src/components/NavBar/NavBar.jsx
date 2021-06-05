import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../styles/NavBar.module.css';
import logoHome from '../../icons/home-icon.png';
import logoDogs from '../../icons/Dogs-icon.png';
import logoCreate from '../../icons/create-icon.png';

export default function NavBar() {
    return (
        <header className={style.header} >
            <div>
                <img src="" alt="" />
            </div>
            <nav className={`${style.nav} ${style.iconcontainer}`} >
                <div>
                    <Link to="/" ><img className={style.logoHome} src={logoHome} alt="" /></Link>
                </div>
                <div>
                    <Link to="/dogs" ><img className={style.logoHome} src={logoDogs} alt="" /></Link>
                </div>
                <div>
                    <Link to="/dogs/create/form" ><img className={style.logoHome} src={logoCreate} alt="" /></Link>
                </div>
            </nav>
        </header>
    )
}