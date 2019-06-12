function isBabelRegister(caller) {
    return !!(caller && caller.name === '@babel/register');
}

module.exports = function(api) {
    api.caller(isBabelRegister);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                    corejs: { version: 3, proposals: true },
                    targets: {
                        browsers: '> 0.5%'
                    },
                    modules: false,
                    loose: true,
                    debug: true
                }
            ]
        ]
    };
};
