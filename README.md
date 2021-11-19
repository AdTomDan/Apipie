# Apipie - Good 'Piebrations'

## Description
A social network for lovers of baking. A fun place to share your best recipes and make new friends.

## User stories (MVP)
404 - Occupied - As users, we want to see a fun page when URL does not exist
500 - As users, we want to be told when an error has occured and it is not our fault
Login - As users, we would like a page where we can easily login
Sign Up - As users, we want to be able to quickly and easily join the platform
Feed - As users, we would like to be able to scroll through new bakery related content posted by other users, as well as post our own content
Library - As users, we want to be able to search for recipes of pies (etc.) in a fast and fun way to discover new pies
Profile page (editable) - As users, we want to be able to update our details as well as see you favourite pies and our own posts
## Backlog / Nice to have
Social media sign up
Dynamic search
Groups
## Routes
| Name    | Method | Endpoint | Description                                          | Body                         | Redirects  |
|---------|--------|----------|------------------------------------------------------|------------------------------|------------|
| Login   | GET    | /        | Login page                                           |                              |            |
| Login   | POST   | /Library | The page to search for pies                          | username,password            | library    |
| Sign-Up | GET    | /Sign-up | Sign up page                                         |                              | library    |
| Sign-Up | POST   | /Sign-up | When you click the sign-up                           | username,email,name,password |            |
| Feed    | GET    | /Feed    | News feed style page for seeing posts                |                              |            |
| Feed    | GET    | /Feed    | Like a post                                          |                              |            |
| Feed    | POST   | /Feed    | Comment on a post                                    |                              |            |
| Feed    | POST   | /Feed    | Create a post (recipe or photo)                      |                              |            |
| Library | GET    | /Library | Page that displays POTD, and search bar plus filters |                              |            |
| Library | GET    | /Library | Favourite a POTD                                     |                              |            |
| Library | POST   | /Library | Searches the API                                     |                              | Search/:id |
|         |        |          |                                                      |                              |            |
## Models
```
const { Schema, model } = require(‘mongoose’);
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    favourites: [
        {
            type: Schema.Types.ObjectId,
            ref: “favourites”
        }
    ]
});
const User = model(‘User’, userSchema);
module.exports = User;

const { Schema, model } = require(‘mongoose’);
const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    taste: {
        type: Array,
        items: {
            “type”: String,
            “enum”: [Sweet, Salty, Sour, Bitter, Savory, Fatty]
        }
    }
});
const Recipe = model(‘Recipe’, recipeSchema);
module.exports = Recipe;
```

## Links