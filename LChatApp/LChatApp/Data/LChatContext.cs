using Microsoft.EntityFrameworkCore;
using LChatApp.Models;

namespace LChatApp.Data
{
    public class LChatContext : DbContext
    {
        public LChatContext(DbContextOptions<LChatContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Msg> Messages { get; set; }
    }
}
