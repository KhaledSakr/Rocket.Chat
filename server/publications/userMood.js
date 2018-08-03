Meteor.publish('userMood', function() {
	if (!this.userId) {
		return this.ready();
	}

	return RocketChat.models.Users.find(this.userId, {
		fields: {
            'mood.happy': 1,
            'mood.sad': 1,
            'mood.confused': 1,
            'mood.uncertain': 1
		}
	});
});
