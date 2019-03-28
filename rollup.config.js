const pkg = require('./package.json');
const deps = Object.keys(pkg.dependencies);

export default {
    input: pkg.module,
    output: {
        name: pkg.name
            .split('-')
            .map((str,i) =>
                i === 0 ?
                    str :
                    (str.substring(0,1).toUpperCase() + str.substring(1))
            )
            .join(''),
        file: pkg.main,
        format: 'umd',
        globals: deps.map(key => { return { [key]: key }; })
    },
    external: deps
};
