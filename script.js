//Created on July 18 2023 and Lastly Updated on July 18 2023.
// In this Project, I've tried to implement the major parts inside modules.
// There are lots of code repeating and i tried to minimize everything as much as possible with my current knowledge.
//Everything accomplished in this project was completely done by me.



// GameBoard Module
let gameBoard=(function(){

    return {
        0:['','',''],
        1:['','',''],
        2:['','',''],
    }
})();



// GameMechanism Module
const gameMechanism=(function(){
    
    const mainContainer=document.querySelector('.main-container');
    const statusIndicator=document.querySelector('.status');

    const xWinCountDisplay=document.querySelector('.xWinCount');
    const oWinCountDisplay=document.querySelector('.oWinCount');
    const tieCountDisplay=document.querySelector('.tieCount');

    let xWinCount=1;
    let oWinCount=1;
    let tieCount=1;


    //Creating the divs..
    function creating(){
        for(let i=0;i<gameBoard[0].length;i++){
            for(let j=0;j<gameBoard[0].length;j++){ 
                let div=document.createElement('div');
                div.textContent=gameBoard[i][j];
                div.dataset.row=i;
                div.dataset.column=j;
                mainContainer.appendChild(div)
            }
        }
    }
     
    creating();

    const divs=document.querySelectorAll('[data-row]')

    //Displaying Divs.
    function display(value1,value2,marker){
        divs.forEach(div=>{
            if(div.dataset.row==value1 && div.dataset.column==value2){
                div.textContent=gameBoard[value1][value2]
                if(marker=='X'){
                    div.classList.add('x');
                }
            }   
        })
}
     
     
    // When Person's Turn
    function personTurn(row,column,person){
        person.setting(row,column)
        let status=gameLogic(row,column,person);
        if(status){
            gameOver(person)
        } 
        return status
    }
     
    // When Pc's Turn
    function pcTurn(row,column){
        let pcrow=row;
        let pccol=column;

        // Checking the adjacent sides are occupied are not.
        // Not clearly implemented this part.

        if((rowTurn()!=undefined && rowTurn()!=row)&&(gameBoard[rowTurn()][pccol]=='')){
            // if(gameBoard[rowTurn()][pccol]!='')random()
            pcStatus(rowTurn(),pccol)
        }else if((colTurn()!=undefined && colTurn()!=column)&&(gameBoard[pcrow][colTurn()]=='')){
            // if(gameBoard[pcrow][colTurn()]!='')random()
            pcStatus(pcrow,colTurn())
        }
        else if((positive45()!=undefined && positive45()!=row)&&(gameBoard[positive45()][2-positive45()]=='')){
            // if(gameBoard[positive45()][2-positive45()]!='')random()
            pcStatus(positive45(),2-positive45())
        }else if((negative45()!=undefined && negative45()!=column)&&(gameBoard[negative45()][negative45()]=='')){
            // if(gameBoard[negative45()][negative45()]!='')random()
            pcStatus(negative45(),negative45())
        }
        else{
            random()
        }
    
        // Checking row's Adjacent.
        function rowTurn(){
            for(let i=0;i<3;i++){
                if(i!=row){
                    if(gameBoard[row][column]==gameBoard[i][column]){
                        pcrow=3-(+row+i);
                        return pcrow
                    }
                }
            }
        }
    
        // Checking columns's Adjacent.
        function colTurn(){
            for(let i=0;i<3;i++){
                if(i!=column){
                    if(gameBoard[row][column]==gameBoard[row][i]){
                        pccol=3-(+column+i);
                        return pccol
                    }
                }
            }
        }
    
        // Checking -45deg's Adjacent.
        function negative45(){
            for(let i=0;i<3;i++){
                if(i!=column){
                    if(gameBoard[row][column]==gameBoard[i][i]){
                        pccol=3-(+column+i);
                        return pccol
                    }
                }
            }
        }

        // Checking 45deg's Adjacent.
        function positive45(){
            for(let i=0;i<3;i++){
                if(row!=column){
                    if(gameBoard[row][column]==gameBoard[i][2-i]){
                        pcrow=column;
                        return pcrow
                    }
                }
            }
        }
    
        // If Fails then Random Placement.
        function random(){
            let count=0
            let row=Math.floor(Math.random()*3);
            let column=Math.floor(Math.random()*3);
            while(gameBoard[row][column]!='' && count < 9){
                row=Math.floor(Math.random()*3);
                column=Math.floor(Math.random()*3);
                count++;
            }
           pcStatus(row,column)
        }
    
        //Placing and Checking the value.
        function pcStatus(row,column){
            pc.setting(row,column)
            let status=gameLogic(row,column,pc);
            if(status){
                gameOver(pc)
            }
        }
        
        
    }


    //  Game's Logic Fn
    function gameLogic(row,column,person){
    if(gameBoard[row][0]==gameBoard[row][1] && gameBoard[row][1]== gameBoard[row][2]){
        strikeFn(row,0,'horizontal');
        strikeFn(row,1,'horizontal');
        strikeFn(row,2,'horizontal');
        person.winStatus=true
    }
    else if(gameBoard[0][column]==gameBoard[1][column] && gameBoard[1][column]== gameBoard[2][column]){
        strikeFn(0,column,'vertical');
        strikeFn(1,column,'vertical');
        strikeFn(2,column,'vertical');
        person.winStatus=true
    }
    if(row==column){
        if((gameBoard[0][0] === gameBoard[1][1]) && (gameBoard[1][1] === gameBoard[2][2])){
            mainContainer.classList.add('negative45')
            person.winStatus=true
            return person.winStatus
        }
    }
    if(row==2-column){
        if(gameBoard[2][0]==gameBoard[1][1] && gameBoard[1][1]== gameBoard[0][2]){
            mainContainer.classList.add('positive45')
            person.winStatus=true
            return person.winStatus
        }
   }
   return person.winStatus;
}
    
    // StrikeLine Fn
    function strikeFn(row,column,value){
        divs.forEach(div=>{
            if(div.dataset.row==row && div.dataset.column==column){
                // div.classList.add('status')
                div.classList.add(value)
            }
        
            
        })
    }   
    
    //GameOver Fn
    function gameOver(person){
        statusIndicator.textContent=`${person.marker} won`
        if(person.marker=="X"){
            xWinCountDisplay.textContent=`${xWinCount} wins`
            xWinCount++;
        }else if(person.marker=="O"){
            oWinCountDisplay.textContent=`${oWinCount} wins`
            oWinCount++;
        }
}

    // Tie Fn
    function isTie(){
        for(let i=0;i<gameBoard[0].length;i++){
            for(let j=0;j<gameBoard[0].length;j++){ 
                if(gameBoard[i][j]==''){
                    return false
                }
            }
        }
        return true
    }

    //Restart Btn
    const restartBtn=document.querySelector('.restart');
    restartBtn.addEventListener('click',()=>{
        clear()
    })
    
    
    // Mode Toggle Button
    const modeToggleBtn=document.querySelector('.mode-toggle');
    modeToggleBtn.addEventListener('click',()=>{
        if(modeToggleBtn.textContent=='1 Player'){
            p2=Player('p2','O');  //If 2players then creating p2.
            modeToggleBtn.textContent='2 Player'
            clear()
            statusIndicator.textContent="Multi Player"

        }else if(modeToggleBtn.textContent=='2 Player'){
            p2='' //For 1player setting the p2 to empty string.
            modeToggleBtn.textContent='1 Player'
            clear()
            statusIndicator.textContent="Single Player"
        }
    })

    // Clearing Fn
    function clear(){
        for(let i=0;i<gameBoard[0].length;i++){
            for(let j=0;j<gameBoard[0].length;j++){ 
                gameBoard[i][j]='';
                display(i,j);
                p1.winStatus=false;
                pc.winStatus=false;
                p2.winStatus=false;
                divs.forEach(div=>{
                    div.classList.remove('x')
                    mainContainer.classList.remove('positive45')
                    mainContainer.classList.remove('negative45')
                    div.classList.remove('horizontal')
                    div.classList.remove('vertical')
                })
            }
        }
        if(modeToggleBtn.textContent=="1 Player") statusIndicator.textContent="Single Player";
        else statusIndicator.textContent="Multi Player"
    }

    // Returning necesarry properties.
    return{
    divs,
    display,
    personTurn,
    pcTurn,
    isTie,
    statusIndicator,
    tieCountDisplay,
    tieCount
    }
     
})()


