postgreSQL:
\l show database

create database bigdata_ca1_jingjing_lan

\c bigdata_ca1_jingjing_lan
***collect database

#2. Insert Documents
##Insert the following documents into a `movies` collection.
create table movies(
movie_id serial,title text NOT NULL,writer text,year int, actors text,
franchise text,synopsis text);

\dt 
**show all tables from this database

\d movies
**show all database from movies



###(1)title : Fight Club 
###writer : Chuck Palahniuk 
###year : 1999 
###actors : [
###Brad Pitt 
###Edward Norton 
###]

INSERT INTO movies(title,writer,year,actors)	
VALUES('Fight Club','Chuck Palahniuk ',1999,'Brad Pitt,Edward Norton');	

##(2)title : Pulp Fiction 
##writer : Quentin Tarantino 
##year : 1994 
##actors : [
##John Travolta ,Uma Thurman ]


##(3)title : Inglorious Basterds 
##writer : Quentin Tarantino 
##year : 2009 
##actors : [
##Brad Pitt,Diane Kruger,Eli Roth ]

INSERT INTO movies(title,writer,year,actors)	
VALUES('Pulp Fiction','Quentin Tarantino',1994,'John Travolta ,Uma Thurman'),
('Inglorious Basterds ','Quentin Tarantino',2009,'Brad Pitt,Diane Kruger,Eli Roth');


//(4)title: The Hobbit : An Unexpected Journey
//	writer : J.R.R.Tolkein
//	year : 2012
//	franchise : The Hobbit



//(5)title: The Hobbit : The Desolation of Smaug
//	writer : J.R.R.Tolkein
//	year : 2013
//	franchise : The Hobbit

##DROP TABLE movies;

//(6)title: The Hobbit : The Battle of the Five Armies
//	writer : J.R.R.Tolkein
//	year : 2012
//	franchise : The Hobbit
//	synopsis : Bilbo and Company are forced to engage in a war against an array of 
//  combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.

INSERT INTO movies(title,writer,year,franchise)	
VALUES('The Hobbit : An Unexpected Journey','J.R.R.Tolkein',2012,'The Hobbit'),
('The Hobbit : The Desolation of Smaug','J.R.R.Tolkein',2013,'The Hobbit'),
('The Hobbit : The Battle of the Five Armies','J.R.R.Tolkein',2012,'Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness');


//(7)title: Pee Wee Herman's Big Adventure
##'' =‘

//(8)title: Avatar

INSERT INTO movies(title) 
VALUES('Pee Wee Herman''s Big Adventure'),('Avatar');


#3.Query / Find Documents

#(1) get all documents 
select *from movies;


#(2) get all documents with `writer` set to "Quentin Tarantino" 
SELECT * FROM movies WHERE writer ='Quentin Tarantino';


#(3)get all documents where `actors` include "Brad Pitt" 
SELECT * FROM movies WHERE actors like '%Brad Pitt%';


#(4)get all documents with `franchise` set to "The Hobbit" 
SELECT * FROM movies WHERE franchise ='The Hobbit';
#SELECT * FROM movies WHERE title like'%The Hobbit%';


#(5)get all movies released in the 90s 
SELECT * FROM movies WHERE year >1989 AND year <2000;


#(6)get all movies released before the year 2000 or after 2010
SELECT * FROM movies WHERE year >2010 OR year <2000;


#4.Update Documents
#(1)1. add a synopsis to "The Hobbit: An Unexpected Journey" : 
#"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain
#with a spirited group of dwarves to reclaim their mountain home
#- and the gold within it - from the dragon Smaug." 
"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug." 

UPDATE movies SET synopsis = 'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug.'where title ='The Hobbit : An Unexpected Journey';


#(2) add a synopsis to "The Hobbit: The Desolation of Smaug" : 
#"The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring." 

UPDATE movies SET synopsis='The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring.'where title ='The Hobbit : The Desolation of Smaug';

#(3)3. add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"

update movies set actors=concat(actors,',Samuel L. Jackson') where title ='Pulp Fiction';


#5.Text Search

###(1)1. find all movies that have a synopsis that contains the word "Bilbo" 
mongod --set Parameter textSearchEnabled=true

SELECT * FROM movies WHERE synopsis like '%Bilbo%';

###(2)2. find all movies that have a synopsis that contains the word "Gandalf" 

SELECT * FROM movies WHERE synopsis like '%Gandalf%';


#(3)3. find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf" 

select * from movies where synopsis like '%Bilbo%' and synopsis not like '%Gandalf%';


#4. find all movies that have a synopsis that contains the word "dwarves" or "hobbit" 

select * from movies where synopsis like '%dwarves%' or synopsis  like '%hobbit%';

#5. find all movies that have a synopsis that contains the word "gold" and "dragon"

select * from movies where synopsis like '%gold%' and synopsis  like '%dragon%';


