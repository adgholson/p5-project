#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from flask_bcrypt import Bcrypt

# Remote library imports

# Local imports
from app import app
from app import db, User, Game, Review, FavoriteGame
bcrypt = Bcrypt(app)



if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        db.create_all()

        db.session.query(User).delete()
        db.session.query(Game).delete()
        db.session.query(Review).delete()
        db.session.query(FavoriteGame).delete()

        print("Seeding Users...")
        users_data = [
        {"username": "User1", "email": "user1@email.com", "password": "Entrycode1!"},
        {"username": "User2", "email": "user2@email.com", "password": "Entrycode1!"},
        {"username": "User3", "email": "user3@email.com", "password": "Entrycode1!"},
        {"username": "User4", "email": "user4@email.com", "password": "Entrycode1!"}
        ]
        users = []
        for user_data in users_data:
            user = User(username=user_data["username"], email=user_data["email"])
            user._password_hash = bcrypt.generate_password_hash(user_data["password"]).decode('utf-8')
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        print("Seeding Games...")
        sly1 = Game(title="Sly Cooper and the Thievius Raccoonus", description="Follow master thief Sly Cooper and his gang, Bentley the Turtle and Murray the Hippo, as they seek out criminals known as the Fiendish Five to recover the pages of the 'Thievius Raccoonus'!", release_date="2002-09-23", cover_image="https://www.slycoopernet.com/uploads/7/6/6/2/7662758/sly1_1.jpg", platforms="PS2, PS3, PSVita")
        sly2 = Game(title="Sly 2: Band of Thieves", description="Follow the Cooper Gang: Sly Cooper the thief, Bentley the brains, and Murray the brawn, as they try to collect the pieces of the robotic owl 'Clockwerk' from the Klaww Gang!", release_date="2004-09-14", cover_image="https://www.slycoopernet.com/uploads/7/6/6/2/7662758/sly2_2.jpg", platforms="PS2, PS3, PSVita")
        sly3 = Game(title="Sly 3: Honor Among Thieves", description="Follow Sly Cooper and the gang as they recruit a team of world-class thieves in order to penetrate his family vault of massive wealth and collect his inheritance!", release_date="2005-09-26", cover_image="https://www.slycoopernet.com/uploads/7/6/6/2/7662758/sly3_3.jpg", platforms="PS2, PS3, PSVita")
        sly4 = Game(title="Sly Cooper: Thieves in Time", description="Follow Sly Cooper and his gang as they reunite and travel back through time in order to protect the Cooper legacy!", release_date="2013-02-05", cover_image="https://www.slycoopernet.com/uploads/7/6/6/2/7662758/sly4_2.jpg", platforms="PS3, PSVita")
        games = [sly1, sly2, sly3, sly4]
        db.session.add_all(games)
        db.session.commit() 

        print("Seeding Reviews...")
        review1 = Review(content="This game is the best in the series!", rating=10, user_id=1, game_id=1)
        review2 = Review(content="This game is the best in the series!", rating=9, user_id=2, game_id=2)
        review3 = Review(content="This game is the best in the series!", rating=10, user_id=3, game_id=3)
        review4 = Review(content="This game is the best in the series!", rating=9, user_id=4, game_id=4)
        reviews = [review1, review2, review3, review4]
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding FavoriteGames...")
        favorite_game1 = FavoriteGame(user_id=1, game_id=1)
        favorite_game2 = FavoriteGame(user_id=2, game_id=2)
        favorite_game3 = FavoriteGame(user_id=3, game_id=3)
        favorite_game4 = FavoriteGame(user_id=4, game_id=4)
        favorite_games = [favorite_game1, favorite_game2, favorite_game3, favorite_game4]
        db.session.add_all(favorite_games)
        db.session.commit()
        
        print("Done seeding!")