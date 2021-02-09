import React from 'react';
import userLogo from '../../Assessts/images/logo2.jpg'
import styles from './Logo.module.css'

const logo=(props)=>(
    <div className={styles.Logo}>
        <img src={userLogo} alt="Users" />
    </div>
)
export default logo;