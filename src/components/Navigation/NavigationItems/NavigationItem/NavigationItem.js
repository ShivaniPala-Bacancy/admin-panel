import React from 'react';
import styles from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom';
const navigationItem = (props) =>(
    <li className={styles.NavigationItem}>
        <NavLink 
            activeClassName={styles.active}
            to={props.link}
            onClick={props.clicked}
            exact>{props.children}</NavLink>
    </li>
);
export default navigationItem;