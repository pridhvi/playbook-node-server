import axios from "axios";
import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import IgdbApiController from './controllers/igdbController.js'

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/tuiter'
// mongoose.connect(CONNECTION_STRING)

const app = express()
app.use(express.json())
app.use(cors())

IgdbApiController(app)
app.listen(process.env.PORT || 4000);
// app.listen(4000);