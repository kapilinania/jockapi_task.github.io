# Dad Joke Search Application

![Joke Icon](https://cdn-icons-png.flaticon.com/512/2901/2901598.png) <!-- Replace with your preferred joke-related icon -->
[![GitHub stars](https://img.shields.io/github/stars/kapilinania/jockapi_task.github.io?style=social)](https://github.com/kapilinania/jockapi_task.github.io) 

## Overview

This project is a web application that allows users to search for dad jokes, view them in a card layout, and save their favorites. It utilizes the Dad Joke API to fetch jokes and MySQL for storing favorite jokes.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **MySQL/MariaDB**: Relational database for storing favorite jokes
- **Bootstrap 5**: Frontend framework for responsive design
- **Axios**: For making API requests

## Features

- **Search Page**: 
  - Users can search for dad jokes.
  - Results are displayed as images in a card layout.
  - Each joke has a favorite button to save it to the database.
  
- **Favorites Page**: 
  - Users can view all saved favorite jokes.
  - This page does not call the API; it fetches data from the local database.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   bash
   git clone https://github.com/kapilinania/jockapi_task.github.io.git
   cd jockapi_task.github.io

   ### Install dependencies:
   Use npm install

  ### Set up MySQL Database:

Create a MySQL database and a table for favorite jokes. Use the following schema:

CREATE TABLE favourites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    joke_id VARCHAR(255) NOT NULL,
    joke TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

### Environment Variables:

Create a .env file in the root directory and add your database connection details:
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

### Run the Application:
npm start
Visit the application: Open your browser and navigate to http://localhost:3000.

### Usage
Search for Jokes: Enter a search term in the search bar and click "Search" to find dad jokes.
Favorite a Joke: Click the heart icon to save a joke to your favorites.
View Favorites: Click on the "View Favorite Jokes" button to see all saved jokes.


