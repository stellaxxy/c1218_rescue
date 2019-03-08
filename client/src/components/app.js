import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React from 'react';
import SearchPage from './case-search';
import SearchForm from './case-search/searchform';
import CaseDetails from './caseDetails';
import CaseMap from './casemap';
import Upload from './case-upload';
import UploadConfirmation from './case-upload/upload_confirmation';
import Resource from './resource';
import Landing from './landing';
import TypeSelection from './case-description/typeselection';
import SizeSelection from './case-description/sizeselection';
import Contact from './contactpage';
//import SearchModal from './searchmodal';
import SearchVet from './resource/searchVet';
import DogCare from './resource/dogcare';
import CatCare from './resource/catcare';
import MainNav from './nav';
import {Route} from 'react-router-dom';
import SearchPet from "./serachpet";
import OfficeInfo from "./resource/vetofficeinfo";
import MyCase from "./mycase";


const App = () => (
    <div>
        <MainNav/>
        <Route exact path="/" component={Landing}/>
        <Route path="/search" component={SearchPage}/>
        <Route path="/searchform" component={SearchForm}/>
        <Route path="/casemap" component={CaseMap}/>
        <Route path="/upload" component={Upload}/>
        <Route path="/upload-complete/:caseid/:casekey" component={UploadConfirmation}/>
        <Route path="/resource" component={Resource}/>
        <Route path="/searchpet" component={SearchPet}/>
        <Route path="/typeselection" component={TypeSelection}/>
        <Route path="/sizeselection" component={SizeSelection}/>
        <Route path="/casedetails/:caseid" component={CaseDetails}/>
        <Route path="/dogcare" component={DogCare}/>
        <Route path="/catcare" component={CatCare}/>
        <Route path="/contactPage" component={Contact}/>
        <Route path="/searchvet" component={SearchVet}/>
        <Route path="/vetoffice" component={OfficeInfo}/>
        <Route path="/mycase" component={MyCase}/>

    </div>
);

export default App;
//<Route path="/searchmodal" component={SearchModal}/>