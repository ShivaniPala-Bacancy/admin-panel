import React, {Component} from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import {Registrations, Id} from '../../hoc/Registrations'
import Button from '../../UI/Button/Button'
import styles from './Register.module.css'

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            personalFormIsValid: false,
            educationalFormIsValid: false,
            showPersonalFrom: true,
            multipleEducationalInformation: [],
            personalInformation: {
                firstName: {
                    elementDisplayName: 'First Name',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your First Name'
                    },
                    value: '',
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    errorMsg: "First Name is Required"
                },
                lastName: {
                    elementDisplayName: 'Last Name',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Last Name'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, 
                    valid: false,
                    touched: false,
                    errorMsg: "Last Name is required"
                },
                gender: { 
                    elementDisplayName: 'Gender',  
                    elementType: 'select',
                    elementConfig: {
                        placeholder: [
                            {value: 'male', displayValue: 'Male'},
                            {value: 'female', displayValue: 'Female'},
                            {value: 'other', displayValue: 'Other'},
                        ]
                    },
                    value: 'male',
                    validation:{
                        required: true,
                    }, valid: true,
                    touched: false,
                    errorMsg: ""
                },
                email: {
                    elementDisplayName: 'Email',
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Mail-id'
                    },
                    value: '',
                    validation:{
                        required: true,
                        email: true
                    },
                    valid: false,
                    touched: false,
                    errorMsg: ""
                },
                phoneNumber: {   
                    elementDisplayName: 'Contact No.',        
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Phone Number'
                    },
                    value: '',
                    validation:{
                        number: true,
                        length: 10,
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
                        placeholder: 'Password'
                    },
                    value: '',
                    validation:{
                        password: true,
                        required: true,
                    }, 
                    valid: false,
                    touched: false,
                    errorMsg: ""
                },
                confirmPassword: {
                    elementDisplayName: 'Confirm Password',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Confirm Password'
                    },
                    value: '',
                    validation:{
                        passwordMatch: true,
                        required: true,
                    }, 
                    valid: false,
                    touched: false,
                    errorMsg: ""
                },          
            },
            educationalInformation: 
                {
                    schoolName: {
                        elementDisplayName: 'Institution Name',
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Your School Name'
                        },
                        value: '',
                        validation:{
                            required: true,
                        },
                        valid: false,
                        touched: false,
                        errorMsg: ""
                    },
                    percentage: {
                        elementDisplayName: 'Percentage',
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Your Percentage/CGPA'
                        },
                        value: '',
                        validation:{
                            percentage: true,
                            required: true,
                        }, 
                        valid: false,
                        touched: false,
                        errorMsg: ""
                    },
                    course: {
                        elementDisplayName: 'Course',
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Your Name'
                        },
                        value: '',
                        validation:{
                            required: true,
                        }, 
                        valid: false,
                        touched: false,
                        errorMsg: ""
                    },
                    startDate: {
                        elementDisplayName: 'Start Date',
                        elementType: 'date',
                        elementConfig: {
                            type: 'date',
                            placeholder: 'Select Date'
                        },
                        value: '',
                        validation:{
                            required: true,
                        }, 
                        valid: false,
                        touched: false,
                        errorMsg: ""
                    },  
                    endDate: {
                        elementDisplayName: 'End Date',
                        elementType: 'date',
                        elementConfig: {
                            type: 'date',
                            placeholder: 'Select Date'
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
    
    checkValidity(value, rules){
        let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        let percentRegex = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})%?$/;
        let isValidObject = {
            isValid: true,
            errorMessage: ''
        }
        if(rules){
            if(rules.required){
                isValidObject.isValid = value.trim() !== '' && isValidObject.isValid;
                isValidObject.errorMessage = "Required"
            }
            if(rules.length){
                isValidObject.isValid= value.length === rules.length && isValidObject.isValid; 
                isValidObject.errorMessage= "Length should be " + value.length
            }
            if(rules.number){
                isValidObject.isValid = !isNaN(value) && isValidObject.isValid;
                isValidObject.errorMessage = "Invalid Number"
            }
            if(rules.passwordMatch){
                isValidObject.isValid = value === this.state.personalInformation["password"].value && isValidObject.isValid;
                isValidObject.errorMessage = "Password and Confirm Password do not match"

            }
            if(rules.password){
                isValidObject.isValid = passwordRegex.test(value) && isValidObject.isValid;
                isValidObject.errorMessage= "Weak Password"
            }
            if(rules.percentage){
                isValidObject.isValid= percentRegex.test(value) && isValidObject.isValid;
                isValidObject.errorMessage = "Percentage Format Incorrect"
            }
        }
        return isValidObject;
    }
    submitFormHandler = () => {   
        let education =[
            ...this.state.multipleEducationalInformation
        ];
        let educationalFormData= {};
        for(let key in this.state.educationalInformation) {
            educationalFormData[key] = this.state.educationalInformation[key].value;
        }
        education.push(educationalFormData);
        
        let registeredObject= {
            ...this.state.personalInformation,
        }
        for(let key in registeredObject){
            registeredObject[key] = registeredObject[key].value
        }
        registeredObject.education= education
        registeredObject.id= Math.random().toString(36).substr(2, 9);
        Registrations.push(registeredObject)
        alert("Registered Successfully!!!");
        this.props.history.push("/login")
    }

    personalInputChangedHandler =(event, id) => {
        const updatedPerson ={
            ...this.state.personalInformation
        }
        const updatedPersonalInformation ={
            ...updatedPerson[id]
        }
        updatedPersonalInformation.value= event.target.value;
        updatedPersonalInformation.touched= true
        let errorObject = this.checkValidity(updatedPersonalInformation.value, updatedPersonalInformation.validation);    
        updatedPersonalInformation.valid= errorObject.isValid;
        updatedPersonalInformation.errorMsg= errorObject.errorMessage
        updatedPerson[id] = updatedPersonalInformation;
        let formIsValid= true;
        for(let id in updatedPerson){
            formIsValid = formIsValid && updatedPerson[id].valid;
        }
        this.setState({personalInformation: updatedPerson, personalFormIsValid: formIsValid});
    }
    educationalInputChangedHandler =(event, id) => {
        const updatedEducation ={
            ...this.state.educationalInformation
        }
        const updatedEducationalInformation ={
            ...updatedEducation[id]
        }
        
        if (id === 'startDate' || id === 'endDate') {
            if (event) {
                updatedEducationalInformation.value = event.toLocaleDateString();
            } 
        }
        else {
            updatedEducationalInformation.value = event.target.value;
        }
        updatedEducationalInformation.touched= true
        let errorObject = this.checkValidity(updatedEducationalInformation.value, updatedEducationalInformation.validation);    
        updatedEducationalInformation.valid= errorObject.isValid;
        updatedEducationalInformation.errorMsg= errorObject.errorMessage;
        updatedEducation[id] = updatedEducationalInformation;
        let formIsValid= true;
        for(let id in updatedEducation){
            formIsValid = formIsValid && updatedEducation[id].valid;
        }   
        this.setState({educationalInformation: updatedEducation, educationalFormIsValid: formIsValid});
    }
    addEducationHandler = () => {
        let educationalInformation ={
            ...this.state.educationalInformation
        }
        let obj= {}
        for(let key in educationalInformation){
            obj[key] = educationalInformation[key].value;
        }
        this.setState({multipleEducationalInformation: [...this.state.multipleEducationalInformation, obj]});
        for(let key in educationalInformation){
            educationalInformation[key].value = "";
            educationalInformation[key].valid= "false";
        }
        this.setState({educationalInformation: educationalInformation});

    }
    nextPageHandler =() =>{
        this.setState({showPersonalFrom: false})
    }
    backPageHandler =() => {
        this.setState({showPersonalFrom: true})
    }
    render(){
        let showForm = null;
        if(!this.state.showPersonalFrom) {
            showForm= 
            <div>
                <CreateForm 
                    header="Registration Form"
                    formElements={this.state.educationalInformation}
                    inputChangedHandler={(event, id) => this.educationalInputChangedHandler(event, id)} 
                    dateChangeHandler={(id) => this.dateChangeHandler(id)}/>
                <Button btnClass={styles.AddMore} disabled={!this.state.educationalFormIsValid} clicked={this.addEducationHandler}>+ Add More</Button>
                <Button btnClass={styles.Back} clicked={this.backPageHandler}>Back</Button>
                <br />
                <br />
                <Button btnClass={styles.Button} clicked={this.submitFormHandler} disabled={!this.state.educationalFormIsValid}>Submit</Button>
            </div>
        }
        else{
            showForm=
            <div>
                <CreateForm 
                    header="Registration Form"
                    formElements={this.state.personalInformation}
                    inputChangedHandler={(event, id) => this.personalInputChangedHandler(event, id)} />
                <Button btnClass={styles.Button} clicked={this.nextPageHandler} disabled={!this.state.personalFormIsValid}>Next</Button>
            </div>
        }
        return(
            <div>
                {showForm}
            </div>
        )
    }
}

export default Register;