import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import React from 'react';
import CaseList from './caselist';
import CaseMap from './casemap';
import Upload from './upload';
import Resource from './resource';
import Landing from './landing';
import DisplayList from './displaylist';
import Nav from './nav';
import {Route} from 'react-router-dom';


const App = () => (
    <div>
        <Nav/>
        <div className="container">
            <Route exact path="/" component={Landing}/>
            <Route path="/caselist" component={CaseList}/>
            <Route path="/casemap" component={CaseMap}/>
            <Route path="/upload" component={Upload}/>
            <Route path="/resource" component={Resource}/>


        </div>
    </div>
);

export default App;