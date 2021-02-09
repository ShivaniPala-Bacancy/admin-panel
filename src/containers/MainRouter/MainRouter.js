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

    state = {
        loggedIn:JSON.parse(localStorage.getItem("loggedInState")),
        loggedInId:JSON.parse(localStorage.getItem("loggedInId")),
    }
    loginStateChange = (login, id) => {
        this.setState({loggedIn:login, loggedInId:id});
    }

    render() {
        let nav;
        if(this.state.loggedIn){
            nav =(
            <nav className={styles.nav}>
                <NavigationItems loggedIn={true} loggedInId={this.state.loggedInId}/>
            </nav>
            )
        }
        else{
            nav=(
                <nav className={styles.nav}>
                    <NavigationItems loggedIn={false} loggedInId={this.state.loggedInId} />
                </nav>
            )
        }
        return (
            <div>
                {nav}
                <main>
                    {this.props.children}
                </main>
                <Switch>
                    <Route path="/login" render={() => <Login login={this.loginStateChange} />} />
                    <Route path="/register" component={Register} />
                    <Route path='/user-details/:id' exact component={UserDetails} />
                    <Route path='/user-education/:id' exact component={UserEducation} />
                    <Route path='/edit-education/:id' exact component={EditEducation} />
                    <Route path='/change-password/:id'  render={() => <ChangePassword login={this.loginStateChange} />} />
                    <Route path='/:id' render={() => <LoggedInScreen login={this.loginStateChange} />} />
                    <Route path='/' exact render={() => <HomePage login={this.loginStateChange} /> } />
                </Switch>

            </div>
        )
    }


}

export default MainRouter