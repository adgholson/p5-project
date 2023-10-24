#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports

# Local imports
from app import app
from app import db, User, Game, Review, FavoriteGame



if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        db.create_all()

        db.session.query(User).delete()
        db.session.query(Game).delete()
        db.session.query(Review).delete()
        db.session.query(FavoriteGame).delete()

        print("Creating Users...")
        user1 = User(username="Morgan1", email="morgan1@email.com", password="Password1!")
        user2 = User(username="Morgan2", email="morgan2@email.com", password="Password1!")
        user3 = User(username="Morgan3", email="morgan3@email.com", password="Password1!")
        users = [user1, user2, user3]
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