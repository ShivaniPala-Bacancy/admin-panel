import React,{ Component } from 'react';
import styles from '../../components/UserDetails/UserDetails.module.css';
import Button from '../../UI/Button/Button'
import {Link} from 'react-router-dom'

class UserEducation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users : JSON.parse(localStorage.getItem("user_information")),
        }
    }
    

    deleteEducationHandler = (id, e) => {
        let confirmDeletion = window.confirm("Are you sure you want to delete?");
        if(confirmDeletion){
            let updatedUsers= [
                ...this.state.users
            ]
            for(let key in updatedUsers){
                let user = updatedUsers[key];
                if(user.personalDetails.id === id){
                        let updatedEducationalDetails= user.educationalDetails.filter(edu => edu !== e);
                        user.educationalDetails= updatedEducationalDetails;
                        updatedUsers[key] = user;
                }
            }
            this.setState({users: updatedUsers});
            localStorage.setItem("user_information", JSON.stringify(this.state.users));
        }
        else{
            return;
        }
    }
    editEducationHandler =(id, index) => {
        this.props.history.push("/edit-education/" + id + "/")
    }

    render(){
        let userTable = this.state.users.map(u => {
            let id= u.personalDetails.id;
            return(
                u.educationalDetails.map((e, index) => {
                    return(
                        <tr key={index}>
                            <td className={styles.Td}>{u.personalDetails.firstName}</td>
                            <td className={styles.Td}>{u.personalDetails.lastName}</td>
                            <td className={styles.Td}>{e.schoolName}</td>
                            <td className={styles.Td}>{e.course}</td>
                            <td className={styles.Td}>{e.percentage}</td>
                            <td className={styles.Td}>{e.startDate}</td>
                            <td className={styles.Td}>{e.endDate}</td>
                            <td className={styles.Td}><Link to={{
                                pathname: '/edit-education/' + id,
                                search: '?schoolName=' + e.schoolName + '&course=' + e.course + '&percentage=' + e.percentage + '&startDate=' + e.startDate + '&endDate=' + e.endDate
                            }
                            }>
                                <Button clicked={() => this.editEducationHandler(id, index)}>EDIT</Button>
                                </Link></td>
                            <td className={styles.Td}><Button clicked={() => this.deleteEducationHandler(id, e)}>DELETE</Button></td>
                        </tr>
                    )
                })
            )
            
        })
        let userList =(
            <table  className={styles.Table}>
                <thead className={styles.Thead}>
                <tr>
                    <td className={styles.Td}>FIRST NAME</td>
                    <td className={styles.Td}>LAST NAME</td>
                    <td className={styles.Td}>SCHOOL</td>
                    <td className={styles.Td}>COURSE</td>
                    <td className={styles.Td}>PERCENTAGE</td>
                    <td className={styles.Td}>START DATE</td>
                    <td className={styles.Td}>END DATE</td>
                    <td className={styles.Td}>EDIT</td>
                    <td className={styles.Td}>DELETE</td>
                </tr>
                </thead>
                
                <tbody className={styles.Tr}>
                    {userTable}
                </tbody>
            
            
            </table>

       
        )
        return(
            <div className={styles.TableUsers}>
                <div className={styles.Header}>Personal Details</div>
                {userList}
            </div>
        )
        }
}

export default UserEducation;