namespace LChatApp.Models
{
    public class Msg
    {
        public int Id { get; set; }
        public int ChatId { get; set; }
        public int SenderId { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
