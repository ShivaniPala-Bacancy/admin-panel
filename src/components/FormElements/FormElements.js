import React from 'react';
import styles from './FormElements.module.css'
import DayPicker from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const FormElements =(props) => {
    let formElement= null;
    const inputClasses= [styles.FormElements]
    switch(props.elementType){
        case('date'):
        let date= new Date();
            formElement=
                <div>
                    <DayPicker
                        onDayChange={props.changed}
                        value={props.value}
                        />
                        <br/>
                    {props.touched ? (props.invalid ? <span className={styles.error}>{props.errorMsg}</span>  : null)  : null}
                </div>
            break;
        case('input'):
            formElement= 
                <div>
                    <input 
                            onBlur={props.changed}
                            className={inputClasses.join(' ')}  
                            type={props.elementConfig.type} 
                            onChange={props.changed} 
                            placeholder={props.elementConfig.placeholder} 
                            name={props.label} 
                            value={props.value} />

                    {props.touched ? (props.invalid ? <span className={styles.error}>{props.errorMsg}</span>  : null)  : null}
                </div>
            break;
        case('select'):
            formElement=(
                <select className={styles.FormElements} onChange={props.changed} value={props.value}>
                    {props.elementConfig.placeholder.map(option =>(
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            formElement= <input className={inputClasses.join(" ")} type={props.elementConfig.type} onChange={props.changed} placeholder="enter here" value={props.value} />
            break;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {formElement}
        </div>
    )
}

export default FormElements;