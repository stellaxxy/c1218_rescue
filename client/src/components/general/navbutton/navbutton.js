import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    if(props.hasOwnProperty('className')){
        var classValues = props.className;
    }
    const propsArray = Object.values(props);

    const navButtons = propsArray.map(item => {
        if(typeof item === 'object'){
            return <Link key={Object.values(item)[0]} className={classValues} to={Object.values(item)[0]}>{Object.keys(item)[0]}</Link>
        }
    });

    return(
        <Fragment>
            {navButtons}
        </Fragment>
    );
}