import React , {Component} from 'react';
import CreateForm from '../../components/CreateForm/CreateForm'
import Button from '../../UI/Button/Button'
import styles from './EditEducation.module.css'

class EditEducation extends Component{
    constructor(props){
        super(props);
        this.state={
            formIsValid: true,
            educationalInformation : 
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
                    valid: true,
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
                    valid: true,
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
                    valid: true,
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
                    valid: true,
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
                    valid: true,
                    touched: false,
                    errorMsg: ""
                },          
            }
            
                
            }
        }
        education;
        componentDidMount(){
            this.parseQueryParams();
            let preFilledEducation = {
                ...this.state.educationalInformation
            }
            Object.keys(this.education).forEach(e => {
                    preFilledEducation[e].value= this.education[e];
                }
                )
            
            this.setState({educationalInformation: preFilledEducation})
        }
        parseQueryParams(){
            const query = new URLSearchParams(this.props.location.search);
            
            let obj={}
            for(let param of query.entries()){
                let value= param[1];
                obj[param[0]] = value;
            }
            this.education = obj;
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
                if(rules.percentage){
                    isValidObject.isValid= percentRegex.test(value) && isValidObject.isValid;
                    isValidObject.errorMessage = "Percentage Format Incorrect"
                }
            }
            return isValidObject;
        }
        inputChangedHandler =(event, id) => {
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
            this.setState({educationalInformation: updatedEducation, formIsValid: formIsValid});
        }
        editEducationHandler =() => {
            let id= this.props.match.params.id;
            //create new object to replace the old one
            
            let educationalFormData ={};
            for(let key in this.state.educationalInformation) {
                //check if form is filled
                if(this.state.educationalInformation[key].valid){
                    educationalFormData[key] = this.state.educationalInformation[key].value;
                }
                
            }
            let users = JSON.parse(localStorage.getItem("user_information"));
            let updatedUsers= [
                ...users
            ]
            let flag = 0;

            
        for(let key in updatedUsers){
            let user = updatedUsers[key];
            if(user.personalDetails.id === id){
                for(let education in user.educationalDetails){
                    flag =0;
                    Object.keys(this.education).forEach(e => {
                        if(user.educationalDetails[education][e] === this.education[e]){
                        }
                        else{
                            flag = flag + 1;
                        }
                        
                    }
                    )
                    if(flag === 0){
                        user.educationalDetails[education] = educationalFormData;
                    }
                }
                updatedUsers[key] = user;
            }
        }
        localStorage.setItem("user_information", JSON.stringify(updatedUsers));
            alert("Successfully updated education!!!");
            this.props.history.push("/user-education/" + id);

        
    }
        render(){
            return(
                <div>
                    <CreateForm 
                        header="Edit Education Form"
                        formElements={this.state.educationalInformation}
                        inputChangedHandler={(event, id) => this.inputChangedHandler(event, id)} />
                    <Button btnClass={styles.Edit} clicked={this.editEducationHandler} disabled={!this.state.formIsValid}>Save Changes</Button>
                </div>
           
            )
        }    
        
    }
export default EditEducation;