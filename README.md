[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

# ЯPlace

## Description

This is a full-stack, single-page React application making use of MongoDB, Mongoose, Material UI, Node, Express, Apollo, GraphQL, and JWT. This is a social media app meant to hearken back to the olden days of MySpace. The app is deployed to Heroku or it can be cloned and run locally.

## Table of Contents

* [MVP](#mvp)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contribute](#contribute)
* [Creators](#creators)

## MVP

    1. The MVP is to have a fully functional application that includes:
    2. A home page, profile/settings page, friends page
    3. Ability to add/delete the following:
        A. Friends
            i. Via confirmed friend requests
        B. Posts
        C. Comments
            i. Both post and profile comments
        D. Music choice
    5. Ability to make posts and see friend's posts/comments on the home page and profile page
    6. Ability to customize your profile page
    7. Ability to find new friends using a search tool

## Technologies

    Frontend: React
    Styling:  Material UI
    DB: MongoDB
    ODM: Mongoose
    Server: Express.js
    Request: GraphQL

## Installation

    - Clone the repository to your local machine
    - Open a terminal, navigate to the cloned directory, and open it with your source-code editor
    - Make sure Node.js & MongoDB is downloaded and installed following these instructions
    - Type the command 'npm install' to install all project dependencies
    - Type the command 'npm run build' to flesh out all necessary components in the client folder
    - Type the command 'npm run develop' to initiate  run the app
### Alternatively, access our deployed application via Heroku: [ЯPlace](https://)

## Usage

### Proceed to Sign Up as a first time user and create an account
![Screenshot](./public/assets/)
### Once you've logged in, you will be navigated to your home page. This houses a feed of all your friends posts collected in one place.
![Screenshot](./public/assets/)
### Your top nav bar allows you to move about the site, clicking on our logo brings you back home to this page. The search bar allows you to look for other users (once searched, you can view their profile or add them as a friend).
![Screenshot](./public/assets/)
### The Profile button brings you to your personal profile page. To begin populating and personalizing your profile, click on Settings on the nav bar to customize the elements and styles you will see.
![Screenshot](./public/assets/)
### The Friends button on the nav bar brings you to a list of all your friends on the site.
![Screenshot](./public/assets/)
### While on others profiles, you can post on their wall and check out the unique cusomizations they may have chosen for their page.
![Screenshot](./public/assets/)
### Clicking Sign Out on the top nav bar will end your session on the site and return you to the login page.

## Breakdown

### Main Components

    1. NavBar, static, top
        A. Home
        B. SearchBar
        C. Notifications
        D. Profile
        E. Friends
        F. Settings
        G. Sign Out
    3. Post/Share/Comments [on Feed and Profile]
        A. Profile Pic
        B. Text Entry

### Profile
    1. Status
        List of your recent posts
    2. Top Friends
        Ability to rearrange your friends
    3. Profile Comments
        Ability to delete comments on your page
    4. Music
        YT is MVP, spotify if we can get it
    5. Settings/Customization
        - Color, background, font, etc
        - Allow users to use their own HTML/CSS
        - Have basic templates for users

### Landing Page

    1. List of posts from your friends
    2. Comments from each post, ability to expand to show all of them
    4. Advertisements 'all over the place'

### Database

    1. User Account(?)
        A. Name
            i. First, last ✅
        B. Email ✅
        C. Password ✅
            i. Hashed ✅
        D. [Message IDs]
        E. [Posts] ✅
        Ei. [Page_Posts] ✅
        F. [Comments] ✅
        G. [Friends] ✅
        Gi. [PendingFriends] ✅
        H. Profile
    2. Posts
        A. Tied to User account ✅
        B. Basically just text ✅
        Ba. Could be images in future
        C. [Post_Comments] ✅
    2a. Page_Posts
        A. Tied to User account ✅
        Aa. Tied to User poster ✅
        B. Text, maybe images ✅
    3. Post_Comments
        A. Tied to posts ✅
        B. Tied to User who made the comment ✅
        C. Text ✅
    4. Friends
        A. Array of other User accounts ✅
            i. Accepted friend's ID
    4a. PendingFriends
        A. Array of pending friends ✅
        B. Array of sent to friends ✅
    5. Profile
        A. Tied to User account ✅
        B. Music_Choice ✅
            i. Saved URL from YT or Spotify
        C. Top_friends ✅
            i. Tied to Friends
            ii. Ordered array of picked Friends
        D. Posts from user ✅
            i. Tied to Posts
            ii. Tied to Post_Comments

## License

This project is covered under the [ISC License](https://opensource.org/licenses/ISC)

## Contribute

If you wish to contribute to this project, follow these steps:

- Fork the repository
- Clone or download to your local machine
- Make any changes/updates and push to your remote fork
- Start a pull request

## Creators

* [Corey Bennett](https://github.com/CWheelsRun)
* [Shawn Canavan](https://github.com/shawnbandy)
* [Mac Greene](https://github.com/macgreene14)
* [Terry Kim](https://github.com/TeryKing)
* [Hunter O'Neal](https://github.com/HellaHunter)