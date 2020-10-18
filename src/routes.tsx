import {BrowserRouter,Switch,Route} from 'react-router-dom';
import React from 'react';
import landing from './components/landing';
import OrphanageMap from './components/OrphanageMap';
import Orphan from './components/Orphanage';
import Create from './components/CreateOrphanage';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
            <Route path="/" exact component={landing}/>
            <Route path="/map" component={OrphanageMap}/>
            <Route path="/orphanages/create" component={Create}/>
            <Route path="/orphanages/:id" component={Orphan}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;