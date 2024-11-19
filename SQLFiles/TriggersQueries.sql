ALTER TABLE events ADD COLUMN Latest BOOLEAN DEFAULT FALSE;

-- DELIMITER //
-- CREATE TRIGGER AfterInsertLatestEvent
-- AFTER INSERT ON events
-- FOR EACH ROW
-- BEGIN
--     -- Set the Latest flag to FALSE for all events
--     UPDATE events SET Latest = FALSE;

--     -- Set the Latest flag to TRUE for the event with the latest date
--     UPDATE events 
--     SET Latest = TRUE 
--     WHERE EventDate = (SELECT MAX(EventDate) FROM events);
-- END //
-- DELIMITER ;

DELIMITER //
CREATE TRIGGER task_update_completion
AFTER UPDATE ON events
FOR EACH ROW
BEGIN
    IF NEW.TaskCompleted = TRUE THEN
        UPDATE events SET TaskCompleted = TRUE WHERE EventID = NEW.EventID;
    END IF;
END;
DELIMITER ;