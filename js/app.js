// first things first: let's create our app
window.App = Ember.Application.create();

// ----------------- \
// ROUTING
// ----------------- \

// this is where we declare our routes
App.Router.map(function(){
    // this route will be our list of all users
    this.resource('users', function(){
        // this one is nested and is dynamic, we need it to see one user at a time with its id
        this.resource('user', { path:'/:user_id' }, function(){
            // and another nested one for editing the current user
            this.route('edit');
        });
        // and finally the create route nested in users
        this.route('create');
    });
});


// we can customize what's happening when accessing the users route
// here we simply retreive datas from our model and assign it to the usersRoute model
// http://emberjs.com/guides/routing/specifying-a-routes-model/
App.UsersRoute = Ember.Route.extend({
    model: function(){
        return App.User.find();
    }
});

App.UserRoute = Ember.Route.extend({
    // because we followed Ember's naming conventions 
    // this route's model is auto generated internally 
    /*model: function(params) { 
        return App.User.find(params.post_id);
    }*/
    setupController: function(controller){
        // to ensure the deleteMode is disabled when entering the route
        controller.set('deleteMode', false);
    }
});

App.UserEditRoute = Ember.Route.extend({
    // sets the model to the user model
    model: function(){
        return this.modelFor('user');
    }
});

App.UsersCreateRoute = Ember.Route.extend({
    // sets the model to an empty object
    model: function(){
        return {};
    }
});

// ----------------- \
// CONTROLLERS
// ----------------- \

// the usersRoute grabs a LIST of users so we need an ArrayController 
// because ArrayController are meant to manage multiple models 
// http://emberjs.com/guides/controllers/#toc_representing-models 
App.UsersController = Ember.ArrayController.extend();

// our nested user route will render only a single user at a time 
// so in this case we'll use an ObjectController
App.UserController = Ember.ObjectController.extend({
    deleteMode: false, // the deleteMode property is false by default
    
    delete: function(){
        // now our delete method is only switching deleteMode from true to false and vice versa
        this.toggleProperty('deleteMode', true);
    },
    cancelDelete: function(){
        // cancelDelete sets deleteMode to false
        this.set('deleteMode', false);
    },
    confirmDelete: function(){
        // this will tell Ember Data to delete the current user
        this.get('content').deleteRecord();
        this.transitionToRoute('users');
    },
    edit: function(){ 
        // this will go into the edit route
        this.transitionToRoute('user.edit');
    }
});

App.UserEditController = Ember.ObjectController.extend({
    closeEditing: function(){
        // this will tell Ember-Data to save/persist the new values
        this.get('store').commit();
        // this will go to the parent route
        this.transitionToRoute('user');
    }
});

App.UsersCreateController = Ember.ObjectController.extend({
    addUser: function(){
        // create a new user
        App.User.createRecord(this.content);
        // go to the new user route
        this.transitionToRoute('user');
    }
});


// ----------------- \
// VIEWS
// ----------------- \




