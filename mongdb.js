#1.Getting started
#Connect to a running mongo instance, use a database named `bigdata_ca1_firstname_lastname`. Use mongodump to submit a copy of your database when you have finished the assignment.
#Document all your queries in a javascript file for submission. Where you are asked a question with a number document your answers to these questions as well as the code needed to find the answer.

1.
use bigdata_ca1_Jingjing_Lan

#2. Insert Documents
##Insert the following documents into a `movies` collection.
db.createCollection("movies")

##(1)title : Fight Club 
##writer : Chuck Palahniuk 
##year : 1999 
##actors : [
##Brad Pitt 
##Edward Norton 
##]

db.movies.insert({
title:"Fight Club",
writer:"Chuck Palahniuk",
year:1999,
actors:["Brad Pitt","Edward Norton"]
})


##(2)title : Pulp Fiction 
##writer : Quentin Tarantino 
##year : 1994 
##actors : [
##John Travolta 
##Uma Thurman ]

db.movies.insert({
title:"Pulp Fiction",
writer:"Quentin Tarantino",
year:1994,
actors:["John Travolta","Uma Thurman"]
})


##(3)title : Inglorious Basterds 
##writer : Quentin Tarantino 
##year : 2009 
##actors : [
##Brad Pitt 
##Diane Kruger 
##Eli Roth ]

db.movies.insert({
title:"Inglorious Basterds",
writer:"Quentin Tarantino",
year:2009,
actors:["Brad Pitt","Diane Kruger","Eli Roth"]
})


//(4)title: The Hobbit : An Unexpected Journey
//	writer : J.R.R.Tolkein
//	year : 2012
//	franchise : The Hobbit

db.movies.insert({
title:"The Hobbit: An Unexpected Journey",
writer:"J.R.R. Tolkein",
year:2012,
franchise:"The Hobbit"
})


//(5)title: The Hobbit : The Desolation of Smaug
//	writer : J.R.R.Tolkein
//	year : 2013
//	franchise : The Hobbit

db.movies.insert({
title:"The Hobbit: The Desolation of Smaug",
writer:"J.R.R. Tolkein",
year:2013,
franchise:"The Hobbit"
})


//(6)title: The Hobbit : The Battle of the Five Armies
//	writer : J.R.R.Tolkein
//	year : 2012
//	franchise : The Hobbit
//	synopsis : Bilbo and Company are forced to engage in a war against an array of 
//  combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.

db.movies.insert({
title:"The Hobbit: The Battle of the Five Armies",
writer:"J.R.R. Tolkein",
year:2012,
franchise:"The Hobbit",
synopsis : "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."
})


//(7)title: Pee Wee Herman's Big Adventure

db.movies.insert({
title:"Pee Wee Herman's Big Adventure",
})


//(8)title: Avatar

db.movies.insert({
title:"Avatar",
})

#3.Query / Find Documents
#query the `movies` collection to
#1. get all documents 
db.movies.find().pretty()

#(2) get all documents with `writer` set to "Quentin Tarantino" 
db.movies.find({'writer':'Quentin Tarantino'}).pretty()

#(3)get all documents where `actors` include "Brad Pitt" 
db.movies.find({'actors':'Brad Pitt'}).pretty()

#(4)get all documents with `franchise` set to "The Hobbit" 
db.movies.find({'franchise':'The Hobbit'}).pretty()

#(5)get all movies released in the 90s 
db.movies.find("this.year>1989 && this.year<2000").pretty()

#(6)get all movies released before the year 2000 or after 2010
db.movies.find("this.year>2010 || this.year<2000").pretty()

#4.Update Documents
#(1)1. add a synopsis to "The Hobbit: An Unexpected Journey" : 
#"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain
#with a spirited group of dwarves to reclaim their mountain home
#- and the gold within it - from the dragon Smaug." 
"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug." 

