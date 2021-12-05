




const createGameBoard = (function() {


	function createRow(rowCoord) {

		let row = document.createElement('div');
		row.className = 'row';
		row.id = 'row-' + rowCoord;

		for (j=0; j<3; j++) {  //create 3 square in each row
			row.appendChild( createSquare(rowCoord, j) )    // creates square at coordinates
		}
		
		return row;
	}

	function createSquare(row, col) {

		let square = document.createElement('div');
		square.className = 'square';
		square.id = row+'-'+col; //coordinates
		square.setAttribute('data-row', row);
		square.setAttribute('data-col', col);
		square.addEventListener('click', function() {

			currentPlayer.placeMark(this)

		});

		return square;
		
	}


	//Finally, create 3 rows:
	for (i=0; i<3; i++) {
		document.getElementById('gameboard').appendChild(createRow(i))
	}

	//Good: Can't create rows or squares outsite of this module, because they are private methods.

})();







const Player = (mark, myTurn) => {

	const placeMark = (whichSquare) => {

		turnsTaken++;

		if (whichSquare.innerHTML == '') {

			whichSquare.innerHTML = mark;

			if (currentPlayer == playerOne) {
				currentPlayer = playerTwo;
			}
			else {currentPlayer = playerOne}
		}



		// update the matrix:

		var row = whichSquare.getAttribute('data-row')
		var col = whichSquare.getAttribute('data-col')

		board.boardMatrix[row][col] = mark;

		checkWin(mark);


	}

	const checkWin = (mark) => {

		const win = () => {
			alert(mark + " wins!")
		}

		const gameOver = () => {
			alert("Game over.  You're both losers!")
		}

		var [row1, row2, row3] = board.boardMatrix;  //create 3 separate variables for rows

		//horizontal 3-in-a-row:

		if (board.boardMatrix[0][0] == mark &&
			  board.boardMatrix[0][1] == mark &&
			  board.boardMatrix[0][2] == mark) {
			win(); 
			return;
		}

		
		else if (board.boardMatrix[1][0] == mark &&
			  board.boardMatrix[1][1] == mark &&
			  board.boardMatrix[1][2] == mark) {
			win(); 
			return;
		}

		else if (board.boardMatrix[2][0] == mark &&
			  board.boardMatrix[2][1] == mark &&
			  board.boardMatrix[2][2] == mark) {
			win(); 
			return;
		}



		//vertical 3-in-a-row:
		
		else if (board.boardMatrix[0][0] == mark &&
			  board.boardMatrix[1][0] == mark &&
			  board.boardMatrix[2][0] == mark) {
			win(); 
			return;
		}

		else if (board.boardMatrix[0][1] == mark &&
			  board.boardMatrix[1][1] == mark &&
			  board.boardMatrix[2][1] == mark) {
			win(); 
			return;
		}

		else if (board.boardMatrix[0][2] == mark &&
			  board.boardMatrix[1][2] == mark &&
			  board.boardMatrix[2][2] == mark) {
			win(); 
			return;
		}



		//diagonals:

		else if (board.boardMatrix[0][0] == mark &&
			  board.boardMatrix[1][1] == mark &&
			  board.boardMatrix[2][2] == mark) {
			win(); 
			return;
		}

		else if (board.boardMatrix[0][2] == mark &&
			  board.boardMatrix[1][1] == mark &&
			  board.boardMatrix[2][0] == mark) {
			win(); 
			return;
		}

		else {
			if (turnsTaken == 9) {
				gameOver();
			}
		};


	}
//////////////____________________

	return {placeMark}

}



function MakeGameBoard() {

	this.boardMatrix = [

		['','',''],
		['','',''],
		['','','']

	];

}

const board = new MakeGameBoard();

var turnsTaken = 0;



// DEFAULTS:
const playerOne = Player("X", true);
const playerTwo = Player("O", false);
var currentPlayer = playerOne;





















