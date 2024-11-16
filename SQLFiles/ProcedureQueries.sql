DELIMITER //
CREATE PROCEDURE GetProfile(IN inputUsername VARCHAR(50))
BEGIN
    SELECT MemberID, Username, Name, Email, PhoneNumber, Gear, EventsParticipated
    FROM Member 
    WHERE Username = inputUsername;
END //
DELIMITER ;

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
