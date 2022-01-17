# This is an Inventory Tracker
* Live version [_here_](https://inventory-crud.netlify.app/)
* Frontend repository [_here_](https://github.com/coscoaj1/inventory_frontend)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)


## General info

To get this app working, simply navigate to the live version link above.  I chose to create a fully functioning frontend in addition 
to the backend to make the app easier to test out for the reviewers, since downloading and installing locally isn't really an option with all the 
database and AWS passwords required to run the app. I did not try to optimize the frontend at all for any measures
such as accessibility, responsiveness, etc.  I tried to focus on high quality backend code through proper application and folder structuring,
error handling and writing automated tests as I went.

## Technologies

Project is created with:

* Node.js
* Express.js
* Multer.js for file uploads
* MySQL database/ SequelizeORM
* AWS S3 bucket for image storage
* express-async-handler package(eliminates try-catch blocks!)
* Backend deployed on Heroku
* Testing with Jest/Supertest

* Frontend created with React.js and ChakraUI

## Features

Full CRUD functionality.  The extra feature I chose to implement was to allow image upload/storage with generated thumbnails. 
How this works is the thumbnail images are uploaded to the server from the frontend with the add new product form,
saved on the server with a Node.js middleware called multer, the images then being sent to an AWS S3 bucket for storage 
via the aws-sdk for javascript.  S3 then returns a response to the server which contains the bucket url and key for that image, 
which are then stored on the mySQL database as reference.  Whew!

Deleting a product from the database does also delete the thumbnails from the S3 bucket.  Did not add update functionality for images to 
the frontend, but every other column for the products can be updated through the UI or by manually sending requests(I use VSCode REST client addon)

## Room for improvement:
To do: 
- Write a few more automated tests.
- Improve the frontend.


