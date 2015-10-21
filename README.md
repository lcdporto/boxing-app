# README #

## Boxing Lab APP ##

The Boxing Lab APP is an application built to provide a faster and easier way to find objects in the Laboratory.
The application was built using AngularJS. It's a SPA consuming a RESTful API.
Feel free to report issues and contribute with some PullRequests

* The most upfront (with features being tested) branch is the "master" branch
* The branch currently running into the server is the "production" branch
* Current version **0.1**

### How do I get set up? ###

* Clone the repository
* Install Dev dependencies with 
```
#!shell

npm install
```
* Install the APP dependencies with
```
#!shell

bower install

```

* Copy the app.settings.js available on the /dist folder to the /app folder
* If needed tweak the settings to match you setup

```
#!shell

cp dist/app.settings.js .

```

* If everything went well, you can run the server with

```
#!shellscript

./gulp
```

*


### Contribution guidelines ###

* Whenever you finish coding something, please try and see if there is conflicts with the most recent version in the branch "master"
* If possible, try to write tests to fully cover your feature

### Who do I talk to? ###

If you have something to say, feel free to contact:
* Ighor Martins (ighor.martins@gmail.com)
* Ricardo Lobo (ricardolobo@audienciazero.org)

You can always come to our Lab too :)
More info at: http://labcd.org/