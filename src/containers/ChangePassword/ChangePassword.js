import React, {Component} from 'react';
import Button from '../../UI/Button/Button'
import {withRouter} from 'react-router-dom'
import CreateForm from '../../components/CreateForm/CreateForm';
import styles from './ChangePassword.module.css'

class ChangePassword extends Component{
    
        state= {
            changePasswordFormIsValid: false, 
            changePasswordForm: {
                oldPassword: {
                    elementDisplayName: 'Old Password',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Old Password'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, 
                    valid: false,
                    touched: false,
                    errorMsg: ""
                },
                newPassword: {
                    elementDisplayName: 'New Password',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'New Password'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, 
                    valid: false,
                    touched: false,
                    errorMsg: ""
                }
            }
        }
        id= this.props.match.params.id;
        users= JSON.parse(localStorage.getItem("user_information"));
        user= this.users.find(u => {
            return u.personalDetails.id === this.id;
        })
    
    
    
    checkValidity(value, rules){
        let isValidObject = {
            isValid: true,
            errorMessage: ''
        }
        if(rules){
            if(rules.required){
                isValidObject.isValid = value.trim() !== '' && isValidObject.isValid;
                isValidObject.errorMessage = "Required"
            }
            
        }
        return isValidObject;
    }
    inputChangedHandler =(event, id) => {
        const updatedForm ={
            ...this.state.changePasswordForm
        }
        const updatedFormElement ={
            ...updatedForm[id]
        }
        updatedFormElement.value= event.target.value;
        updatedFormElement.touched= true
        let errorObject = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);    
        updatedFormElement.valid= errorObject.isValid;
        updatedFormElement.errorMsg= errorObject.errorMessage
        updatedForm[id] = updatedFormElement;
        let formIsValid= true;
        for(let id in updatedForm){
            formIsValid = formIsValid && updatedForm[id].valid;
        }
        this.setState({changePasswordForm: updatedForm, changePasswordFormIsValid: formIsValid});
    }
    changePasswordHandler = () => {

        if(this.state.changePasswordForm.oldPassword.value !== this.user.personalDetails.password){
            alert("Old Password does not match");
        }
        else{
            this.user.personalDetails.password= this.state.changePasswordForm.newPassword.value;
            this.user.personalDetails.confirmPassword= this.state.changePasswordForm.newPassword.value;
            for(let key in this.users){
                if(this.users[key].personalDetails.id === this.id){
                    this.users[key] = this.user;
                    localStorage.setItem("user_information", JSON.stringify(this.users));
                }
            }
            alert("Password changed!!!");
            
        localStorage.setItem("loggedInState", JSON.stringify(false));
        localStorage.setItem("loggedInId", null);
            this.props.login(false, null);
            this.props.history.push("/");
        }
    }
    
    render(){
      
        return(
            <div>
                
                <CreateForm 
                    header="Change Password Form"
                    formElements={this.state.changePasswordForm}
                    inputChangedHandler={(event, id) => this.inputChangedHandler(event, id)} />
                <Button btnClass={styles.Change} clicked={this.changePasswordHandler} disabled={!this.state.changePasswordFormIsValid}>Change</Button>
            </div>
            
        )
    }
}

export default withRouter(ChangePassword);