import React, {Component} from 'react';


class Filter extends Component {
    render() {
        return (
            <div>
                <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4> Modal Header </h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default Filter