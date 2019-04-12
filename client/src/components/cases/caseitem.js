import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import exampleImage from "../../assets/images/cover1.jpg";
import queryString from 'query-string';

class CaseItem extends Component{

    state = {
        mobile: window.innerWidth < 635
    };

    componentDidMount(){
        window.addEventListener('resize', ()=>{
            this.setState({
                mobile: window.innerWidth < 635
            })
        });


    }

    render(){
        const { caseType, location, id, coverImg, date, description, filterValues } = this.props;

        const query = queryString.stringify(filterValues);

        const dateObj = new Date(date);
        const dateString = dateObj.toLocaleDateString();

        let prefixForAddress = null;
        if(caseType === 'lost'){
            prefixForAddress = 'Last seen';
        } else {
            prefixForAddress = 'Found';
        }
        console.log('search url:', this.props.searchUrl);
//{pathname: `/flyer/${id}`, state: {searchUrl: this.props.searchUrl}}
        return(
            <div className="cardContainer">
                <Link to={`/flyer${this.props.searchUrl}&id=${id}`}>
                    <div className="card small horizontal">
                        <div className="card-image">
                            <img className="responsive" src={coverImg}/>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <div className="contentDiv" id='content'>
                                    <p>{prefixForAddress} in {location.city}, {location.state}</p>
                                    <p>On: {dateString}</p>
                                    <p className={this.state.mobile ? 'mobile':''}>Description: {description}</p>
                                </div>

                            </div>
                            <div className="card-action">
                                <div className="details">Details</div>
                                <div className={caseType === 'lost' ? "chip red" : "chip blue accent-1"}>{caseType}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default CaseItem;