-- Active: 1697937413972@@127.0.0.1@3306@magazine
SELECT commentID FROM likes where `userID` = 81

SELECT * FROM user

SELECT * from user_comments where id IN (0)


SELECT * FROM user_comments


SELECT * FROM followers

SELECT  personID as following FROM followers where `ownerID` = 72;
SELECT COUNT(ID) as followers FROM followers where `personID` = 72


SELECT * FROM user_comments

SELECT *, (SELECT COUNT(id) from user_comments where user_comments.id = reply) as followers FROM user_comments 

SELECT COUNT(id) as follows FROM user_comments where reply = id

SELECT  uc.*, COUNT(reply.id) AS followers,(SELECT COUNT(ID) from likes where commentID = user_comments.id) as likes FROM user_comments uc LEFT JOIN user_comments reply ON uc.id = reply.reply GROUP BY uc.id;

-- PRAWIE DOBRZE
SELECT * , (SELECT COUNT(ID) FROM likes where `commentID` = us.id) as likes ,COUNT(reply.id) as followers FROM user_comments us LEFT JOIN user_comments reply on us.id = reply.reply GROUP BY us.id, reply.id


SELECT *, (SELECT COUNT(*) FROM user_comments reply WHERE reply.reply = uc.id) AS followers FROM user_comments uc;



SELECT * FROM user_comments