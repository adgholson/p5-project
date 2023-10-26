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
        {"username": "User3", "email": "user3@email.com", "password": "Entrycode1!"}
        ]
        users = []
        for user_data in users_data:
            user = User(username=user_data["username"], email=user_data["email"])
            user._password_hash = bcrypt.generate_password_hash(user_data["password"]).decode('utf-8')
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        print("Seeding Games...")
        game1 = Game(title="Game1", description="This is a description for this game, its pretty fun!", release_date="2023-01-01", cover_image="imageURL", genres="Action", platforms="PS")
        game2 = Game(title="Game2", description="This is a description for this game, its pretty fun!", release_date="2023-01-01", cover_image="imageURL", genres="Action", platforms="PS")
        game3 = Game(title="Game3", description="This is a description for this game, its pretty fun!", release_date="2023-01-01", cover_image="imageURL", genres="Action", platforms="PS")
        games = [game1, game2, game3]
        db.session.add_all(games)
        db.session.commit() 

        print("Seeding Reviews...")
        review1 = Review(content="This is the content for review1.", rating=7, user_id=1, game_id=1)
        review2 = Review(content="This is the content for review2.", rating=6, user_id=2, game_id=2)
        review3 = Review(content="This is the content for review3.", rating=5, user_id=3, game_id=3)
        reviews = [review1, review2, review3]
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding FavoriteGames...")
        favorite_game1 = FavoriteGame(user_id=1, game_id=3)
        favorite_game2 = FavoriteGame(user_id=2, game_id=2)
        favorite_game3 = FavoriteGame(user_id=3, game_id=1)
        favorite_games = [favorite_game1, favorite_game2, favorite_game3]
        db.session.add_all(favorite_games)
        db.session.commit()
        
        print("Done seeding!")