db.movies.update(
{"title":"The Hobbit: An Unexpected Journey"},
{$set:{"synopsis":"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}})


#(2) add a synopsis to "The Hobbit: The Desolation of Smaug" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring." 

db.movies.update(
{"title":"The Hobbit: The Desolation of Smaug"},
{$set:{"synopsis":"The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}})

#(3)add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
db.movies.update(
{"title":"Pulp Fiction"},
{$set:{"actor":"Samuel L. Jackson"}})


#5.Text Search

###(1)1. find all movies that have a synopsis that contains the word "Bilbo" 
mongod --set Parameter textSearchEnabled=true
db.movies.ensureIndex({synopsis:"text"})
db.movies.find({"$text":{"$search":"Bilbo"}}).pretty()

###(2)2. find all movies that have a synopsis that contains the word "Gandalf" 
db.movies.find({"$text":{"$search":"Gandalf"}}).pretty()

#(3)3. find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf" 
db.movies.find({$and:[{synopsis:{$regex:"Bilbo"}}, {synopsis:{$not:/Gandalf/}}]}).pretty()


#4. find all movies that have a synopsis that contains the word "dwarves" or "hobbit" 
db.movies.find({$or:[{synopsis:{$regex:"dwarves"}}, {synopsis:{$regex:/hobbit/}}]}).pretty()


#5. find all movies that have a synopsis that contains the word "gold" and "dragon"
db.movies.find({$and:[{synopsis:{$regex:"gold"}}, {synopsis:{$regex:"dragon"}}]}).pretty()

#6.Delete Documents
###(1)delete the movie "Pee Wee Herman's Big Adventure"
db.movies.remove({title: "Pee Wee Herman's Big Adventure"})

###(2)delete the movie "Avatar"
db.movies.remove({title: "Avatar"})

#7.Relationships
##1.Insert the following documents into a `users` collection
###(1)username : GoodGuyGreg 
###first_name : "Good Guy" 
###last_name : "Greg"
db.users.insert({username:"GoodGuyGreg", first_name:"Good Guy", last_name:"Greg"})

###(2)username : ScumbagSteve 
###full_name :
###first : "Scumbag" 
###last : "Steve"
db.users.insert({username:"ScumbagSteve", fullname:{first: "Scumbag", last:"Steve"}})


##2.Insert the following documents into a `posts` collection
###(1)username : GoodGuyGreg 
###title : Passes out at party 
###body : Wakes up early and cleans house
db.posts.insert({username:"GoodGuyGreg", title:"Passes out at party", body:"Wakes up early and cleans house"})

###(2)username : GoodGuyGreg 
###title : Steals your identity 
###body : Raises your credit score
db.posts.insert({username:"GoodGuyGreg", title:"Steals your identity", body:"Raises your credit score"})

###(3)username : GoodGuyGreg 
###title : Reports a bug in your code 
###body : Sends you a Pull Request
db.posts.insert({username:"GoodGuyGreg", title:"Reports a bug in your code", body:"Sends you a Pull Request"})

###(4)username : ScumbagSteve 
###title : Borrows something 
###body : Sells it
db.posts.insert({username:"ScumbagSteve", title:"Borrows something", body:"Sells it"})

//db.posts.remove({title:"Borrows something"})
###(5)username : ScumbagSteve 
###title : Borrows everything 
###body : The end
db.posts.insert({username:"ScumbagSteve", title:"Borrows everything", body:"The end"})

###(6)username : ScumbagSteve 
###title : Forks your repo on github 
###body : Sets to private
db.posts.insert({username:"ScumbagSteve", title:"Forks your repo on github", body:"Sets to private"})

##3.Insert the following documents into a `comments` collection

###(1)username : GoodGuyGreg 
###comment : Hope you got a good deal! 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: "Borrows something"
db.comments.insert({username:"GoodGuyGreg", comment:"Hope you got a good deal!",
post:db.posts.findOne({"title":"Borrows something"})["_id"]})

###(2)username : GoodGuyGreg 
###comment : What's mine is yours! 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: "Borrows everything"
db.comments.insert({username:"GoodGuyGreg", comment:"What's mine is yours!",
post:db.posts.findOne({"title":"Borrows everything"})["_id"]})

###(3)username : GoodGuyGreg 
###comment : Don't violate the licensing agreement! 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: "Forks your repo on github"
db.comments.insert({username:"GoodGuyGreg", comment:"Don't violate the licensing agreement!",
post:db.posts.findOne({"title":"Forks your repo on github"})["_id"]})

###(4)username : ScumbagSteve 
###comment : It still isn't clean 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: ""Passes out at party"
db.comments.insert({username:"ScumbagSteve", comment:"It still isn't clean",
post:db.posts.findOne({"title":"Passes out at party"})["_id"]})

###(5)username : ScumbagSteve 
###comment : Denied your PR cause I found a hack 
###post : [post_obj_id]
###where [post_obj_id] is the ObjectId of the `posts` document: "Reports a bug in your code"
db.comments.insert({username:"ScumbagSteve", comment:"Denied your PR cause I found a hack",
post:db.posts.findOne({"title":"Reports a bug in your code"})["_id"]})


#8.Querying related collections
##1. find all users 
db.users.find().pretty()

##2. find all posts 
db.posts.find().pretty()

##3. find all posts that was authored by "GoodGuyGreg"
db.posts.find({username:"GoodGuyGreg"}).pretty()
 
##4. find all posts that was authored by "ScumbagSteve" 
db.posts.find({username: "ScumbagSteve"}).pretty()

##5. find all comments
db.comments().pretty()
 
##6. find all comments that was authored by "GoodGuyGreg"
db.comments.find({username: "GoodGuyGreg"}).pretty()
 
##7. find all comments that was authored by "ScumbagSteve" 
db.comments.find({username: "ScumbagSteve"}).pretty()

##8. find all comments belonging to the post "Reports a bug in your code"
db.comments.find({post:db.posts.findOne({title:"Reports a bug in your code"})["_id"]}).pretty()

