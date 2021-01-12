import React, {Component} from 'react'
import { Route, Switch, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import HomePage from '../HomePage/HomePage'
import LoggedInScreen from '../../components/LoggedInScreen/LoggedInScreen'

class MainRouter extends Component{
    render(){      
        return(
            <div>
                <Switch>    
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />      
                    <Route path='/:id' component={LoggedInScreen} />  
                    <Route path='/' exact component={HomePage} />  
                </Switch>     
                
            </div>
        )
    }

    
}

export default MainRouter