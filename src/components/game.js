import React, { Component } from 'react';

export default class Game extends Component{
    constructor(props){
        super(props);    
        this.state = {
            matrix :[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
            player : 0,
            result : 'Player 0 will start',
            noOfMoves : 0,
            gameOver: false
        }   
    }
      
/*Check if there is line row wise */
checkRowWise(cRow){  
    for(let j=0;j<this.state.matrix[cRow].length;j++){
     if(this.state.matrix[cRow][j] !== this.state.player){
          return false;
      }
    }
    return true;  
  }

  /*Check if there is line column wise */
  checkColumnWise(cColumn){    
    for(var j=0;j<this.state.matrix[0].length;j++){
    if(this.state.matrix[j][cColumn] !== this.state.player){
            return false;
        }
        }
        return true;  
  }
  
  /*Check if there is line diagonally left to bottom  */
  checkDiagnolIncreasing(){
     for(var i=0,j=0;j<this.state.matrix[0].length;j++,i++){
      if(this.state.matrix[i][j] !== this.state.player){
           return false;
      }
    }
    return true;
  }

  /*Check if there is line diagonally right to bottom  */
  checkDiagnolDecreasing(){  
     for(var i=0,j=this.state.matrix[0].length-1;j>=0;j--,i++){
     if(this.state.matrix[i][j] !== this.state.player){
         return false;
      }
    }
    return true;
  }

    makeTurn(row,col){
        let checkRowFlag = false;
        let checkColumnFlag = false;
        let checkDiagnolIncreasingFlag = false;
        let checkDiagnolDecreasingFlag = false;      
        if(this.state.matrix[row][col] === -1){

            let changedMatrix = this.state.matrix;
            changedMatrix[row][col] = this.state.player;
            
            this.setState({ matrix: changedMatrix, noOfMoves: this.state.noOfMoves+1 });   
         
            checkRowFlag = this.checkRowWise(row);  
            checkColumnFlag = this.checkColumnWise(col); 
            
            if((row==col)){
                checkDiagnolIncreasingFlag = this.checkDiagnolIncreasing();  
            }
            
            if(((row==2 && col==0) || (row==1 && col==1) || (row==0 && col==2))){
                checkDiagnolDecreasingFlag = this.checkDiagnolDecreasing(); 
            }
            
            if(checkRowFlag || checkColumnFlag || checkDiagnolIncreasingFlag || checkDiagnolDecreasingFlag){
            
               this.setState({
                   player:0,
                   gameOver:true,
                   result: "Player " + this.state.player + " won!"});
               setTimeout(()=>{
                let resetMatrix =  [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
                this.setState({ 
                    matrix: resetMatrix,
                    result: "",
                    gameOver:false});    
               },5000);
               return;
            }
            console.log(this.state.noOfMoves)
            if(this.state.noOfMoves === 8){
                this.setState({
                    player:0, 
                    gameOver:true,
                    noOfMoves:0,
                    result:"Match Drawn!"});

                setTimeout(()=>{

                let resetMatrix =  [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
                this.setState({ 
                    matrix: resetMatrix,
                    result:'',
                    gameOver: false});                
                },5000);
                return;
            }
            let nextPlayer = (this.state.player == 0)?1:0;
            this.setState({
                player: nextPlayer,
                result :"Player " + nextPlayer + "'s turn" });
          
        }else{
            this.setState({
                result :"Place already taken!" });
        }
    }

    render(){
        return(
            <div className="game">
            <div className="board">
            <div className={(!this.state.gameOver)?'overlay hidden':'overlay'}></div>   
                {this.state.matrix.map((row,rindex) =>{
                    return(
                        <div className="b-row" key={rindex} >
                        {row.map((cell,cindex) =>{
                            return(
                                <div className="cell" key={cindex} onClick={this.makeTurn.bind(this,rindex,cindex)}>{(this.state.matrix[rindex][cindex] == -1)?'':(this.state.matrix[rindex][cindex] == 1)?'X':'O'}</div>
                            )                           
                        })}
                        </div>                      
                    )
                    
                })}              
            </div>
             <p className="result">{this.state.result}</p>
            </div>
        )
    }
}
 