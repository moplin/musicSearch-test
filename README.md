# Music Search - Code project
[![Author](http://img.shields.io/badge/author-@moplin-blue.svg?style=flat-square)](https://www.linkedin.com/in/moplin)
[![Codeship](https://img.shields.io/codeship/d6c1ddd0-16a3-0132-5f85-2e35c05e22b1.svg?style=flat-square)](https://app.codeship.com/projects/209222)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

This app is built on Angularjs  to demonstrate some angular / js / html / css / gulp and others knowledge. And also as a simple playground of some other code.

## Overview

### Requirements
Node installed.  
All other handeled with node.

### Install, Run dev server
nmp install  
gulp serve  

### Build
gulp build

### The project uses a lot of
* Angularjs 1.5.x
* NPM / Bower asset managment
* Gulp for internal development pipeline, also on codeship for CI and CD.
* Deployment on Heroku

## About the project
### Requirements of the project
+ Write tests for you code «I will automate testing on CI»
+ Include a build process «taken care by Gulp»
+ Do not use any scaffolding tool or application boilerplate «All by hand, but used a lot of things I already use in my projects»
+ Do not use any CSS framework (i.e. Bootstrap, Foundation, or similar) «Just using Sass and Gulp to compile my CSS»
+ Use a CSS preprocessor «Sass as scss»
+ The site must work fine with the latest version of Chrome, Firefox, Safari, Microsoft Edge and IE11 «I will do my best, still hates EDGE and IE11»
+ Include a README file in which you explain your solution «here»

### Additional instructions
+ Use of design patterns would be a plus
+ Use of JS modules would be a plus
+ Use of caching and local storage would be a plus
+ You may use libraries such as icon packs (font-awesome etc)
+ Make your best judgement on font files
+ Add anything else that could make us say wow!

## Design based on Music Search protototype at:
[Prototype](https://projects.invisionapp.com/share/XVAJ2MMK7#/screens)  
[Document](https://docs.google.com/document/d/1iAIoVCVNkNxbrWKZdeiLfsujEC0CIeZV3Wp_aTqiU00/edit#heading=h.52d0fjtpdj3k)  
[Assets](https://bitbucket.org/compucorp/recruitment-music-search/overview)

### Some other info
[Github project Page](https://moplin.github.io/musicSearch-test/)  
[Postman test for project](https://www.getpostman.com/collections/378371f177930b68cc00)   
[Test 1 jsfiddle - only js to Spotify](http://jsfiddle.net/moplin/6qy6cfat/)  
[Test 2 jsfiddle - integration with angular](http://jsfiddle.net/moplin/c020mLL4/)  
[CSS/Scss TEST jsfiddle - making it work](https://jsfiddle.net/moplin/c95ab9mj/)  


#Continuous Integration / Delivery / Deployment
Here I tested some stuff, I deployed the app using GH-Pages (#easypeasy), the used the heroku internal 
pipelines, and finally I am using all the power of CI/CD from Codeship. I guess nest Playgound will be 
using Doker.   
[APLICATION WORKING GH-PG](https://moplin.github.io/musicSearch-test/dist)   
[Heroku App + Codeship](http://music-search-moplin.herokuapp.com)   
[Heroku App internal pipelines](https://ms-moplin.herokuapp.com)   



Some other
* Trying to stick to Jhon Papa's Code Guide
* ''' git subtree push --prefix dist origin gh-pages '''

##TODOS
* Still need work on the server file to make it pass on heroku
* I need about 3 more days to finish tests and e2e - Sorry
* Need to make the popup / modal work better for big screens (about 3 more hours or less)
* I would like to make the icons of the player behave better
* I would like to plug the angular Spotify module so I can play with playlists (about 8 hours)



by Pablo Palacios  
[linkedin](https://www.linkedin.com/in/moplin/)  
[jsfiddle](http://jsfiddle.net/user/moplin/fiddles/)  

<!---
Principles considered:
1. Code organized and clean (inside modules you will find distribution inside views
2. Prepared for modularity (main app in src/app/music-search)
3. I will do my best to keep controllers simple (DOM interactions or data manipulation)
4. Directives when needed 
  5. Data processing should always be kept in models (my services), that way they can easily be shared between controllers and other services.
  6. Separate server interaction and error handling from the model -contained functions-
7. prefere to use getters / setters for data inter comunication   
8. workflow automated with gulp - bower (for asset pipeline)

Obviusly tring to mantain Style - {Angular 1 Style Guide - johnpapa}
-->
