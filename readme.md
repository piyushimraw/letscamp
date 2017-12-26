# Let's Camp

An open source camping Landpage. This Landing page is for a local Camping Buisness has Basic CRUD operations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.



### Prerequisites

You need to install MogoDB and Node.js

* MongoDB
* Node.js v4.2.6


```
apt install mongodb nodejs
```

### Installing

A step by step series of examples that tell you have to get a development env running

clone the local branch of this repository
```
git clone https://github.com/piyushimraw/letscamp/tree/local
```

navigate to letscamp directory

```
cd letscamp
```

And then run

```
npm install
```

Let the installation finish and then make a directory data to run mongodb database

```
mkdir data
npm run initDB

```

after mongodb starts and you can see a listening port run

```
npm start
```

Go to localhost:8080 in your browser to see the demo.


## Built With

* [node.js](https://nodejs.org/docs/latest-v4.x/api/) - Javascript backend runtime 
* [express.js](https://www.npmjs.com/package/express) - The web framework used
* [Mongoose.js](https://www.npmjs.com/package/mongoose) - Object modeling used
* [passport.js](https://www.npmjs.com/package/passport) - Used for login 


## Authors

* **Piyush Shrivastava** - *Initial work* - [piyushimraw](https://github.com/piyushimraw)



## License

This project is licensed under the MIT License.

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
