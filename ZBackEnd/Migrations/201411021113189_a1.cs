namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class a1 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.tblArtists", newName: "tblArtist");
            RenameTable(name: "dbo.tblUrls", newName: "tblUrl");
            RenameTable(name: "dbo.tblFiles", newName: "tblFile");
            RenameTable(name: "dbo.tblProfiles", newName: "tblProfile");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.tblProfile", newName: "tblProfiles");
            RenameTable(name: "dbo.tblFile", newName: "tblFiles");
            RenameTable(name: "dbo.tblUrl", newName: "tblUrls");
            RenameTable(name: "dbo.tblArtist", newName: "tblArtists");
        }
    }
}
