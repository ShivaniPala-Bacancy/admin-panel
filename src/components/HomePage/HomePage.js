import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import styles from './HomePage.module.css'
import Button from '../../UI/Button/Button'

class HomePage extends Component{
    componentWillMount(){
        localStorage.setItem("loggedInState", JSON.stringify(false));
        localStorage.setItem("loggedInId", null);
        this.props.login(false, null);
    }
    
    render(){  
        return(
            <div className={styles.Home}>
                <h1 className={styles.Label}>Sign In to Continue</h1>
                <Link to='/register'><Button btnClass={styles.Button}>Register</Button></Link> 
                <h1 className={styles.Label}>Already Registered?</h1>
                <Link to='/login'><Button btnClass={styles.Button}>Login</Button></Link>
                   
            </div>
        )
    }
}

export default HomePage
