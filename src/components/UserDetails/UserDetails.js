import React,{ Component } from 'react';
import styles from './UserDetails.module.css'

class UserDetails extends Component{
    users = JSON.parse(localStorage.getItem("user_information"));

    render(){
        let userTable = this.users.map(u => {
            return (
                <tr key={u.personalDetails.id}>
                    <td className={styles.Td}>{u.personalDetails.firstName}</td>
                    <td className={styles.Td}>{u.personalDetails.lastName}</td>
                    <td className={styles.Td}>{u.personalDetails.gender}</td>
                    <td className={styles.Td}>{u.personalDetails.email}</td>
                    <td className={styles.Td}>{u.personalDetails.phoneNumber}</td>
                </tr>
            )
        })
        let userList =(
            <table  className={styles.Table}>
                <thead className={styles.Thead}>
                <tr>
                    <td className={styles.Td}>FIRST NAME</td>
                    <td className={styles.Td}>LAST NAME</td>
                    <td className={styles.Td}>GENDER</td>
                    <td className={styles.Td}>EMAIL</td>
                    <td className={styles.Td}>CONTACT NUMBER</td>
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

export default UserDetails;