CREATE DATABASE club_media_management;

USE club_media_management;

create table Member(
    MemberID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(50) NOT NULL,
    Gear VARCHAR(50),
    EventsParticipated VARCHAR(50),
    Username VARCHAR(50) NOT NULL
);

create table Gear (
    GearID VARCHAR(50) PRIMARY KEY,
    GearName VARCHAR(50) NOT NULL,
    GearType VARCHAR(50) NOT NULL,
    Availability ENUM('Available','In use', 'Not Available'),
    MemberID VARCHAR(50),
    FOREIGN KEY (MemberID) REFERENCES member(MemberID)
);

create table expenses (
    ExpenseID VARCHAR(50) PRIMARY KEY,
    EventID varchar(50) not null,
    Totalbudget  decimal(10,2) not null,
    MemberName varchar(50) not null
);

create table Events (
    EventID VARCHAR(50) PRIMARY KEY,
    EventName varchar(50) not null unique,
    EventDate DATE not null,
    clubs varchar(50),
    MemberID varchar(50) not null,
    mediaLink varchar(255) not null,
    GearID varchar(50),
    ExpenseID varchar(50),
    EventFaculty varchar(50),
    FOREIGN KEY (MemberID) REFERENCES member(memberID),
    FOREIGN KEY (GearID) REFERENCES Gear(GearID),
    FOREIGN KEY (ExpenseID) REFERENCES expenses(ExpenseID)
);

ALTER TABLE Member
ADD COLUMN Password VARCHAR(255) NOT NULL;