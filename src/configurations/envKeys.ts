import dotenv from 'dotenv';

dotenv.config()

export const APP_SECRET = process.env.APP_SECRET!
export const DATABASE_URI = process.env.DATABASE_URI!
export const PORT = process.env.PORT
export const GMAIL_USER = process.env.GMAIL_USER!
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD!
export const USERS_APP_BASE_URL = process.env.USERS_APP_BASE_URL!
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME!
export const API_KEY = process.env.API_KEY!
export const API_SECRET = process.env.API_SECRET!
export const DB_NAME = process.env.DB_NAME!
export const DB_USERNAME = process.env.DB_USERNAME!
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_HOST = process.env.DB_HOST
export const DB_PORT = process.env.DB_PORT