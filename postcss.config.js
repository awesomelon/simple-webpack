module.exports = ({ file, options, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: [
        require('autoprefixer')({
            browsers: ['> 1%', 'last 2 versions']
        }),
        require('cssnano')
    ]
});
