'use strict';

module.exports = {
  db: 'mongodb://10.208.132.227/karma',
  //db: 'mongodb://karma:cvzF4yd/kD4=nAGkUmf>G&X;3b6Xaj4Y@10.208.132.227/karma',
   app: {
       name: 'Karma Pulse'
   },
   redisStore: {
    port: 6379,
    url: '10.208.132.227',
    auth: 'b4wu.PYmTANMo/P^EV4PmpTvcPvfxVF3WKRe$jzmX7jUYjt9n$'
  },
  redisSocketsStore: {
    port: 6379,
    url: '10.208.132.227',
    auth: 'b4wu.PYmTANMo/P^EV4PmpTvcPvfxVF3WKRe$jzmX7jUYjt9n$'
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
       callbackURL: 'http://162.242.152.195:3000/auth/google/callback'
   },
   linkedin: {
       clientID: 'API_KEY',
       clientSecret: 'SECRET_KEY',
       callbackURL: 'http://localhost:3000/auth/linkedin/callback'
   }
};
