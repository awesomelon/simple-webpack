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
                    useBuiltIns: 'usage', // or "entry"
                    corejs: 3,
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
