# RPlace

## MVP

    1. The MVP is to have a fully functional application that includes:
    2. A home page, profile page, messenger page
    3. Ability to add/delete the following:
        A. Friends
            i. Via confirmed friend requests
        B. Posts
        C. Comments
            i. Both post and profile comments
        D. Music choice
    4. Ability to message your friends via the messenger page
    5. Ability to make posts and see friend's posts/comments on the home page and profile page
    6. Ability to customize your profile page

### Technologies

    Frontend: React
    Styling:  Material UI
    DB: MongoDB
    ODM: Mongoose
    Server: Express.js
    Request: GraphQL

## COT

    1. Welcome Tutorial
    2. Game Section
    3.

### Main Components

    1. NavBar, static, top
        A. Home
        B. Profile
        C. Messages
        D. Search Bar
        E. TBD
    2. Main page display
        A. Profile, Messenger, Home/Landing page displayed here
    3. ???

### Pages

    1. Profile
        A. Status
            i. List of your recent posts
        B. Top Friends
            i. Ability to rearrange your friends
        C. Profile Comments
            i. Ability to delete comments on your page
        D. Music
            i. YT is MVP, spotify if we can get it
        E. Settings/Customization
            i. Color, background, font, etc
            ii. Allow users to use their own HTML/CSS
            iii. Have basic templates for users

### Messenger

    1. List of conversations
    2. Ability to respond to people

### Landing Page

    1. List of posts from your friends
    2. Comments from each post, ability to expand to show all of them
    3. Friend's list off to the side
    4. Advertisements all over the place

### Database

    1. User Account(?)
        A. Name
            i. First, last
        B. Email
        C. Password
            i. Hashed
        D. [Message IDs]
        E. [Posts]
        Ei. [Page_Posts]
        F. [Comments]
        G. [Friends]
        Gi. [PendingFriends]
        H. Profile
    2. Posts
        A. Tied to User account
        B. Basically just text
        Ba. Could be images in future
        C. [Post_Comments]
    2a. Page_Posts
        A. Tied to User account
        B. Text, maybe images
    3. Post_Comments
        A. Tied to posts
        B. Tied to User who made the comment
        C. Text
    4. Friends
        A. Array of other User accounts
            i. Accepted friend's ID
    4a. PendingFriends
        A. Array of pending friends
        B. Array of sent to friends
    5. Profile
        A. Tied to User account
        B. Music_Choice
            i. Saved URL from YT or Spotify
        C. Top_friends
            i. Tied to Friends
            ii. Ordered array of picked Friends
        D. Posts from user
            i. Tied to Posts
            ii. Tied to Post_Comments
        E. Customization **********
            i. Dark Mode true false?
            ii. Save as JSON then parse on page load to set HTML
    6. Messages
        A. Sender
        B. Recipient
        C. List of messages
