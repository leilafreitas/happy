import {BrowserRouter,Switch,Route} from 'react-router-dom';
import React from 'react';
import landing from './components/landing';
import OrphanageMap from './components/OrphanageMap';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
            <Route path="/" exact component={landing}/>
            <Route path="/map" component={OrphanageMap}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;