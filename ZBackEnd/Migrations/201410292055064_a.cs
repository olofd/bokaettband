namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class a : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblArtists",
                c => new
                    {
                        ArtistId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                        UrlId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ArtistId)
                .ForeignKey("dbo.tblUrls", t => t.UrlId)
                .Index(t => t.UrlId);
            
            CreateTable(
                "dbo.tblUrls",
                c => new
                    {
                        UrlId = c.Int(nullable: false, identity: true),
                        Url = c.String(nullable: false, maxLength: 100),
                        Private = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.UrlId)
                .Index(t => t.Url, unique: true, name: "Url");
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        FistName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        UrlId = c.Int(nullable: false),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.tblUrls", t => t.UrlId)
                .Index(t => t.UrlId)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.tblFiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FilePath = c.String(nullable: false),
                        FileName = c.String(nullable: false),
                        OriginalFileName = c.String(nullable: false),
                        FileExtension = c.String(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        tblProfile_ProfileId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.tblProfiles", t => t.tblProfile_ProfileId)
                .Index(t => t.tblProfile_ProfileId);
            
            CreateTable(
                "dbo.tblProfiles",
                c => new
                    {
                        ProfileId = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        UrlId = c.Int(),
                        HeaderImageId = c.Int(),
                        HeaderImagePostionQuery = c.String(),
                        ProfileImageId = c.Int(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ProfileId)
                .ForeignKey("dbo.tblFiles", t => t.HeaderImageId)
                .ForeignKey("dbo.tblFiles", t => t.ProfileImageId)
                .ForeignKey("dbo.tblUrls", t => t.UrlId)
                .Index(t => t.UrlId)
                .Index(t => t.HeaderImageId)
                .Index(t => t.ProfileImageId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.tblUsers_tblArtist",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        ArtistId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Id, t.ArtistId })
                .ForeignKey("dbo.AspNetUsers", t => t.Id, cascadeDelete: true)
                .ForeignKey("dbo.tblArtists", t => t.ArtistId, cascadeDelete: true)
                .Index(t => t.Id)
                .Index(t => t.ArtistId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.tblProfiles", "UrlId", "dbo.tblUrls");
            DropForeignKey("dbo.tblProfiles", "ProfileImageId", "dbo.tblFiles");
            DropForeignKey("dbo.tblFiles", "tblProfile_ProfileId", "dbo.tblProfiles");
            DropForeignKey("dbo.tblProfiles", "HeaderImageId", "dbo.tblFiles");
            DropForeignKey("dbo.tblArtists", "UrlId", "dbo.tblUrls");
            DropForeignKey("dbo.AspNetUsers", "UrlId", "dbo.tblUrls");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.tblUsers_tblArtist", "ArtistId", "dbo.tblArtists");
            DropForeignKey("dbo.tblUsers_tblArtist", "Id", "dbo.AspNetUsers");
            DropIndex("dbo.tblUsers_tblArtist", new[] { "ArtistId" });
            DropIndex("dbo.tblUsers_tblArtist", new[] { "Id" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.tblProfiles", new[] { "ProfileImageId" });
            DropIndex("dbo.tblProfiles", new[] { "HeaderImageId" });
            DropIndex("dbo.tblProfiles", new[] { "UrlId" });
            DropIndex("dbo.tblFiles", new[] { "tblProfile_ProfileId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUsers", new[] { "UrlId" });
            DropIndex("dbo.tblUrls", "Url");
            DropIndex("dbo.tblArtists", new[] { "UrlId" });
            DropTable("dbo.tblUsers_tblArtist");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.tblProfiles");
            DropTable("dbo.tblFiles");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.tblUrls");
            DropTable("dbo.tblArtists");
        }
    }
}
