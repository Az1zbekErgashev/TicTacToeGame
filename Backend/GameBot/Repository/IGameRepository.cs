using GameBot.Enitiy;
namespace GameBot.Repository
{
    public interface IGameRepository
    {
        Task<GameBoard> CreateGame(string player1Name, string player2Name);
        Task<GameBoard> MakeMove(int gameId, int position);
        Task<GameBoard> GetGame(int gameId);
        Task<List<GameBoard>> GetBoards();
    }
}
