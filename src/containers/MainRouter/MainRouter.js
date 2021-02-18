import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import HomePage from '../../components/HomePage/HomePage'
import LoggedInScreen from '../../components/LoggedInScreen/LoggedInScreen'
import UserDetails from '../../components/UserDetails/UserDetails'
import UserEducation from '../UserEducation/UserEducation'
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import ChangePassword from '../ChangePassword/ChangePassword';
import EditEducation from '../EditEducation/EditEducation'
import styles from './MainRouter.module.css'

class MainRouter extends Component {


    render() {
        return (
            <div>
                
        <nav className={styles.nav}>
            <NavigationItems />
        </nav>
                <main>
                    {this.props.children}
                </main>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path='/user-details/:id' exact component={UserDetails} />
                    <Route path='/user-education/:id' exact component={UserEducation} />
                    <Route path='/edit-education/:id' exact component={EditEducation} />
                    <Route path='/change-password/:id' exact component={ChangePassword} />
                    <Route path='/:id' exct component={LoggedInScreen} />
                    <Route path='/' exact component={HomePage} />
                </Switch>

            </div>
        )
    }
}
export default MainRouter