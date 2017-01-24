# Alchemy 

> Alchemy is backbone for living styleguides.
> v-0.0.1

## How to install

Prerequisites:
* [Node.js](http://nodejs.org/) >=0.10.0  
* [Sass](http://sass-lang.com/) >=3.4.0  
* [Bower](http://bower.io/)

Installation process:
1. Clone this repository
2. Run ```npm install``` to install dependencies
3. Run ```bower install``` to install front-end dependencies

## Usage

For project development with livereload run:
```
gulp serve
```

To build project run: (Result will be in ```dist/``` folder.)
```
gulp build [--force]
```

To serve built project run:
```
gulp serve:dist
```

Gulp help:
```
gulp help
```


## Built-in features

* CSS autoprefixing
* Webserver with liverelaod
* Pug compilation
* Sass compilation
* CSS/JS concating and minification
* JS linting
* Automatic wiring up Bower components
* Image optimaliztion
* Lean Modernizr builds
* Improved file caching
* Deploying via rsync/sftp
