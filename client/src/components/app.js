import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import React from 'react';
import List from './list';
import Map from './map';
import Upload from './upload';
import Resource from './resource';
import Landing from './landing';
import Nav from './nav';
import {Route} from 'react-router-dom';

const App = () => (
    <div>
        <Nav/>
        <div className="container">
            <Route exact path="/" component={Landing}/>
            <Route path="/list" component={List}/>
            <Route path="/map" component={Map}/>
            <Route path="/upload" component={Upload}/>
            <Route path="/resource" component={Resource}/>
        </div>
    </div>
);

export default App;