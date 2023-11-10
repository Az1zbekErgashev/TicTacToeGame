using GameBot.Enitiy;
using GameBot.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GameBot.Controllers
{
    [ApiController]
    [Route("api/tictactoe")]
    public class TicTacToeController : ControllerBase
    {
        private readonly IGameRepository _gameBoardRepository;

        public TicTacToeController(IGameRepository gameBoardRepository)
        {
            _gameBoardRepository = gameBoardRepository;
        }

            [HttpPost]
            public async Task<IActionResult> CreateGame(string player1Name, string player2Name)
            { 
                var game = await _gameBoardRepository.CreateGame( player1Name, player2Name);
                return Ok(game);
            }
        [HttpPost("{gameId}/move/{position}")]
        public async Task<ActionResult<GameBoard>> MakeMove(int gameId, int position)
        {
            var updatedGame = await _gameBoardRepository.MakeMove(gameId, position);
            return Ok(updatedGame);
        }
        [HttpGet("{gameId}")]
        public async Task<ActionResult<GameBoard>> GetGame(int gameId)
        {
            var game = await _gameBoardRepository.GetGame(gameId);
            if (game == null)
                return NotFound();

            return Ok(game);
        }
        [HttpGet]
        public async Task<ActionResult<GameBoard>> GetAll() => Ok(await _gameBoardRepository.GetBoards());
    }
}
