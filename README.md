# Inventory Tracker
* Live version [_here_](https://inventory-crud.netlify.app/)
* Frontend repository [_here_](https://github.com/coscoaj1/inventory_frontend)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)


## General info

Deployed version link is above.  I have not yet tried to optimize the frontend at all for any measures
such as accessibility, responsiveness, etc.  I tried to focus on high quality backend code through proper application and folder structuring,
error handling and writing automated tests.

## Technologies

Project is created with:

* Node.js
* Express.js
* Multer.js for file uploads
* Amazon RDS MySQL database/ SequelizeORM
* Amazon S3 bucket for image storage
* express-async-handler package(eliminates try-catch blocks!)
* Backend deployed on Heroku
* Testing with Jest/Supertest

* Frontend created with React.js and ChakraUI

## Features

CRUD functionality.  The app allows image uploads with generated thumbnails. 
Images are procesed to reduce image size with sharp, then piped to an AWS S3 bucket for storage 
via the aws-sdk for javascript.  

Deleting a product from the database does also delete the thumbnails from the S3 bucket. 

## Room for improvement:
To do: 
- Write more automated tests, figure out how to mock the file uploads and database.
- Add new features for example ability to create orders/shipments. 
- Improve the frontend.


