import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React from 'react';
import CaseList from './cases/caselist';
import CaseDetails from './caseDetails';
import CaseMap from './casemap';
import Upload from './upload';
import Resource from './resource';
import Landing from './landing';
import LostLanding from './lostlanding';
import FoundLanding from './foundlanding';
import TypeSelection from './typeselection';
import SizeSelection from './sizeselection';
import Contact from './contactpage';
import SearchModal from './searchmodal';
import SearchVet from './resource/searchVet';
import DogCare from './resource/dogcare';
import CatCare from './resource/catcare';
import Nav from './nav';
import {Route} from 'react-router-dom';
import SearchPet from "./serachpet";
import OfficeInfo from "./resource/vetofficeinfo";



const App = () => (
    <div>
        <Nav/>
        <Route exact path="/" component={Landing}/>
        <Route path="/caselist/:casetype" component={CaseList}/>
        <Route path="/casemap" component={CaseMap}/>
        <Route path="/upload" component={Upload}/>
        <Route path="/resource" component={Resource}/>
        <Route path="/searchpet" component={SearchPet}/>
        <Route path="/lostlanding" component={LostLanding}/>
        <Route path="/foundlanding" component={FoundLanding}/>
        <Route path="/typeselection" component={TypeSelection}/>
        <Route path="/sizeselection" component={SizeSelection}/>
        <Route path="/casedetails" component={CaseDetails}/>
        <Route path="/dogcare" component={DogCare}/>
        <Route path="/catcare" component={CatCare}/>
        <Route path="/contactPage" component={Contact}/>
        <Route path="/searchvet" component={SearchVet}/>
        <Route path="/vetoffice" component={OfficeInfo}/>
        <Route path="/searchmodal" component={SearchModal}/>
    </div>
);

export default App;