from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime
import re
from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }
    
    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    def verify_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    # Relationships
    reviews = db.relationship('Review', backref='user_reviews', lazy=True, overlaps="user")
    favorite_games = db.relationship('FavoriteGame', backref='user_favorite_games', lazy=True, overlaps="user")
    favorite_games_proxy = association_proxy('user_favorite_games', 'game')
    reviews_proxy = association_proxy('user_reviews', 'game')

    # Serialization Rules
    serialize_rules = ('-reviews.user', '-favorite_games.user', '-_password_hash',)

    # Validations
    @validates('email')
    def validate_email(self, key, email):
        if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Email is required and must fit example@email.com format.")
        return email

    @validates('_password_hash')
    def validate__password_hash(self, key, _password_hash):
        if not _password_hash or len(_password_hash) < 4 or not any(char.isdigit() for char in _password_hash) or not any(char in "!@#$%^&*()_+{}[]|\\:;<>,.?/~" for char in _password_hash):
            raise ValueError("Password is required and must contain at least one number, and one special character.")
        if not _password_hash.startswith('$2b$'):
            return bcrypt.generate_password_hash(_password_hash).decode('utf-8')
        return _password_hash
        
    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.email}>'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)

    # Relationships
    user = db.relationship('User', backref='user_reviews', lazy=True, overlaps="reviews")
    game = db.relationship('Game', backref='game_reviews', lazy=True, overlaps="reviews")
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
        try:
            rating = int(rating) 
            if not 1 <= rating <= 10:
                raise ValueError("Rating must be a number between 1 and 10.")
            return rating
        except ValueError:
            raise ValueError("Invalid rating. Please provide a valid number between 1 and 10.")

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
    user = db.relationship('User', backref='user_favorite_games', lazy=True, overlaps="favorite_games")
    game = db.relationship('Game', backref='favorite_games', lazy=True, overlaps="favorite_games")
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
    platforms = db.Column(db.String, nullable=False)

    # Relationships
    reviews = db.relationship('Review', backref='game_reviews', lazy=True, overlaps="game")
    favorites = db.relationship('FavoriteGame', backref='game_favorites', lazy=True, overlaps="game")
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

    @validates('platforms')
    def validate_platforms(self, key, platforms):
        if not platforms:
            raise ValueError("Platforms are required.")
        return platforms

    def __repr__(self):
        return f'<Game {self.id}, {self.title}, {self.description}, {self.release_date}, {self.cover_image}, {self.platforms}>'