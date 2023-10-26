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


games = []
users = []

class Users(Resource):
    def get(self):
        return make_response({"users": users}, 200)

class Games(Resource):
    def get(self):
        return make_response({"games": games}, 200)

    def post(self):
        data = request.get_json()
        games.append(data)
        return make_response(data, 201)

class GameById(Resource):
    def get(self, id):
        game = next((game for game in games if game["id"] == id), None)
        if game:
            return make_response(game, 200)
        else:
            return make_response({"error": "Game not found"}, 404)

    def put(self, id):
        game = next((game for game in games if game["id"] == id), None)
        if game:
            data = request.get_json()
            game.update(data)
            return make_response(game, 200)
        else:
            return make_response({"error": "Game not found"}, 404)

    def delete(self, id):
        global games
        games = [game for game in games if game["id"] != id]
        return make_response({}, 204)

class UserFavorites(Resource):
    def get(self, user_id):
        user = next((user for user in users if user["id"] == user_id), None)
        if user:
            favorites = user.get("favorites", [])
            return make_response({"favorites": favorites}, 200)
        else:
            return make_response({"error": "User not found"}, 404)

class AddFavoriteGame(Resource):
    def post(self, user_id, game_id):
        user = next((user for user in users if user["id"] == user_id), None)
        if user:
            game = next((game for game in games if game["id"] == game_id), None)
            if game:
                user.setdefault("favorites", []).append(game)
                return make_response(game, 201)
            else:
                return make_response({"error": "Game not found"}, 404)
        else:
            return make_response({"error": "User not found"}, 404)

class RemoveFavoriteGame(Resource):
    def delete(self, user_id, game_id):
        user = next((user for user in users if user["id"] == user_id), None)
        if user:
            favorites = user.get("favorites", [])
            game = next((game for game in favorites if game["id"] == game_id), None)
            if game:
                user["favorites"].remove(game)
                return make_response({}, 204)
            else:
                return make_response({"error": "Game not in favorites"}, 404)
        else:
            return make_response({"error": "User not found"}, 404)

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

api.add_resource(Users, "/users")
api.add_resource(Games, "/games")
api.add_resource(GameById, "/games/<int:id>")
api.add_resource(UserFavorites, "/users/<int:user_id>/favorites")
api.add_resource(AddFavoriteGame, "/users/<int:user_id>/favorites/<int:game_id>")
api.add_resource(RemoveFavoriteGame, "/users/<int:user_id>/favorites/<int:game_id>")
api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == "__main__":
    app.run(port=5555, debug=True)