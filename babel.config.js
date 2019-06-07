function isBabelRegister(caller) {
    return !!(caller && caller.name === '@babel/register');
}

module.exports = function(api) {
    api.caller(isBabelRegister);

    return {
        presets: [
            [
                '@babel/env',
                {
                    useBuiltIns: 'usage',
                    corejs: { version: 3, proposals: true },
                    debug: true
                }
            ]
        ],
        plugins: [
            [
                '@babel/transform-runtime',
                {
                    corejs: 3
                }
            ]
        ]
    };
};
