/*
mport React, {Component} from 'react';
import Modal from 'react-responsive-modal';


class SearchModal extends Component {

    state = {
        open: false
    };


    openModal=()=>{
        this.setState({
            open:true
        })

}

closeModal=()=>{
        this.setState({
            open:false
        })
}

    render() {

        return (
            <div>
                <button onClick={this.openModal}>Search</button>
                <Modal open="open" onClick={this.closeModal} center>
                    <div className= "horizontal">
                        <input  type="text"/>
                        <input  type="text"/>
                    </div>
                    <div className="horizontal">
                        <input  type="text"/>
                        <input  type="text"/>
                    </div>
                </Modal>
            </div>
        )


    }
}

export default SearchModal;
*/