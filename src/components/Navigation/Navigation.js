import React from 'react';
import '../../index.scss';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.scss';

function Navigation() {
  return (
    <nav>
      <div className="titleContainer">
        <NavLink
          to="/RickTalks"
          className={styles.title}
          activeClassName={styles.titleActive}
        >
          KNOW YOUR RICK AND MORTY
        </NavLink>
      </div>
      <div>
        <span>
          <NavLink
            to="/DeadOrAlive"
            className={styles.navbarLink}
            activeClassName={styles.navbarLinkActive}
          >
            Dead or alive{' '}
          </NavLink>
        </span>

        <span>
          <NavLink
            to="/WhoIsWho"
            className={styles.navbarLink}
            activeClassName={styles.navbarLinkActive}
          >
            {' '}
            Who is who
          </NavLink>
        </span>
      </div>
    </nav>
  );
}

export default Navigation;
