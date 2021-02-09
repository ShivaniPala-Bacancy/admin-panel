import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import styles from './LoggedInScreen.module.css'
import Button from '../../UI/Button/Button'

class LoggedInScreen extends Component{
    logOut= () => {
        
        localStorage.setItem("loggedInState", JSON.stringify(false));
        localStorage.setItem("loggedInId", null);
        this.props.login(false, null);
        this.props.history.push("/");
    }
    
    render(){
        let id= this.props.match.params.id;
        let users = JSON.parse(localStorage.getItem("user_information"));
        let user = users.find(u =>{
            return  u.personalDetails.id === id});
        let name= user.personalDetails.firstName + " " + user.personalDetails.lastName;
            
        return(
            <div> 
                <h1 style={{marginLeft: '35%', marginRight: '35%'}}>You Are Logged In As {name}</h1>
            </div>
            )
    }
}
    
export default withRouter(LoggedInScreen);