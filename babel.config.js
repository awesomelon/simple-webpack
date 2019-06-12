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
                        browsers: ['last 2 version', 'ie >= 10']
                    },
                    loose: true,
                    debug: true
                }
            ]
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    corejs: 3
                }
            ]
        ]
    };
};
