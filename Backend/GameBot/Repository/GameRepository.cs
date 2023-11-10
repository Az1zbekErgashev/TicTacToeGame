using GameBot.Enitiy;
using Microsoft.EntityFrameworkCore;
namespace GameBot.Repository
{
    public class GameRepository : IGameRepository
    {
        private readonly AppDbContext.AppDbContext _context;
        public GameRepository(AppDbContext.AppDbContext context) => _context = context;
        public async Task<GameBoard> CreateGame(string player1Name, string player2Name)
        {
            var game = new GameBoard
            {
                BoardState = "---------",
                PlayerTurn = "X",
                Winner = null,
                Player1 = player1Name,
                Player2 = player2Name,
                WinningFieldIndex = null,
            };
            await _context.Games.AddAsync(game);
            await _context.SaveChangesAsync();
            return game;
        }
        public async Task<GameBoard> GetGame(int gameId)
        {
            var game = await _context.Games.FindAsync(gameId);
            if (game == null)
            {
                throw new ArgumentException("Invalid game ID");
            }
            return game;
        }
        public async Task<GameBoard> MakeMove(int gameId, int position)
        {
            var game = await _context.Games.FindAsync(gameId);
            if (game == null)
            {
                throw new ArgumentException("Invalid game ID");
            }
            if (game.Winner != null)
            {
                throw new InvalidOperationException("The game is already finished");
            }
            if (position < 1 || position > 9)
            {
                throw new ArgumentException("Invalid move position");
            }
            int index = position - 1;
            if (game?.BoardState[index] != '-')
            {
                throw new InvalidOperationException("Invalid move position - the cell is already occupied");
            }
            char[] board = game.BoardState.ToCharArray();
            board[index] = game.PlayerTurn[0];
            game.BoardState = new string(board);
            if (IsWinningMove(board, game.PlayerTurn[0]))
            {
                if (game.PlayerTurn == "X")
                {
                    game.Winner = game.Player1;
                }
                else if(game.PlayerTurn == "O")
                {
                    game.Winner = game.Player2;
                }
            }
            else if (IsBoardFull(board))
            {
                game.Winner = "Draw";
            }
            else
            {
                game.PlayerTurn = (game.PlayerTurn == "X") ? "O" : "X";
            }
            await _context.SaveChangesAsync();
            return game;
        }
        private bool IsWinningMove(char[] board, char player)
        {
            for (int row = 0; row < 3; row++)
            {
                if (board[row * 3] == player && board[row * 3 + 1] == player && board[row * 3 + 2] == player)
                {
                    return true;
                }
            }
            for (int col = 0; col < 3; col++)
            {
                if (board[col] == player && board[col + 3] == player && board[col + 6] == player)
                {
                    return true;
                }
            }
            if (board[0] == player && board[4] == player && board[8] == player)
            {
                return true;
            }
            if (board[2] == player && board[4] == player && board[6] == player)
            {
                return true;
            }

            return false;
        }
        private bool IsBoardFull(char[] board)
        {
            return !board.Any(cell => cell == '-');
        }
        public async Task<List<GameBoard>> GetBoards() => await _context.Games.ToListAsync();
    }
}
