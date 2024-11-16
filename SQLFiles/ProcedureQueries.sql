-- ALL PROCEDURES STORED HERE

-- PROCEDURE FOR GETTING PROFILE DETAILS FROM MEMBER TABLE
DELIMITER //
CREATE PROCEDURE GetProfile(IN inputUsername VARCHAR(50))
BEGIN
    SELECT MemberID, Username, Name, Email, PhoneNumber, Gear, EventsParticipated
    FROM Member 
    WHERE Username = inputUsername;
END //
DELIMITER ;

-- PROCEDURE FOR UPDATING PROFILE PAGE
DELIMITER //
CREATE PROCEDURE UpdateProfile(
    IN inputUsername VARCHAR(50),
    IN inputName VARCHAR(50),
    IN inputEmail VARCHAR(50),
    IN inputPhoneNumber VARCHAR(50),
    IN inputGear VARCHAR(50),
    IN inputEventsParticipated VARCHAR(50)
)
BEGIN
    UPDATE Member 
    SET 
        Name = inputName, 
        Email = inputEmail, 
        PhoneNumber = inputPhoneNumber, 
        Gear = inputGear, 
        EventsParticipated = inputEventsParticipated
    WHERE Username = inputUsername;
END //
DELIMITER ;

-- PROCEDURE FOR GETTING ALL EVENTS FOR EVENTS PAGE
DELIMITER //
CREATE PROCEDURE GetAllEvents()
BEGIN
  SELECT 
    E.EventID, E.EventName, E.EventDate, E.clubs, E.mediaLink,
    GROUP_CONCAT(M.Name SEPARATOR ', ') AS Members
  FROM Events E
  LEFT JOIN Member M ON E.MemberID = M.MemberID
  GROUP BY E.EventID, E.EventName, E.EventDate, E.clubs, E.mediaLink;
END //
DELIMITER ;

-- PROCEDURE FOR GETTING DETAILS OF A SPECIFIC EVENT: GEARS, EXPENSES, EVERYTHING
DELIMITER //
CREATE PROCEDURE GetEventDetails(IN event_id VARCHAR(50))
BEGIN
  SELECT * 
  FROM Events 
  WHERE EventID = event_id;
END //
DELIMITER ;
