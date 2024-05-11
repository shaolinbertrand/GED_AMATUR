import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Inicial from './pages/inicial';
import Login from './pages/login';
import Log from './pages/log';
import pix from './pages/Tela PIX';
//import pix2 from './pages/Tela Pix2';
//import pix3 from './pages/tela pix 3';


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component ={Inicial}/>
                <Route path="/login" component={Login}/>
                <Route path='/log/:id/' component={Log}/>
                <Route path='/telapix' component={pix}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;