namespace GameBot.Enitiy
{
    public class GameBoardDto
    {
        public int Id { get; set; }
        public string? BoardState { get; set; }
        public string? PlayerTurn { get; set; }
        public string? Winner { get; set; }
        public  string? Player1 { get; set; }
        public  string? Player2 { get; set; }
        public int? WinningFieldIndex { get; set; }

    }
}
