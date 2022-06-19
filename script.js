window.onload=()=>{

    //selecting the html elements which will be updated using javascript
    const gameGrid=document.querySelector("#game-grid");
    const scoreBoard=document.querySelector("#score-board");
    const newGameButton=document.querySelector("#new-game-button");
    const tryAgainButton=document.querySelector("#game-over-button");
    const failboard=document.querySelector("#failboard");

    /*declaring relevant variables
      1. an array which will serve as our game grid
      2. the total sum of the values in this array to use as score
      3. another array to store the previous game grid state (more on this later)
      4. setting a logic value to false at the start of the game (more on this later) */
    let arrayRows=[0, 0, 0, 0,
                   0, 0, 0, 0,
                   0, 0, 0, 0, 
                   0, 0, 0, 0];
    let sumArray;
    let previousArray=[];
    let moveWasntValid = false;

    //first there's a spawn function to create new tiles
    function spawn(){

        //this is a real janky variable being declared so its possible
        //to avoid an infinite loop scenario if it does happen
        //(better code would also avoid it but who's counting right?)
        let handBrake=0;

        /*here that same variable which was set to false at the start is used
          it's purpose is to check if we will spawn a new tile or not

          for instance, imagine a scenario where all tiles are on the right side of the board
          if the player keeps pressing right nothing will happen, they will have to move the tiles
          to another direction to continue playing

          this happens fairly often, and the way the game works it only spawns a new tile
          whenever something happens in a move, or in other words when a movement was valid */
        if(moveWasntValid == false){

            /*here two random values are created 
              one to select a random tile, and another to set a percentage chance */
            let randomValue = Math.floor(Math.random() * 15);
            let randomPercentage = Math.floor(Math.random() * 100);

            /*here it's checked if the random tile is already ocupied by another value or not,
              if it's not empty, another random value is generated until an empty tile is found */
            while(arrayRows[randomValue]!==0){
                randomValue = Math.floor(Math.random() * 15);

                handBrake++;
                if(handBrake>300){
                    break;
                }
            }

            if(handBrake>300){
                return;
            }

            //afterwards the random percentage variable is used, every new tile is either a 2 or a 4
            //but a 4 only spawns 10% of the time
            if(randomPercentage>=90){
                arrayRows[randomValue]=4;
            } else {
                arrayRows[randomValue]=2;
            }

        }    
    }
    //the function is called twice to set the initial game board with two tiles in random positions
    spawn();
    spawn();

    //this function makes a copy of the current state of the board, it will be relevant to check the previous
    //move the player did and if anything changed at all so the spawn function knows whether it can create a new tile or not
    function oldArray(){
        previousArray=arrayRows.slice();
    }

    //this function is used to move the tiles on the direction of the key the player pressed which it receives as an argument
    function push(direction){
        
        //initally some counting variables are set and once again the previous move variable starts as false
        x=0;
        y=0;
        moveWasntValid = false;

        //here is a switch statment which uses the function's argument, which was the key pressed
        //this is used to handle each transformation of the board, right, left, down, up
        switch(direction){

            /*what each case is doing is checking each row in the case of right and left
              or each column in the case of down and up
              
              this is accomplished by looping through the array 4 times since there are 4 of each
              
              the y value is used to keep track of the indexes of each row or column
              note that for rows the indexes are y, y+1, y+2 and y+4
              and for columns the indexes are y, y+4, y+8, y+12
              
              this makes sense since the game board array has the following indexes
              
                                        0  1  2  3
                                        4  5  6  7
                                        8  9  10 11
                                        12 13 14 15
              
              first, the if statement checks if all values in a given row or column are 0
              or in other words if it's empty, then if it's not another loop is done to shift
              all values to the desired direction */
            case "right":
                while(x<4){
                    if ( !(arrayRows[y]==0 && arrayRows[y+1]==0 && arrayRows[y+2]==0 && arrayRows[y+3]==0) ){       
                        for (let i=0; i<4; i++){
                            if (arrayRows[y+3] == 0){
                                arrayRows[y+3]=arrayRows[y+2];
                                arrayRows[y+2]=arrayRows[y+1];
                                arrayRows[y+1]=arrayRows[y];
                                arrayRows[y]=0;
                            } else if (arrayRows[y+2] == 0){
                                arrayRows[y+2]=arrayRows[y+1];
                                arrayRows[y+1]=arrayRows[y];
                                arrayRows[y]=0;
                            } else if (arrayRows[y+1] == 0){
                                arrayRows[y+1]=arrayRows[y];
                                arrayRows[y]=0;
                            }        
                        }   
                    }   
                y+=4; 
                x++;
                }
            break;

            case "left":
                while(x<4){
                    if ( !(arrayRows[y]==0 && arrayRows[y+1]==0 && arrayRows[y+2]==0 && arrayRows[y+3]==0) ){
                        for (let i=0; i<4; i++){
                            if (arrayRows[y] == 0){
                                arrayRows[y]=arrayRows[y+1];
                                arrayRows[y+1]=arrayRows[y+2];
                                arrayRows[y+2]=arrayRows[y+3];
                                arrayRows[y+3]=0;
                            } else if (arrayRows[y+1] == 0){
                                arrayRows[y+1]=arrayRows[y+2];
                                arrayRows[y+2]=arrayRows[y+3];
                                arrayRows[y+3]=0;
                            } else if (arrayRows[y+2] == 0){
                                arrayRows[y+2]=arrayRows[y+3];
                                arrayRows[y+3]=0;
                            }
                        }   
                    }
                y+=4; 
                x++;
                }
            break;

            case "down":
                while(x<4){
                    if ( !(arrayRows[y]==0 && arrayRows[y+4]==0 && arrayRows[y+8]==0 && arrayRows[y+12]==0) ){
                        for (let i=0; i<4; i++){
                            if (arrayRows[y+12] == 0){
                                arrayRows[y+12]=arrayRows[y+8];
                                arrayRows[y+8]=arrayRows[y+4];
                                arrayRows[y+4]=arrayRows[y];
                                arrayRows[y]=0;
                            } else if (arrayRows[y+8] == 0){
                                arrayRows[y+8]=arrayRows[y+4];
                                arrayRows[y+4]=arrayRows[y];
                                arrayRows[y]=0;
                            } else if (arrayRows[y+4] == 0){
                                arrayRows[y+4]=arrayRows[y];
                                arrayRows[y]=0;
                            }
                        }
                    }
                y++; 
                x++;
                }
            break;

            case "up":
                while(x<4){
                    if ( !(arrayRows[y]==0 && arrayRows[y+4]==0 && arrayRows[y+8]==0 && arrayRows[y+12]==0) ){
                        for (let i=0; i<4; i++){
                            if (arrayRows[y] == 0){
                                arrayRows[y]=arrayRows[y+4];
                                arrayRows[y+4]=arrayRows[y+8];
                                arrayRows[y+8]=arrayRows[y+12];
                                arrayRows[y+12]=0;
                            } else if (arrayRows[y+4] == 0){
                                arrayRows[y+4]=arrayRows[y+8];
                                arrayRows[y+8]=arrayRows[y+12];
                                arrayRows[y+12]=0;
                            } else if (arrayRows[y+8] == 0){
                                arrayRows[y+8]=arrayRows[y+12];
                                arrayRows[y+12]=0;
                            }
                        }
                    }
                y++; 
                x++;
                }
            break;
        }

        /*finally a check is done if anything changed at all from the previous move by comparing
          the current array to the copy which was created earlier, comparing arrays is a bit tricky
          so JSON.stringify is quite handy in this scenario
          if nothing changed we set the boolean variable to true and thus no new tile will spawn
          until an actual valid move is made */
        if(JSON.stringify(previousArray)==JSON.stringify(arrayRows)){
            moveWasntValid = true;
        }

    }

    //this function is very similar to the previous one, however it loops trhough the rows and columns
    //to add the equal values up and accomplish the effect of merging the tiles which is the objective of the game
    function add(direction){
        
        x=0;
        y=0;
        
        switch(direction){
            case "right":
                while(x<4){
                    if ( !(arrayRows[y]==0 && arrayRows[y+1]==0 && arrayRows[y+2]==0 && arrayRows[y+3]==0) ){
                        if(arrayRows[y+3] == arrayRows[y+2]){
                            arrayRows[y+3]=arrayRows[y+3]*2;
                            arrayRows[y+2]=0;
                        } else if(arrayRows[y+2] == arrayRows[y+1]){
                            arrayRows[y+2]=arrayRows[y+2]*2;
                            arrayRows[y+1]=0;
                        } else if(arrayRows[y+1] == arrayRows[y]){
                            arrayRows[y+1]=arrayRows[y+1]*2;
                            arrayRows[y]=0;
                        }
                    }
                y+=4; 
                x++;
                }
            break;

            case "left":
                while(x<4){
                    if ( !(arrayRows[y]==0 && arrayRows[y+1]==0 && arrayRows[y+2]==0 && arrayRows[y+3]==0) ){
                        if(arrayRows[y] == arrayRows[y+1]){
                            arrayRows[y]=arrayRows[y]*2;
                            arrayRows[y+1]=0;
                        } else if(arrayRows[y+1] == arrayRows[y+2]){
                            arrayRows[y+1]=arrayRows[y+1]*2;
                            arrayRows[y+2]=0;
                        } else if(arrayRows[y+2] == arrayRows[y+3]){
                            arrayRows[y+2]=arrayRows[y+2]*2;
                            arrayRows[y+3]=0;
                        }
                    }
                y+=4; 
                x++;
                }
            break;

            case "down":
                while(x<4){
                    if ( !(arrayRows[y]==0 && arrayRows[y+4]==0 && arrayRows[y+8]==0 && arrayRows[y+12]==0) ){
                        if(arrayRows[y+12] == arrayRows[y+8]){
                            arrayRows[y+12]=arrayRows[y+12]*2;
                            arrayRows[y+8]=0;
                        } else if(arrayRows[y+8] == arrayRows[y+4]){
                            arrayRows[y+8]=arrayRows[y+8]*2;
                            arrayRows[y+4]=0;
                        } else if(arrayRows[y+4] == arrayRows[y]){
                            arrayRows[y+4]=arrayRows[y+4]*2;
                            arrayRows[y]=0;
                        }
                    }
                y++; 
                x++;
                }
            break;

            case "up":
                while(x<4){
                    if ( !(arrayRows[y]==0 && arrayRows[y+4]==0 && arrayRows[y+8]==0 && arrayRows[y+12]==0) ){
                        if(arrayRows[y] == arrayRows[y+4]){
                            arrayRows[y]=arrayRows[y]*2;
                            arrayRows[y+4]=0;
                        } else if(arrayRows[y+4] == arrayRows[y+8]){
                            arrayRows[y+4]=arrayRows[y+4]*2;
                            arrayRows[y+8]=0;
                        } else if(arrayRows[y+8] == arrayRows[y+12]){
                            arrayRows[y+8]=arrayRows[y+8]*2;
                            arrayRows[y+12]=0;
                        }
                    }
                y++; 
                x++;
                }
            break;
        }
    }

    //this is the controller function for the game, which calls other
    //functions and handles updating the current state of the game board
    //it also has a bunch of console.log calls because that's where the game
    //was initially developed, check the console out to see how it looks!
    function controllCall(direction){

        console.clear();

        console.log("#######################################################");

        /*the basic game loop is:
          1. store the previous move as the oldarray to check if a new tile will spawn or not later
          2. push all the tiles to the direction pressed by the player
          3. merge the tiles of equal value which came in contact with one another
          4. push all the tiles again to avoid gaps
          5. spawn a new tile if the current move was valid
          6. update the game board for the player
          7. check for a failure state (game over) */
        oldArray();
        push(direction);
        add(direction);
        push(direction);

        spawn();

        displayOnGrid();

        gameOverCheck();

        console.log(`${arrayRows[0]}, ${arrayRows[1]}, ${arrayRows[2]}, ${arrayRows[3]},`)
        console.log(`${arrayRows[4]}, ${arrayRows[5]}, ${arrayRows[6]}, ${arrayRows[7]},`)
        console.log(`${arrayRows[8]}, ${arrayRows[9]}, ${arrayRows[10]}, ${arrayRows[11]},`)
        console.log(`${arrayRows[12]}, ${arrayRows[13]}, ${arrayRows[14]}, ${arrayRows[15]},`)

        console.log("#######################################################");

    }

    //this function handles all the visual components of the game
    function displayOnGrid(){
        
        //the current score is tallied and displayed on its proper html element
        sumArray = arrayRows.reduce((partialSum, a) => partialSum + a, 0);
        scoreBoard.textContent = sumArray;
        
        //the previous grid is wiped out so the current tiles can be drawn
        gameGrid.innerHTML = '';  
        
        //each value of the game board array gets assigned a tile with its html and css properties
        arrayRows.forEach(element => {
            const cellElement = document.createElement('div');
            if(element > 0){
                cellElement.textContent = element;
                cellElement.classList.add("cell");
            }

            //this massive switch statement asigns a different color for each tile value
            //all the way up to 2048, tiles with higher values will all have the same
            //"high number" color
            switch(true){
                case (element==2):
                    cellElement.classList.add("twocolor");
                break;

                case (element==4):
                    cellElement.classList.add("fourcolor");
                break;

                case (element==8):
                    cellElement.classList.add("eightcolor");
                break;

                case (element==16):
                    cellElement.classList.add("sixteencolor");
                break;

                case (element==32):
                    cellElement.classList.add("thirtytwocolor");
                break;

                case (element==64):
                    cellElement.classList.add("sixtyfourcolor");
                break;

                case (element==128):
                    cellElement.classList.add("onetwentyeightcolor");
                break;

                case (element==256):
                    cellElement.classList.add("twofiftysixcolor");
                break;

                case (element==512):
                    cellElement.classList.add("fivetwelvecolor");
                break;

                case (element==1024):
                    cellElement.classList.add("thousandcolor");
                break;

                case (element==2048):
                    cellElement.classList.add("twofortyeightcolor");
                break;

                case (element>2048):
                    cellElement.classList.add("highnumbercolor");
                break;
            }

            gameGrid.appendChild(cellElement);
        })
    }
    //this is the initial function call to display the game as it starts
    displayOnGrid();

    //this checks which key was pressed by the player and then proceeds
    //to make the corresponding controll call to handle the game logic
    window.addEventListener('keydown', e => {

        switch(e.key){
            case 'ArrowUp':
                controllCall('up');
                break;
            case 'ArrowDown':
                controllCall('down');
                break;
            case 'ArrowLeft':
                controllCall('left');
                break;
            case 'ArrowRight':
                controllCall('right');
                break;
        }    
        
    })

    //these two events handle the buttons which reset the game board to its initial state
    newGameButton.addEventListener('click', ()=>{
        failboard.classList.add("display-none");
        moveWasntValid = false;
        arrayRows=[0, 0, 0, 0,
                   0, 0, 0, 0, 
                   0, 0, 0, 0, 
                   0, 0, 0, 0];
        spawn();
        spawn();
        displayOnGrid();
    })

    tryAgainButton.addEventListener('click', ()=>{
        failboard.classList.add("display-none");
        moveWasntValid = false;  
        arrayRows=[0, 0, 0, 0, 
                   0, 0, 0, 0, 
                   0, 0, 0, 0, 
                   0, 0, 0, 0];
        spawn();
        spawn();
        displayOnGrid();
    })


    //this function handles the game's failure state
    function gameOverCheck(){

        let failureCounter=0;

        //a variable is created to go through the array and check
        //if every single tile on the board is filled
        for(let loopCounter=0; loopCounter<=15; loopCounter++){
            if (arrayRows[loopCounter]!==0){
                failureCounter++;
            }
        }

        //if all the tiles are filled a stricter check is done
        //to analyse if there are no more moves left and display the failure screen
        if(failureCounter==16){
            if(!doomCounter()){
                failboard.classList.remove("display-none");
            }
        }
    }

    /*this function handles the stricter check for the possible moves left if all tiles
      in the game board are filled

      it's essentially a copy of the add function with a few minor tweaks, it doesn't actually
      add up any values without the player's input, it just spits out a boolean value of true
      if it managed to find such a condition

      in other words it checks if there are valid moves left or if the game is over */
    function doomCounter(){

        x=0;
        y=0;

        let validMoveStillPossible = false;

        while(x<4){
            if ( !(arrayRows[y]==0 && arrayRows[y+1]==0 && arrayRows[y+2]==0 && arrayRows[y+3]==0) ){
                if(arrayRows[y+3] == arrayRows[y+2]){
                    validMoveStillPossible = true;
                } else if(arrayRows[y+2] == arrayRows[y+1]){
                    validMoveStillPossible = true;
                } else if(arrayRows[y+1] == arrayRows[y]){
                    validMoveStillPossible = true;
                }
            }
        y+=4; 
        x++;
        }

        x=0;
        y=0;

        while(x<4){
            if ( !(arrayRows[y]==0 && arrayRows[y+1]==0 && arrayRows[y+2]==0 && arrayRows[y+3]==0) ){
                if(arrayRows[y] == arrayRows[y+1]){
                    validMoveStillPossible = true;
                } else if(arrayRows[y+1] == arrayRows[y+2]){
                    validMoveStillPossible = true;
                } else if(arrayRows[y+2] == arrayRows[y+3]){
                    validMoveStillPossible = true;
                }
            }
        y+=4; 
        x++;
        }

        x=0;
        y=0;

        while(x<4){
            if ( !(arrayRows[y]==0 && arrayRows[y+4]==0 && arrayRows[y+8]==0 && arrayRows[y+12]==0) ){
                if(arrayRows[y+12] == arrayRows[y+8]){
                    validMoveStillPossible = true;
                } else if(arrayRows[y+8] == arrayRows[y+4]){
                    validMoveStillPossible = true;
                } else if(arrayRows[y+4] == arrayRows[y]){
                    validMoveStillPossible = true;
                }
            }
        y++; 
        x++;
        }

        x=0;
        y=0;

        while(x<4){
            if ( !(arrayRows[y]==0 && arrayRows[y+4]==0 && arrayRows[y+8]==0 && arrayRows[y+12]==0) ){
                if(arrayRows[y] == arrayRows[y+4]){
                    validMoveStillPossible = true;
                } else if(arrayRows[y+4] == arrayRows[y+8]){
                    validMoveStillPossible = true;
                } else if(arrayRows[y+8] == arrayRows[y+12]){
                    validMoveStillPossible = true;
                }
            }
        y++; 
        x++;
        }
        
        return validMoveStillPossible;
    }

}