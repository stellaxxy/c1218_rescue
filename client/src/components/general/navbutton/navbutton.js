import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    const propsArray = Object.values(props);
    const navButtons = propsArray.map(item => {
        return <Link key={Object.values(item)[0]} className="btn" to={Object.values(item)[0]}>{Object.keys(item)[0]}</Link>
    });

    return(
        <Fragment>
            {navButtons}
        </Fragment>
    );
}