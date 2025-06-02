using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace GreenUApi.Models;

public partial class GreenUDB : DbContext
{
    public GreenUDB()
    {
    }

    public GreenUDB(DbContextOptions<GreenUDB> options)
        : base(options)
    {
    }

    public virtual DbSet<Contributor> Contributors { get; set; }

    public virtual DbSet<Crop> Crops { get; set; }

    public virtual DbSet<Follower> Followers { get; set; }

    public virtual DbSet<Garden> Gardens { get; set; }

    public virtual DbSet<Line> Lines { get; set; }

    public virtual DbSet<Log> Logs { get; set; }

    public virtual DbSet<BugReport> BugReports { get; set; }

    public virtual DbSet<Harvest> Harvests { get; set; }

    public virtual DbSet<Parcel> Parcels { get; set; }

    public virtual DbSet<PlantNursery> PlantNursery { get; set;}

    public virtual DbSet<TagsInterest> TagsInterests { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_unicode_ci")
            .HasCharSet("utf8mb4");


        modelBuilder.Entity<PlantNursery>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("PlantNursery");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");

        });


        modelBuilder.Entity<Contributor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Contributor");

            entity.HasIndex(e => e.GardenId, "fk_Contributor_Garden_id");

            entity.HasIndex(e => e.UserId, "fk_Contributor_User_id");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("Created_at");
            entity.Property(e => e.GardenId).HasColumnName("Garden_id");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.Garden).WithMany(p => p.Contributors)
                .HasForeignKey(d => d.GardenId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Contributor_Garden_id");

            entity.HasOne(d => d.User).WithMany(p => p.Contributors)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Contributor_User_id");
        });

        modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.LineId, "fk_Crops_Line_id");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
                
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("Created_at");
                
            entity.Property(e => e.LineId).HasColumnName("Line_id");
            
            entity.Property(e => e.Variety).HasColumnType("text");
            entity.Property(e => e.Vegetable).HasColumnType("text");

            entity.HasOne(d => d.Line)
                .WithMany(p => p.Crops)
                .HasForeignKey(d => d.LineId)
                .HasConstraintName("fk_Crops_Line_id");

            entity.HasOne(d => d.PlantNursery)
                .WithMany(pn => pn.Crops)
                .HasForeignKey(d => d.PlantNurseryId)
                .HasConstraintName("fk_Crops_PlantNursery_id");
        });


        modelBuilder.Entity<Follower>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Follower");

            entity.HasIndex(e => e.FollowerId, "fk_Follower_Follower_id");

            entity.HasIndex(e => e.GardenId, "fk_Follower_Garden_id");

            entity.HasIndex(e => e.UserId, "fk_Follower_User_id");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.FollowerId).HasColumnName("Follower_id");
            entity.Property(e => e.GardenId).HasColumnName("Garden_id");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.Garden).WithMany(p => p.Followers)
                .HasForeignKey(d => d.GardenId)
                .HasConstraintName("fk_Follower_Garden_id");

            entity.HasOne(d => d.User).WithMany(p => p.FollowerUsers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_Follower_User_id");
        });

        modelBuilder.Entity<Garden>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Garden");

            entity.HasIndex(e => e.AuthorId, "fk_Garden_Admin_id");

            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.AuthorId).HasColumnName("Admin_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("Created_at");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Name).HasColumnType("text");
            entity.Property(e => e.Privacy).HasColumnName("privacy");
            entity.Property(e => e.Type).HasColumnName("type");

        });

        modelBuilder.Entity<Line>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Line");

            entity.HasIndex(e => e.ParcelId, "fk_Line_Parcel_id");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("Created_at");
            entity.Property(e => e.ParcelId).HasColumnName("Parcel_id");

            entity.HasOne(d => d.Parcel).WithMany(p => p.Lines)
                .HasForeignKey(d => d.ParcelId)
                .HasConstraintName("fk_Line_Parcel_id");
                
        });

        modelBuilder.Entity<Log>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Action).HasColumnType("text");
            entity.Property(e => e.AuthorId).HasColumnName("Author_id");
            entity.Property(e => e.Comment).HasColumnType("text");
            entity.Property(e => e.CreatedAt).HasColumnName("Created_at");
            entity.Property(e => e.CropId).HasColumnName("Crop_id");
            entity.Property(e => e.GardenId).HasColumnName("Garden_id");
            entity.Property(e => e.LineId).HasColumnName("Line_id");
            entity.Property(e => e.ParcelId).HasColumnName("Parcel_id");
            entity.Property(e => e.Type).HasMaxLength(50);
        });

        modelBuilder.Entity<Parcel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Parcel");

            entity.HasIndex(e => e.GardenId, "fk_Parcel_Garden_id");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("Created_at");
            entity.Property(e => e.GardenId).HasColumnName("Garden_id");
            entity.Property(e => e.NLine).HasColumnName("N_line");

            entity.HasOne(d => d.Garden).WithMany(p => p.Parcels)
                .HasForeignKey(d => d.GardenId)
                .HasConstraintName("fk_Parcel_Garden_id");
        });

        modelBuilder.Entity<TagsInterest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Tags_interest");

            entity.HasIndex(e => e.GardenId, "fk_Tags_Garden_id");

            entity.HasIndex(e => e.UserId, "fk_Tags_User_id");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.GardenId).HasColumnName("Garden_id");
            entity.Property(e => e.Hashtag).HasColumnType("text");
            entity.Property(e => e.UserId).HasColumnName("User_id");

            entity.HasOne(d => d.Garden).WithMany(p => p.TagsInterests)
                .HasForeignKey(d => d.GardenId)
                .HasConstraintName("fk_Tags_Garden_id");

            entity.HasOne(d => d.User).WithMany(p => p.TagsInterests)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_Tags_User_id");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("User");

            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.Bio).HasColumnType("text");
            entity.Property(e => e.Country).HasColumnType("text");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("Created_at");
            entity.Property(e => e.Email).HasColumnType("text");
            entity.Property(e => e.Firstname).HasColumnType("text");
            entity.Property(e => e.IsAdmin).HasColumnName("Is_admin");
            entity.Property(e => e.Lastname).HasColumnType("text");
            entity.Property(e => e.Password).HasColumnType("text");
            entity.Property(e => e.PostalCode)
                .HasColumnType("text")
                .HasColumnName("Postal_code");
            entity.Property(e => e.ProfileImage)
                .HasColumnType("text")
                .HasColumnName("Profile_image");
            entity.Property(e => e.Salt).HasColumnType("text");
            entity.Property(e => e.Gender).HasColumnType("text");
            entity.Property(e => e.Username).HasColumnType("text");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
