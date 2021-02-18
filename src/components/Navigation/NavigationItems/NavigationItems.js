import React, {Component} from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'
import {Link} from 'react-router-dom';
import Logo from '../../../UI/Logo/Logo'
import {connect} from 'react-redux';

class NavigationItems extends Component{
    render(){
    let navItems;
    let i= this.props.loggedIn;
    if(i){
        let id= this.props.loggedInId;
        let users = JSON.parse(localStorage.getItem("user_information"));
        let user= users.find(u => {
            return u.personalDetails.id === id;
        })
        navItems= (
            <ul className={styles.NavigationItems}>
                
                <NavigationItem link={"/user-details/" + id}  >User Details</NavigationItem>
                <NavigationItem link={"/user-education/" + id}  >User Education</NavigationItem>
                <NavigationItem link={"/change-password/" + id}  >Change Password</NavigationItem>
                <NavigationItem link={"/" + id}>{user.personalDetails.firstName}</NavigationItem>
                <NavigationItem link="/"  >Logout</NavigationItem>
            </ul>
        )
    }
    else{
        navItems= (
            <ul className={styles.NavigationItems}>
                <NavigationItem link="/">Home</NavigationItem>
                <NavigationItem link="/login">Login</NavigationItem>
                <NavigationItem link="/register">Register</NavigationItem>
            </ul>
        )
    }
    
    return(
        <div>
            <div  className={styles.Logo} >
                <Logo/>
            </div>
            {navItems}
        </div>
    )
    }    
}
const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        loggedInId: state.loggedInId
    }
}
export default connect(mapStateToProps)(NavigationItems);