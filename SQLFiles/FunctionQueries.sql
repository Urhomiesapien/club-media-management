DELIMITER //
CREATE FUNCTION UpdateProfileFunction(
    inputUsername VARCHAR(50),
    inputName VARCHAR(50),
    inputEmail VARCHAR(50),
    inputPhoneNumber VARCHAR(50),
    inputGear VARCHAR(50),
    inputEventsParticipated VARCHAR(50)
) RETURNS INT
BEGIN
    DECLARE result INT;

    UPDATE Member
    SET 
        Name = inputName, 
        Email = inputEmail, 
        PhoneNumber = inputPhoneNumber, 
        Gear = inputGear, 
        EventsParticipated = inputEventsParticipated
    WHERE Username = inputUsername;

    IF ROW_COUNT() > 0 THEN
        SET result = 1; -- Update successful
    ELSE
        SET result = 0; -- Update failed (e.g., username not found)
    END IF;

    RETURN result;
END //
DELIMITER ;
