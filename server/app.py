#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import session, make_response, request
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api, CORS
# Add your model imports
from models import *

# Views go here!
CORS(app)

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'login',
        'check_session'
    ]
    if (request.endpoint) not in open_access_list and (not session.get('user_id')):
        return {'error': '401 Unauthorized'}, 401

@app.route('/games/<int:game_id>/reviews', methods=['GET'])
def get_game_reviews(game_id):
    selected_game = Game.query.get(game_id)
    if selected_game:
        game_reviews = selected_game.reviews
        reviews_data = []
        for review in game_reviews:
            review_data = {
                "id": review.id,
                "content": review.content,
                "rating": review.rating,
                "user_id": review.user_id
            }
            reviews_data.append(review_data)
        return jsonify({"reviews": reviews_data}), 200
    else:
        return jsonify({"error": "Game not found"}), 404


games = []
users = []
reviews = []

class Users(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        return make_response({"users": user_list}, 200)

class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
            return make_response(user_data, 200)
        else:
            return make_response({"error": "User not found"}, 404)

class Games(Resource):
    def get(self):
        games = Game.query.all() 
        game_list = []
        for game in games:
            game_data = {
                "id": game.id,
                "title": game.title,
                "description": game.description,
                "release_date": game.release_date,
                "cover_image": game.cover_image,
                "platforms": game.platforms
            }
            game_list.append(game_data)
        return make_response({"games": game_list}, 200)

class GameById(Resource):
    def get(self, id):
        game = Game.query.get(id) 
        if game:
            game_data = {
                "id": game.id,
                "title": game.title,
                "description": game.description,
                "release_date": game.release_date,
                "cover_image": game.cover_image,
                "platforms": game.platforms
            }
            return make_response(game_data, 200)
        else:
            return make_response({"error": "Game not found"}, 404)

class Signup(Resource):
    def post(self):
        request_json = request.get_json()
        email = request_json.get('email')
        username = request_json.get('username')
        password = request_json.get('password')
        
        user = User(
            email=email,
            username=username,
        )
        user.set_password(password)
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except IntegrityError:
            db.session.rollback()
            return {'error': '422 Unprocessable Entity'}, 422

class Login(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        password = request_json.get('password')
        
        user = User.find_by_username(username)
        if user and user.verify_password(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {'error': 'Invalid username or password'}, 401

class ReviewsByGameId(Resource):
    def get(self, game_id):
        reviews = Review.query.filter_by(game_id=game_id).all()
        review_list = [{
            "id": review.id,
            "content": review.content,
            "rating": review.rating,
            "user_id": review.user_id,
            "game_id": review.game_id
        } for review in reviews]
        return make_response({"reviews": review_list}, 200)

class ReviewsByUserId(Resource):
    def get(self, user_id):
        reviews = Review.query.filter_by(user_id=user_id).all() 
        review_list = [{
            "id": review.id,
            "content": review.content,
            "rating": review.rating,
            "user_id": review.user_id,
            "game_id": review.game_id
        } for review in reviews]
        return make_response({"reviews": review_list}, 200)

class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        review_list = []
        for review in reviews:
            review_data = {
                "id": review.id,
                "content": review.content,
                "rating": review.rating,
                "user_id": review.user_id,
                "game_id": review.game_id
            }
            review_list.append(review_data)
        return make_response({"reviews": review_list}, 200)

    def post(self):
        data = request.get_json()
        content = data.get("content")
        rating = data.get("rating")
        user_id = data.get("user_id")
        game_id = data.get("game_id")

        if not content or not rating or not user_id or not game_id:
            return make_response({"error": "Missing required fields"}, 400)

        user = User.query.get(user_id)
        game = Game.query.get(game_id)

        if not user or not game:
            return make_response({"error": "Invalid user_id or game_id"}, 404)

        new_review = Review(content=content, rating=rating, user=user, game=game)
        db.session.add(new_review)
        db.session.commit()

        return make_response({"message": "Review added successfully"}, 201)

class ReviewById(Resource):
    def delete(self, review_id):
        review = Review.query.get(review_id)
        if review:
            db.session.delete(review)
            db.session.commit()
            return make_response({"message": "Review deleted successfully"}, 200)
        else:
            return make_response({"error": "Review not found"}, 404)
        
    def patch(self, review_id):
        review = Review.query.get(review_id)
        if review:
            data = request.get_json()
            review.content = data.get("content")
            review.rating = data.get("rating")
            db.session.commit()
            return make_response({"message": "Review updated successfully"}, 200)
        else:
            return make_response({"error": "Review not found"}, 404)

api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(Games, "/games")
api.add_resource(GameById, "/games/<int:id>")
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(ReviewsByGameId, "/reviews/game/<int:game_id>")
api.add_resource(ReviewsByUserId, "/reviews/user/<int:user_id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(ReviewById, "/reviews/<int:review_id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)