import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import CreateForm from  '../../components/CreateForm/CreateForm'
import Button from '../../UI/Button/Button'
import styles from './Login.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Login extends Component{
    constructor(props){
        super(props)
        this.state= {
            loginFormIsValid: false,
            loginFormElements:{       
                email: {
                    elementDisplayName: 'Email',
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, 
                    valid: false,
                    touched: false,
                    errorMsg: ""
                },
                password: {
                    elementDisplayName: 'Password',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Your Password'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, 
                    valid: false,
                    touched: false,
                    errorMsg: ""
                },
            }
        }
    }

    submitFormHandler = () => {
        let email = this.state.loginFormElements["email"].value;
        let password= this.state.loginFormElements["password"].value;
        let matchedObject= {}
        let id= null;
        let registeredUsers= JSON.parse(localStorage.getItem("user_information"));
        if(registeredUsers == null){
            alert("No Users Registered!!!");
            return;
        }
        matchedObject = registeredUsers.find(r => {
            return r.personalDetails.email === email && r.personalDetails.password === password;
        }
        )        
        if(matchedObject !== undefined){
            id = matchedObject.personalDetails.id;
            this.props.onLogin(id);
            alert("Successfully Logged In")
            this.props.history.push("/" + id);
        }
        else{
            alert("Incorrect email or password");
        } 
    }
    checkValidity(value, rules){
        let isValidObject = {
            isValid: true,
            errorMessage: ''
        }     
        if(rules){
            if(rules.required){
                isValidObject.isValid = value.trim() !== '' && isValidObject.isValid;
                isValidObject.errorMessage= "Required"
            }
        }
        return isValidObject;
    }
   
    inputChangedHandler =(event, id) => {
        const updatedLoginFormElements ={
            ...this.state.loginFormElements
        }
        const updatedLoginFormElement ={
            ...updatedLoginFormElements[id]
        }
        
        updatedLoginFormElement.value= event.target.value;
        updatedLoginFormElement.touched= true
        let errorObject = this.checkValidity(updatedLoginFormElement.value, updatedLoginFormElement.validation);    
        updatedLoginFormElement.valid = errorObject.isValid;
        updatedLoginFormElement.errorMsg= errorObject.errorMessage;
        updatedLoginFormElements[id] = updatedLoginFormElement;
        let formIsValid= true;
        for(let id in updatedLoginFormElements){
            formIsValid = formIsValid && updatedLoginFormElements[id].valid;
        }
        this.setState({loginFormElements: updatedLoginFormElements, loginFormIsValid: formIsValid});
    }
    
    render(){
        return(
            <div>
                <CreateForm 
                    header="Login Form"
                    formElements={this.state.loginFormElements}
                    inputChangedHandler={(event, id) => this.inputChangedHandler(event, id)} />
                <Button 
                    btnClass={styles.Submit}
                    clicked={this.submitFormHandler} 
                    disabled={!this.state.loginFormIsValid}>Login</Button>
                <Button btnClass={styles.ForgotPwd}>Forgot Password???</Button>
                <br />
                <h1 style={{textAlign: 'center', textDecoration: 'underline', marginLeft: '35%'}}>OR</h1>
                <br />
                <Link to="/register"><Button btnClass={styles.Register}>Register</Button></Link>
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

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (id) => dispatch(actions.login(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
