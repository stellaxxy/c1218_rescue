import React, {Component} from 'react';
 import axios from 'axios';


 class DisplayList extends Component{

     async componenetDidMount(){
         const resp = await axios.get('localhost:9000/api/createcase');

         console.log('response:', resp);

     }

     render(){

         return (

             <h1> 'this is test component'</h1>
         );


     }


 }
export default DisplayList;
