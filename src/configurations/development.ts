

const {
    DEV_PORT,
    DEV_NEON_DB_URL
} = process.env

console.log('Running in development mode')

export default {
    PORT: DEV_PORT,
    NEON: DEV_NEON_DB_URL
}