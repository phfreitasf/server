import express from 'express'
import cors from 'cors'
import { router } from '../routes/routes'
import { auth } from '../routes/auth'
import passport from 'passport'
var cookieParser = require('cookie-parser')

const expressSession = require('express-session');

import '../strategies/discord'

import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import { prisma } from '../database/prisma'

const app = express()
const httpsPort = 3333
const httpPort = 3332

app.use(cors({
  origin: process.env.CORS,
  credentials: true,
}))

console.log(String(process.env.CORS))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(expressSession({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2600 * 60 * 1000,
    secure: true,
    httpOnly: false,
    sameSite: 'none',
  },
  name: 'findduo.discord.session',
  store: new PrismaSessionStore(
    prisma,
    {
      checkPeriod: 2600 * 60 * 1000,  //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
}));

//use passport
app.use(passport.initialize())
app.use(passport.session())



//rotas
app.use(auth)
app.use(router)


export { app, httpsPort, httpPort, express }