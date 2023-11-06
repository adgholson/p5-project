# The LegendDairy App

The LegendDairy App is a web application that allows users to explore and review the Sly Cooper videogame series. Users can create accounts, log in, browse the games, view detailed game information, write and read reviews, and add a game as their favorite. The app provides a seamless user experience, making it easy for fans to share their thoughts about the Sly Cooper games.

## Features

### User Authentication and Management
-Signup: Users can create an account by providing a unique username, email address, and password. Passwords are securely hashed before storage in the database.
-Login: Registered users can log in using their username and password, granting them access to personalized features.
-User Profiles: Each user has a profile page displaying their information.
-Session Management: User sessions are managed securely to ensure a smooth and secure user experience.

### Game Information
-Game Listing: Users can view a list of games, each displaying the game's title and cover image.
-Game Details: Clicking on a game reveals more detailed information, including a comprehensive description and supported gaming platforms.

### Reviews and Ratings
-Review Creation: Users can write reviews for each game, providing their thoughts and opinions about the gameplay, graphics, and overall experience.
-Rating System: Reviews include a rating from 1 to 10, allowing users to score games based on their preferences.
-Review Management: Users can edit or delete their reviews to update their feedback.

### Favorite Games
-Favorites: Users can add game as their favorite, making it easy to keep track of their preferred title.
-Favorite Game Display: Users can view their favorite game.

### Real-Time Notifications
Real-Time Notifications: Users receive real-time updates about new reviews for their favorite game, enhancing their engagement with the community.

## Technologies Used

-Frontend: The frontend of the app is built using HTML, CSS, JavaScript, and React.js. It provides an intuitive and responsive user interface for users to interact with the application.

-Backend: The backend is developed with Python and Flask, utilizing Flask-RESTful for creating APIs, Flask-SQLAlchemy for database interactions, and Flask-Bcrypt for secure password hashing.

-Database: The app uses an SQLite database to store user data, game information, reviews, and favorite games.

-Real-Time Notifications: Real-time updates are implemented using EventSource to stream new review data to the frontend as soon as it becomes available.

## Getting Started

To run the Game Review App locally, follow these steps:

1. Clone the Repository:
    git clone [https://github.com/adgholson/p5-project.git]
2. Install Dependencies:
    pip install -r requirements.txt
3. Run the Backend:
    python app.py
4. Set Up the Frontend:
    Navigate to the frontend directory.
    Run npm install
    Run npm start
5. Access the App:
    Open your web browser and visit http://localhost:3000 to access the app.

## Contributing
This app was made my GitHub user **adgholson**! Contributions are welcome! Feel free to open issues or submit pull requests to improve the application or fix any bugs.