//GameMode Module.
const gameMode=(function(){
    let turn=true;

    //Single Player Fn
    function singlePlayerMode(row,column){

        // Checking whether already occupied or not.
        if(p1.setting(row,column)=='X'){
            let isPersonWon=gameMechanism.personTurn(row,column,p1)
            if(!isPersonWon){
                setTimeout(()=>{
                    gameMechanism.pcTurn(row,column)
                },100)

            }

            //isTie.
            if(gameMechanism.isTie() &&  p1.winStatus==false){
                gameMechanism.statusIndicator.textContent='Draw'
                gameMechanism.tieCountDisplay.textContent=`${gameMechanism.tieCount} draws`
                gameMechanism.tieCount++;
            }
        }  
    }

    // Multiplayer Fn
    function multiPlayerMode(row,column){

        // For Giving Their Turn.
        if(turn){
            if(gameBoard[row][column]==''){
                gameMechanism.statusIndicator.textContent=`O turn `
                var isP1Won=gameMechanism.personTurn(row,column,p1);
                turn=false
            }
              
        }else{
            if(gameBoard[row][column]==''){
                gameMechanism.statusIndicator.textContent=`X turn `
                var isP2Won=gameMechanism.personTurn(row,column,p2)
                if(isP2Won)p1.winStatus=true;
                turn=true
            } 
        }

        // isTie ?
        if(gameMechanism.isTie() &&  !isP1Won && !isP2Won){
            gameMechanism.statusIndicator.textContent='Draw'
            gameMechanism.tieCount++;
            gameMechanism.tieCountDisplay.textContent=`${gameMechanism.tieCount} draws`
            gameMechanism.tieCount++;
        }
    }

    return{
        singlePlayerMode,
        multiPlayerMode
    }

})();
   
// Player Factory Fn
function Player(name,marker){
    function setting(ind1,ind2){
        if(gameBoard[ind1][ind2]==''){
            gameBoard[ind1][ind2]=this.marker;
            gameMechanism.display(ind1,ind2);
            return gameBoard[ind1][ind2]
        }
    }
    winStatus=false;  //Property checks whether the won or not.

   return{
    name,
    marker,
    setting,
    winStatus
   }
}

// Global

// Creating Instance.
const p1=Player('p1','X');
const pc=Player('Pc','O');
let p2=''; //Dummy player.



// Game Play..
gameMechanism.divs.forEach(div=>{
    div.addEventListener('click',(e)=>{
        let row=e.target.dataset.row;
        let column=e.target.dataset.column;
        if(p2!=''){
        if(p1.winStatus==false && p2.winStatus==false){ 
        gameMode.multiPlayerMode(row,column)
        }
        }
        
        if(p1.winStatus==false && pc.winStatus==false){
        gameMode.singlePlayerMode(row,column)
        }
            
    })
})
     
     
