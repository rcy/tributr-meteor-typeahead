Users = new Meteor.Collection(null);

Meteor.startup(function() {
  Users.insert({ name: 'bob' });
  Users.insert({ name: 'bob' });
  Users.insert({ name: 'beatrice' });
  Users.insert({ name: 'mary' });
  Users.insert({ name: 'mike' });
  Users.insert({ name: 'sam' });
  Users.insert({ name: 'ephraim' });
  Users.insert({ name: 'eugene' });
  Users.insert({ name: 'ryan' });
  Users.insert({ name: 'geoff' });
});

Template.selectUser.events({
  'keyup input': function(e, t) {
    Session.set('select.user.input', $(e.target).val());
  }
});

Template.selectUser.helpers({
  options: function() {
    var query = Session.get('select.user.input');
    if (query && query.length) {
      var re = '^' + query;
      return Users.find({name: {$regex: re}});
    }
  }
});

Template.selections.helpers({
  item: function() {
    return Users.findOne(Session.get('selected.id'));
  }
});

Template.selections.events({
  'click [data-action=clear]': function() {
    Session.set('selected.id', null);
  }
});

Template.option.events({
  'click': function() {
    Session.set('selected.id', this._id);
    Session.set('select.user.input', null);
  }
});
