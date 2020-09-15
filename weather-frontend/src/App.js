import React from 'react'
import SignIn from './components/SignIn'
import DashBoard from './components/DashBoard'
import { Route, Switch } from 'react-router-dom'

const App = () => {

    return(
        <div>
            <Switch>
                <Route path='/dashboard'>
                    <DashBoard/>
                </Route>
                <Route path='/'>
                    <SignIn/>
                </Route>
            </Switch>
        </div>
    )
}

export default App;