#6.Delete Documents
###(1)delete the movie "Pee Wee Herman's Big Adventure"

DELETE FROM movies WHERE title  = 'Pee Wee Herman''s Big Adventure';

###(2)delete the movie "Avatar"

DELETE FROM movies WHERE title  = 'Avatar';


#7.Relationships
##1.Insert the following documents into a `users` collection
###(1)username : GoodGuyGreg 
###first_name : "Good Guy" 
###last_name : "Greg"
db.users.insert({username:"GoodGuyGreg", first_name:"Good Guy", last_name:"Greg"})

create table users(
user_id serial,username text,first_name text, last_name text,first text,last text);

INSERT INTO users(username,first_name,last_name) VALUES('GoodGuyGreg','Good Guy','Greg');	


###(2)username : ScumbagSteve 
###full_name :
###first : "Scumbag" 
###last : "Steve"


INSERT INTO users(username,first,last) VALUES('ScumbagSteve','Scumbag','Steve');	
#need drop
#select * from users;

##2.Insert the following documents into a `posts` collection
###(1)username : GoodGuyGreg 
###title : Passes out at party 
###body : Wakes up early and cleans house


create table posts(post_id serial PRIMARY KEY,username text,title text,body text);

###(2)username : GoodGuyGreg 
###title : Steals your identity 
###body : Raises your credit score



###(3)username : GoodGuyGreg 
###title : Reports a bug in your code 
###body : Sends you a Pull Request


###(4)username : ScumbagSteve 
###title : Borrows something 
###body : Sells it

//db.posts.remove({title:"Borrows something"})
###(5)username : ScumbagSteve 
###title : Borrows everything 
###body : The end

###(6)username : ScumbagSteve 
###title : Forks your repo on github 
###body : Sets to private


INSERT INTO posts(username,title,body) VALUES('GoodGuyGreg','Passes out at party','Wakes up early and cleans house'),
('GoodGuyGreg','Steals your identity','Raises your credit score'),('GoodGuyGreg','Reports a bug in your code','Sends you a Pull Request'),
('ScumbagSteve','Borrows something','sells it'),('ScumbagSteve','Borrows everything','The end'),
('ScumbagSteve','Forks your repo on github','Sets to private');

select * from posts;

DROP TABLE comments;
##3.Insert the following documents into a `comments` collection
create table comments(comment_id serial,username text,comment text, post_id int  REFERENCES posts(post_id)); 
PRIMARY	KEY	(country_code,	postal_code)

###(1)username : GoodGuyGreg 
###comment : Hope you got a good deal! 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: "Borrows something"

insert into comments (post_id,username,comment)select post_id, 'GoodGuyGreg', 'Hope you got a good deal!'  from posts where title in ('Borrows something');

###(2)username : GoodGuyGreg 
###comment : What's mine is yours! 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: "Borrows everything"

insert into comments (post_id,username,comment)select post_id, 'GoodGuyGreg', 'What''s mine is yours!'  from posts where title in ('Borrows everything');

###(3)username : GoodGuyGreg 
###comment : Don't violate the licensing agreement! 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: "Forks your repo on github"
insert into comments (post_id,username,comment)select post_id, 'GoodGuyGreg', 'Don''t violate the licensing agreement!' from posts where title in ('Forks your repo on github');

###(4)username : ScumbagSteve 
###comment : It still isn't clean 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: ""Passes out at party"
insert into comments (post_id,username,comment)select post_id, 'ScumbagSteve', 'It still isn''t clean' from posts where title in ('Passes out at party');


###(5)username : ScumbagSteve 
###comment : Denied your PR cause I found a hack 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: "Reports a bug in your code"
insert into comments (post_id,username,comment)select post_id, 'ScumbagSteve', 'Denied your PR cause I found a hack' from posts where title in ('Reports a bug in your code');


#8.Querying related collections
##1. find all users 
SELECT * FROM users;

##2. find all posts 
SELECT * FROM posts;

##3. find all posts that was authored by "GoodGuyGreg"
SELECT * FROM posts WHERE username = 'GoodGuyGreg';
 
##4. find all posts that was authored by "ScumbagSteve" 
SELECT * FROM posts WHERE username = 'ScumbagSteve';

##5. find all comments
SELECT * FROM comments;
 
##6. find all comments that was authored by "GoodGuyGreg"
SELECT * FROM comments WHERE username = 'GoodGuyGreg';
 
##7. find all comments that was authored by "ScumbagSteve" 
SELECT * FROM comments WHERE username = 'ScumbagSteve';

##8. find all comments belonging to the post "Reports a bug in your code"
SELECT * FROM comments WHERE post_id in ( select post_id from posts where title in ('Reports a bug in your code'));
//
SELECT c.* FROM comments c  join posts p on c.post_id = p.post_id where title = 'Reports a bug in your code';
