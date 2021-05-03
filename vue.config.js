module.exports = {
    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false
        }
    },
    transpileDependencies: [
        'quasar'
    ],
    pwa: {
        name: 'ドラちゃんのチートシート',
        themeColor: '#ffaa5a',
        msTileColor: '#ece6ce',
        appleMobileWebAppCapable: 'yes'
    }
};
