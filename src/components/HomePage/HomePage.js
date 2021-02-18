import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'
import Button from '../../UI/Button/Button'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class HomePage extends Component{
    componentWillMount(){
        this.props.onLogout();
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

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(HomePage);
