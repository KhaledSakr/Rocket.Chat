Meteor.methods({
	clickUserMood({mood}) {
        RocketChat.models.Users.setUserMood(Meteor.userId(), mood);
		return true;
	}
});
