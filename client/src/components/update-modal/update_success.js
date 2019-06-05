import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './update_success.scss';
import dogDecor from '../../assets/images/dog4.gif';

let UpdateSuccess = (props) => {

    const id = props.match.params.caseid;
    console.log('id', id);
    return (
        <div className="updateContainer">
            <div>
                <img src={dogDecor} alt="dog"/>
            </div>
            <div className="updateSuccess">
                <h4>Successfully Updated</h4>
                <Link className="waves-effect waves-light btn btn-action" to={`/mycase/${id}`}>View My Case</Link>
            </div>
        </div>
        
    );
};

export default UpdateSuccess;
