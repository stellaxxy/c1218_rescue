import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

const App = () => (
    <Router>
        <div>
            <h1 className="center">Pet Rescue</h1>
        </div>
    </Router>
);

export default App;