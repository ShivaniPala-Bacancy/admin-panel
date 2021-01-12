import React from 'react'
import FormElements from '../FormElements/FormElements'
import styles from './CreateForm.module.css'

const CreateForm =(props) => {
    
        let formElementsArray =[];
        for(let key in props.formElements){
            formElementsArray.push({
                id: key,
                details: props.formElements[key]
            });
        }
        let form= formElementsArray.map(formElement => {
            return (
                <FormElements 
                    label={formElement.details.elementDisplayName}
                    key={formElement.id}
                    errorMsg = {formElement.details.errorMsg}
                    touched={formElement.details.touched}
                    invalid={!formElement.details.valid}
                    elementType={formElement.details.elementType} 
                    elementConfig={formElement.details.elementConfig} 
                    value={formElement.details.value} 
                    changed={(event) => props.inputChangedHandler(event, formElement.id)} />
            )
        })
        return (  
            <div className={styles.RegistrationForm}>
                <h1 className={styles.Header}>{props.header}</h1>
                {form}
            </div>
    )
}

export default CreateForm;