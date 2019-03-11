import React, { Component } from 'react';
import exampleImage from "../../assets/images/cover1.jpg";

class CaseItem extends Component{

    state = {
        mobile: false
    };

    componentDidMount(){
        this.setState({
            mobile: window.innerWidth < 635
        });

        window.addEventListener('resize', ()=>{
            this.setState({
                mobile: window.innerWidth < 635
            })
        });


    }

    render(){
        const { caseType, location, id, coverImg, date, description } = this.props;

        const dateObj = new Date(date);
        const dateString = dateObj.toLocaleDateString();
        console.log(description);
        let prefixForAddress = null;
        //let prefixForDate = null;
        if(caseType === 'lost'){
            prefixForAddress = 'Last seen';
            //prefixForDate = 'Lost';
        } else {
            prefixForAddress = 'Found';
            //prefixForDate = 'Found';
        }

        return(

            <div className="card small horizontal">
                <div className="card-image">
                    <img className="responsive" src={coverImg}/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <div className="contentDiv">
                            <p>{prefixForAddress} in {location.city}, {location.state}</p>
                            <p>On: {dateString}</p>
                            <p className={this.state.mobile ? 'mobile':''}>Description: {description}</p>
                        </div>

                    </div>
                    <div className="card-action">
                        <a href={"/casedetails/"+id}>Details</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CaseItem;