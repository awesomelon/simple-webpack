function isBabelRegister(caller) {
    return !!(caller && caller.name === '@babel/register');
}

module.exports = function(api) {
    api.caller(isBabelRegister);
    api.cache(false);

    const presets = [
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
    ].filter(Boolean);

    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-runtime'
    ].filter(Boolean);

    return {
        presets,
        plugins
    };
};
