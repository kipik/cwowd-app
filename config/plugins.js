module.exports = ({ env }) => ({
    upload: {
        provider: 'cloudinary',
        providerOptions: {
            cloud_name: env('CLOUDINARY_NAME', 'cwowd'),
            api_key: env('CLOUDINARY_KEY', '146958446728845'),
            api_secret: env('CLOUDINARY_SECRET', '7nHRvVIfmmdeBOF1f8PwMrr3dVg')
        }
    }
})
