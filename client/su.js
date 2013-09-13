Users = new Meteor.Collection(null);

Meteor.startup(function() {
  Users.insert({ name: 'bob' });
  Users.insert({ name: 'mary' });
  Users.insert({ name: 'sam' });
});

Session.set('select.user.focus', false);

Template.selectUser.events({
  'keyup input': function(e, t) {
    Session.set('select.user.input', $(e.target).val());
  }
});

Template.selectUser.helpers({
  options: function() {
    var query = Session.get('select.user.input');
    var re = '^' + query;
    return Users.find({name: {$regex: re}});
  }
});
