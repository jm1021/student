class TicTacToe {
    // mode: 'ai' or 'local'
    constructor(mode = 'ai') {
        this.currentPlayer = 'X';
        this.board = Array(9).fill('');
        this.gameActive = true;
        this.aiPlayer = 'O';
        this.humanPlayer = 'X';
        this.mode = mode; // 'ai' or 'local'
    }

    setMode(mode) {
        this.mode = mode;
        this.reset();
    }

    isCurrentPlayerAI() {
        return this.mode === 'ai' && this.currentPlayer === this.aiPlayer;
    }

    makeMove(position) {
        if (!this.gameActive || this.board[position] !== '') return false;

        this.board[position] = this.currentPlayer;
        if (this.checkWinner()) {
            this.gameActive = false;
            return true;
        }

        if (this.checkDraw()) {
            this.gameActive = false;
            return true;
        }

        // Switch player for next turn
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        return true;
    }

    aiMove() {
        if (!this.gameActive) return;

        // Try to win
        const winMove = this.findBestMove(this.aiPlayer);
        if (winMove !== -1) {
            this.makeMove(winMove);
            return;
        }

        // Try to block player
        const blockMove = this.findBestMove(this.humanPlayer);
        if (blockMove !== -1) {
            this.makeMove(blockMove);
            return;
        }

        // Take center if available
        if (this.board[4] === '') {
            this.makeMove(4);
            return;
        }

        // Take any corner
        const corners = [0, 2, 6, 8];
        for (let corner of corners) {
            if (this.board[corner] === '') {
                this.makeMove(corner);
                return;
            }
        }

        // Take any available space
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.makeMove(i);
                return;
            }
        }
    }
    // flag{ticTacToe123!}
    findBestMove(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const line = [this.board[a], this.board[b], this.board[c]];
            const playerCount = line.filter(cell => cell === player).length;
            const emptyCount = line.filter(cell => cell === '').length;
            
            if (playerCount === 2 && emptyCount === 1) {
                const emptyIndex = pattern[line.indexOf('')];
                return emptyIndex;
            }
        }
        return -1;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    checkDraw() {
        return !this.board.includes('');
    }

    reset() {
        this.currentPlayer = 'X';
        this.board = Array(9).fill('');
        this.gameActive = true;
    }
}