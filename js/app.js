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



// ----------------- \
// CONTROLLERS
// ----------------- \




// ----------------- \
// VIEWS
// ----------------- \




