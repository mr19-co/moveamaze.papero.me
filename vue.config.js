module.exports = {
    publicPath: "/moveamaze/",
    css: {
        loaderOptions: {
            sass: {
                additionalData: "@import '@/styles/global.scss';"
            }
        }
    }
}