# Gameplan

Gameplan is a simple solution for consultancies and large, dynamic organizations to keep track
of who is currently on what project and what rotations are planned.

## Installation

Gameplan is BSD-licensed source code written in Ruby on Rails.  Feel free to fork and rebuild it to suit your needs.
It will run on any standard Rails server.

The code has been tested against the version of Ruby referenced in the .ruby-version file, but should run on anything above Ruby 2.0

To get started with the project, clone this repository, `cd` into your local checkout and enter the following:

```
bundle install
rake db:create:all
rake db:migrate:all
```


### Demo Data
If you'd like to generate some demo data to see how gameplan works, use `rake populate:plan`.


### Admin Privileges

To view the admin interface where you can enter your projects and personnel, you'll need to set the admin column on your user to 'true';
You can do this via the rails console, like so:

```
± |master ✗| → rails c
Loading development environment (Rails 4.2.0)
irb(main):001:0> u = User.find 1
  User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT 1  [["id", 1]]
=> #<User id: 1, first_name: nil, name: "Austin", email: "austin@foo.com", image: nil, admin: nil, created_at: "2015-07-12 16:40:20", updated_at: "2015-07-12 16:40:20">
irb(main):002:0> u.update_attributes admin: true
   (0.2ms)  begin transaction
  SQL (0.5ms)  UPDATE "users" SET "admin" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["admin", "t"], ["updated_at", "2015-07-13 04:37:03.488296"], ["id", 1]]
   (3.4ms)  commit transaction
=> true
irb(main):003:0> exit

|ruby-2.2.2@gameplan| balaam in ~/projects/gameplan
± |master ✗| →
```

## Auth via Google

Gameplan supports authentication via the Google API.  You'll want to set the following environment variables in your terminal.

```
export GOOGLE_OAUTH2_CLIENT_ID=[your client id here]
export GOOGLE_OAUTH2_CLIENT_SECRET=[your client secret here]
```

Here's a (handy walkthrough)[https://www.twilio.com/blog/2014/09/gmail-api-oauth-rails.html] on how to get these values from the Google API console

## Google Apps Domain-Specific Access

You may also want to limit your version of Gameplan to only allow visitors from a particular Google-hosted domain.  If so, add this to your environment variables:

```
export GOOGLE_OAUTH2_REQUIRED_DOMAIN=yourdomain.com
```

## Tests

This app has both rspec and konacha tests.  To run the tests, use:

```
rake spec
rake konacha:run
```


