import React, {Component} from 'react'
import {Registrations} from '../../hoc/Registrations'
import {Link} from 'react-router-dom'
import styles from './LoggedInScreen.module.css'
import Button from '../../UI/Button/Button'

class LoggedInScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            displayUser: false
        }
    }
    id= this.props.match.params.id;
    displayName= "";
    matchedObject = Registrations.filter(element => {
        return element.id == this.id;
    })
    render(){
        
    if(this.matchedObject !== null){
        this.displayName = this.matchedObject[0].firstName + " " + this.matchedObject[0].lastName;
    }
    else{
        this.props.history.push('/');
    }
    
    
    return(
            <div>   
                <h1 style={{textAlign: 'center'}}>You Are Logged In As {this.displayName}</h1>
                <Link to="/"><Button btnClass={styles.LogOut}>Log Out</Button></Link>
                
            </div>
        )
}
}
    
export default LoggedInScreen