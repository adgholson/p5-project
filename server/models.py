from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash
from datetime import datetime
import re

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    # Relationships
    reviews = db.relationship('Review', backref='user_reviews', lazy=True)
    favorite_games = db.relationship('FavoriteGame', backref='user_favorite_games', lazy=True)
    favorite_games_proxy = association_proxy('user_favorite_games', 'game')
    reviews_proxy = association_proxy('user_reviews', 'game')

    # Serialization Rules
    serialize_rules = ('-password', '-reviews.user', '-favorite_games.user',)

    # Validations
    @validates('username')
    def validate_username(self, key, username):
        if not username or len(username) < 5 or len(username) > 15 or not any(char.isdigit() for char in username):
            raise ValueError("Username is required and must be between 5 and 15 characters and contain at least one number.")
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Email is required and must fit example@email.com format.")
        return email

    @validates('password')
    def validate_password(self, key, password):
        if not password or len(password) < 6 or not any(char.isupper() for char in password) or not any(char.islower() for char in password) or not any(char.isdigit() for char in password) or not any(char in "!@#$%^&*()_+{}[]|\\:;<>,.?/~" for char in password):
            raise ValueError("Password is required and must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
        return generate_password_hash(password)
        
    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.email}, {self.password}>'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)

    # Relationships
    user = db.relationship('User', backref='user_reviews', lazy=True)
    game = db.relationship('Game', backref='game_reviews', lazy=True)
    user_proxy = association_proxy('user', 'username')

    # Serialization Rules
    serialize_rules = ('-user.reviews', '-game.reviews',)

    # Validations
    @validates('content')
    def validate_content(self, key, content):
        if len(content) < 30:
            raise ValueError("Review content must be at least 30 characters long.")
        return content

    @validates('rating')
    def validate_rating(self, key, rating):
        if not 1 <= rating <= 10:
            raise ValueError("Rating must be a number between 1 and 10.")
        return rating

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        user = User.query.get(user_id)
        if not user:
            raise ValueError("Invalid user ID.")
        return user_id

    @validates('game_id')
    def validate_game_id(self, key, game_id):
        game = Game.query.get(game_id)
        if not game:
            raise ValueError("Invalid game ID.")
        return game_id

    def __repr__(self):
        return f'<Review {self.id}, {self.content}, {self.rating}, {self.user_id}, {self.game_id}>'

class FavoriteGame(db.Model, SerializerMixin):
    __tablename__ = 'favorite_games'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)

    # Relationships
    user = db.relationship('User', backref='user_favorite_games', lazy=True)
    game = db.relationship('Game', backref='favorite_games', lazy=True)
    game_proxy = association_proxy('game', 'title')

    # Serialization rules
    serialize_rules = ('-user.favorite_games', '-game.favorites',)

    # Validations
    @validates('user_id')
    def validate_user_id(self, key, user_id):
        user = User.query.get(user_id)
        if not user:
            raise ValueError("Invalid user ID.")
        return user_id

    @validates('game_id')
    def validate_game_id(self, key, game_id):
        game = Game.query.get(game_id)
        if not game:
            raise ValueError("Invalid game ID.")
        return game_id

    def __repr__(self):
        return f'<FavoriteGame {self.id}, {self.user_id}, {self.game_id}>'
    
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    release_date = db.Column(db.String, nullable=False)
    cover_image = db.Column(db.String, nullable=False)
    genres = db.Column(db.String, nullable=False)
    platforms = db.Column(db.String, nullable=False)

    # Relationships
    reviews = db.relationship('Review', backref='game_reviews', lazy=True)
    favorites = db.relationship('FavoriteGame', backref='game_favorites', lazy=True)
    favorite_users_proxy = association_proxy('game_favorites', 'user')
    review_users_proxy = association_proxy('game_reviews', 'user')

    # Serialization rules
    serialize_rules = ('-reviews.game', '-favorites.game',)

    # Validations
    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Title is required.")
        return title

    @validates('description')
    def validate_description(self, key, description):
        if len(description) < 30:
            raise ValueError("Description must be at least 30 characters long.")
        return description

    @validates('release_date')
    def validate_release_date(self, key, release_date):
        try:
            datetime.strptime(release_date, '%Y-%m-%d')
        except ValueError:
            raise ValueError("Invalid release date format. Please use YYYY-MM-DD.")
        return release_date

    @validates('cover_image')
    def validate_cover_image(self, key, cover_image):
        if not cover_image:
            raise ValueError("Cover image is required.")
        return cover_image

    @validates('genres')
    def validate_genres(self, key, genres):
        if not genres:
            raise ValueError("Genres are required.")
        return genres

    @validates('platforms')
    def validate_platforms(self, key, platforms):
        if not platforms:
            raise ValueError("Platforms are required.")
        return platforms

    def __repr__(self):
        return f'<Game {self.id}, {self.title}, {self.description}, {self.release_date}, {self.cover_image}, {self.genres}, {self.platforms}>'