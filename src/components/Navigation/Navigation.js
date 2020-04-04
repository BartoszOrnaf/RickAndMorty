import React from 'react';
import "../../index.scss";
import styles from "./navigation.module.scss";
import { NavLink } from "react-router-dom";

function Game() {

    return (
        <nav>
            <span>
                <NavLink
                    to="/DeadOrAlive"
                    className={styles.navbarLink}
                    activeClassName={styles.navbarLinkActive}
                >Dead or alive </NavLink>
            </span>
            <span>
                <NavLink
                    to="/WhoIsWho"
                    className={styles.navbarLink}
                    activeClassName={styles.navbarLinkActive}
                > Who is who</NavLink>
            </span>
        </nav>
    )

};

export default Game;