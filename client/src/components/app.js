import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React from 'react';
import SearchPage from './case-search';
import SearchForm from './case-search/searchform';
import DescribeForm from './case-description';
import CaseDetails from './caseDetails';
import CaseMap from './casemap';
import Upload from './case-upload';
import UploadConfirmation from './case-upload/upload_confirmation';
import Landing from './landing';
import Contact from './contactpage';
import SearchVet from './resource/searchVet';
import DogCare from './resource/dogcare';
import CatCare from './resource/catcare';
import MainNav from './nav';
import {Route, Switch} from 'react-router-dom';
import OfficeInfo from "./resource/vetofficeinfo";
import MyCase from "./mycase";
import CloseCase from "./cases/case-confirmation";
import Flyer from "./case-upload/flyer";
import UpdateSuccess from "./update-modal/update_success";
import Error404 from "./general/error_404";



const App = () => (
    <div className="mainContainer">
        <MainNav/>

        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/search" component={SearchPage}/>
            <Route path="/searchform" component={SearchForm}/>
            <Route path="/casemap" component={CaseMap}/>
            <Route path="/upload" component={Upload}/>
            <Route path="/upload-complete/:caseid/:casekey" component={UploadConfirmation}/>
            <Route path="/casedetails" component={CaseDetails}/>
            <Route path="/dogcare" component={DogCare}/>
            <Route path="/catcare" component={CatCare}/>
            <Route path="/contactPage" component={Contact}/>
            <Route path="/searchvet" component={SearchVet}/>
            <Route path="/vetoffice" component={OfficeInfo}/>
            <Route path="/updatesuccessful/:caseid" component={UpdateSuccess}/>
            <Route path="/mycase/:caseid?" component={MyCase}/>
            <Route path="/closecase" component={CloseCase}/>
            <Route path="/flyer" component={Flyer}/>
            <Route path="/casedescription" component={DescribeForm}/>


            <Route component={Error404}/>
        </Switch>
    </div>
);

export default App;
//<Route path="/searchmodal" component={SearchModal}/>
//<Route path="/resource" component={Resource}/>
//<Route path="/searchvet" component={SearchVet}/>