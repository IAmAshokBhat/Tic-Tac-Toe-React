 import _ from 'lodash';
 import React, { Component }  from 'react';
 import ReactDOM from 'react-dom';
 import Game from './components/game'; 

class App extends Component {
    constructor(props){
        super(props);      
    };
  
    render(){
      
        return(<div>
            <h1>Tic Tac Toe</h1>
            <Game />
        </div>);
    }
    
}
ReactDOM.render(<App />,document.querySelector('.container'));