import Chart from 'chart.js';

/* globals popover */

Template.userMood.onRendered(function () {
  const ctx = document.getElementById("moodChart");
  const handle = this.subscribe('userMood');
  const chart = new Chart(ctx, {
    type: 'bar',
    responsive: true,
    data: {
      labels: ["Happy", "Sad", "Uncertain", "Confused"],
      datasets: [{
        data: [ 0, 0, 0, 0 ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'white',
          'white',
          'white',
          'white',
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  this.autorun(() => {
    const user = Meteor.user();
    var mood = user.mood ? [
			user.mood.happy || 0,
			user.mood.sad || 0,
			user.mood.uncertain || 0,
			user.mood.confused || 0
		] : [ 0, 0, 0, 0 ];
    chart.data.datasets[0].data = mood;
    chart.update();
  });
});

Template.userMood.events({
  'click button'({ target }) {
    Meteor.call('clickUserMood', {
      mood: target.value
    });
  }
});
