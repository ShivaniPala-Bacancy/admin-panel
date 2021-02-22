import React, {Component} from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import Button from '../../UI/Button/Button'
import styles from './Register.module.css'
import tableStyles from '../../components/UserDetails/UserDetails.module.css'
import {Link} from 'react-router-dom'

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            personalFormIsValid: false,
            educationalFormIsValid: true,
            showPersonalFrom: true,
            showEducationForm: false,
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
                        // password: true,
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
                            endDate: true
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
            if(rules.endDate){
                let startDate = new Date(this.state.educationalInformation.startDate.value);
                let endDate= new Date(value);
                isValidObject.isValid= (endDate > startDate) && isValidObject.isValid;
                isValidObject.errorMessage = "End Date should be more than start date"
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
        let education =[];
        if(this.state.multipleEducationalInformation.length !== 0){
            education =[
                ...this.state.multipleEducationalInformation
            ];
        }
        let educationalFormData= {};
        for(let key in this.state.educationalInformation) {
            //check if form is filled
            if(this.state.educationalInformation[key].valid){
                educationalFormData[key] = this.state.educationalInformation[key].value;
            }
            
        }
        if(Object.keys(educationalFormData).length !== 0){
            education.push(educationalFormData);
        }
        
        
        let registeredObject= {
            ...this.state.personalInformation,
        }
        for(let key in registeredObject){
            registeredObject[key] = registeredObject[key].value
        }
        registeredObject.id= Math.random().toString(36).substr(2, 9);
        let userArray = JSON.parse(localStorage.getItem("user_information"));
        if(userArray){
            for(let user in userArray)
            {
                    if(registeredObject.email === userArray[user].personalDetails.email){
                        alert("This user is already registered!!!!");
                        return;
                    }
            }
            userArray.push({personalDetails: registeredObject, educationalDetails: education})
            localStorage.setItem("user_information", JSON.stringify(userArray));
        }
        else{
            userArray = {personalDetails: registeredObject, educationalDetails: education};
            localStorage.setItem("user_information", JSON.stringify([userArray]));
        }

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
        this.setState({showEducationForm: true, educationalFormIsValid: false});
        let educationalInformation ={
            ...this.state.educationalInformation
        }
        //check if all fields are filled
        let obj= {}
        for(let key in educationalInformation){
            if(educationalInformation[key].valid){
                obj[key] = educationalInformation[key].value;
            }
        }
        if(Object.keys(obj).length !== 0){
            this.setState({multipleEducationalInformation: [...this.state.multipleEducationalInformation, obj]});
        }
        else{return;}
        
        for(let key in educationalInformation){
            educationalInformation[key].value = "";
            educationalInformation[key].valid= false;
            educationalInformation[key].touched= false;
        }
        this.setState({educationalInformation: educationalInformation});

    }
    removeEducationHandler =() => {
        let educationalInformation ={
            ...this.state.educationalInformation
        }
        
        for(let key in educationalInformation){
            educationalInformation[key].value = "";
            educationalInformation[key].valid= false;
            educationalInformation[key].touched= false;
        }
        this.setState({educationalInformation: educationalInformation, showEducationForm: false, educationalFormIsValid: true});
    }
    nextPageHandler =() =>{
        this.setState({showPersonalFrom: false})
    }
    backPageHandler =() => {
        this.setState({showPersonalFrom: true})
    }
    
    deleteEducationHandler = (index) => {
        let confirmDeletion = window.confirm("Are you sure you want to delete?");
        if(confirmDeletion){
            let updatedEducation= [
                ...this.state.multipleEducationalInformation
            ]
            updatedEducation.splice(index, 1);
            this.setState({multipleEducationalInformation: updatedEducation})
        }
        else{
            return;
        }
    }
    
    editEducationHandler =(index) => {
        let preFilledEducation = {
            ...this.state.educationalInformation
        }
        Object.keys(this.state.multipleEducationalInformation[index]).forEach(e => {
                preFilledEducation[e].value= this.state.multipleEducationalInformation[index][e];
                preFilledEducation[e].valid= true
                
            }
            )
            
            let updatedEducation= [
                ...this.state.multipleEducationalInformation
            ]
            const newList = updatedEducation.splice(index, 1);
            this.setState({multipleEducationalInformation: updatedEducation})
        
        this.setState({educationalInformation: preFilledEducation, educationalFormIsValid: true})
    
    }
    render(){
        let showForm = null;
        let userList;
        if(!this.state.showPersonalFrom) {
            showForm= 
            <div>
                {this.state.showEducationForm? 
                    <CreateForm 
                        header="Registration Form"
                        formElements={this.state.educationalInformation}
                        inputChangedHandler={(event, id) => this.educationalInputChangedHandler(event, id)} 
                        dateChangeHandler={(id) => this.dateChangeHandler(id)}/>
                        : null 
                }
                <Button btnClass={styles.Back} clicked={this.backPageHandler}>Back</Button>
                <Button btnClass={styles.Remove} clicked={this.removeEducationHandler} disabled={!this.state.showEducationForm} >Remove</Button>
                <Button btnClass={styles.AddMore} clicked={this.addEducationHandler} disabled={!this.state.educationalFormIsValid} >+ Add More</Button>
                <br />
                <br />
                <Button btnClass={styles.Submit} clicked={this.submitFormHandler} disabled={!this.state.educationalFormIsValid}>Submit</Button>
                
            </div>
            let userTable = this.state.multipleEducationalInformation.map((e, index) => {
                return(
                            <tr key={index}>
                                <td className={tableStyles.Td}>{e.schoolName}</td>
                                <td className={tableStyles.Td}>{e.course}</td>
                                <td className={tableStyles.Td}>{e.percentage}</td>
                                <td className={tableStyles.Td}>{e.startDate}</td>
                                <td className={tableStyles.Td}>{e.endDate}</td>
                                <td className={styles.Td}>
                                    <Button clicked={() => this.editEducationHandler(index)}>EDIT</Button>
                                </td>
                                    
                                <td className={styles.Td}><Button clicked={() => this.deleteEducationHandler(index)}>DELETE</Button></td>
                            </tr>
                        )
                    })
                
                
            
            userList =(
                <table  className={tableStyles.Table}>
                    <tbody className={tableStyles.Tr}>
                        {userTable}
                    </tbody>
                </table>
            )
        }
        else{
            showForm=
            <div>
                <CreateForm 
                    header="Registration Form"
                    formElements={this.state.personalInformation}
                    inputChangedHandler={(event, id) => this.personalInputChangedHandler(event, id)} />
                <Button btnClass={styles.Next} clicked={this.nextPageHandler} disabled={!this.state.personalFormIsValid}>Next</Button>
            </div>
            
        // ////////////////////////////////////////
            
        }

        
        // ////////////////////////////////////////
        return(
            <div>
                {showForm}
                {userList}
            </div>
        )
    }
}

export default Register;