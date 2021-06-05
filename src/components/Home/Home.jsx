import React from 'react';
import styles from '../../styles/Home.module.css';
import logo from '../../img/dog.png'

export default function Home() {
    return (
        <div className={styles.fondo}>
            <header className={`${styles.bar} ${styles.header}`} >
                <div className={styles.logocontainer} >
                    <img className={styles.logo} src={logo} alt="" />
                    <h1 className={styles.appname} >Doggies</h1>
                </div>
                <form className={styles.form} action="http://localhost:3000/dogs">
                    <input className={styles.button} type="submit" value="Home" />
                </form>
            </header>
            <div className={styles.corpus} >
                <h1>The place where you learn a bit more about your best friend!</h1>
            </div>
            <footer className={`${styles.bar} ${styles.footer}`} >
                <h5>Created by Luis Herrera</h5>
                <h6>© Copyrights 2021</h6>
            </footer>
        </div>
    )
}