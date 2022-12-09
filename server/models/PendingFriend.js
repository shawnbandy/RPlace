const { Schema, model } = require('mongoose');

//*idea is to that when you send a friend request to a user, this schema is updated on 2 people
/*
Friend ID 1 sends a request to friend ID 2
Request 1: Friend ID 1 will make a 'sent', where the type:String is the ID of friend 2. 
Request 2: Makes a 'pendingUserAccept',  where the type:String is the ID of friend 1.
The trick is that request 1 will be tied to Friend ID 1's User 
Request 2 will be tied to Friend ID 2
*/
const pendingFriendSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
});

const PendingFriend = model('pendingFriendSchema', pendingFriendSchema);

module.exports = PendingFriend;
