import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React from 'react';
import SelectCaseType from './case-upload/select_case_type';
import SearchPage from './case-search';
import SearchForm from './case-search/searchform';
import CaseDetails from './caseDetails';
import CaseMap from './casemap';
import Upload from './case-upload';
import UploadConfirmation from './case-upload/upload_confirmation';
//import Resource from './resourcepage';
import Landing from './landing';
import Contact from './contactpage';
//import SearchModal from './searchmodal';
import SearchVet from './resource/searchVet';
import DogCare from './resource/dogcare';
import CatCare from './resource/catcare';
import MainNav from './nav';
import {Route} from 'react-router-dom';
import OfficeInfo from "./resource/vetofficeinfo";
import MyCase from "./mycase";
import CloseCase from "./cases/case-confirmation";
import FlyerCode from "./case-upload/flyercode";


const App = () => (
    <div className="mainContainer">
        <MainNav/>
        <Route exact path="/" component={Landing}/>
        <Route path="/selectcasetype" component={SelectCaseType}/>
        <Route path="/search" component={SearchPage}/>
        <Route path="/searchform" component={SearchForm}/>
        <Route path="/casemap" component={CaseMap}/>
        <Route path="/upload" component={Upload}/>
        <Route path="/upload-complete/:caseid/:casekey" component={UploadConfirmation}/>
        <Route path="/casedetails" component={CaseDetails}/>
        <Route path="/dogcare" component={DogCare}/>
        <Route path="/catcare" component={CatCare}/>
        <Route path="/contactPage/:caseid" component={Contact}/>
        <Route path="/searchvet" component={SearchVet}/>
        <Route path="/vetoffice" component={OfficeInfo}/>
        <Route path="/mycase" component={MyCase}/>
        <Route path="/closecase" component={CloseCase}/>
        <Route path="/flyer/:caseid" component={FlyerCode}/>


    </div>
);

export default App;
//<Route path="/searchmodal" component={SearchModal}/>
//<Route path="/resource" component={Resource}/>
