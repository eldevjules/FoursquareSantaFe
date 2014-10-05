'use strict';

module.exports = {
    db: 'mongodb://localhost/FQSantaFe',
    //db: 'mongodb://23.253.232.89/karma',
    app: {
        name: 'MEAN - A Modern Stack - Development'
    },
    redisStore: {
        port: 6379,
        url: '127.0.0.1'
    },
    redisSocketsStore: {
        port: 6379,
        url: '127.0.0.1'
    },
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: '40018624888.apps.googleusercontent.com',
        clientSecret: 'EfEDvihOo_st7XDdxqRJz6zD',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
