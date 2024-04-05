const config = {
    // 'bail': 1,
    'verbose': true,
    'collectCoverage': true,
    // 'collectCoverageFrom': [
    //     'src/*.{js,jsx}',
    //     '!**/node_modules/**'
    // ],
    'coverageDirectory': './logs/reports/',
    // "coverageThreshold": {
    //     "global": {
    //         "branches": 50,
    //         "functions": 50,
    //         "lines": 50,
    //         "statements": 50
    //     },
    //     "./src/somedir/": {
    //         "branches": 40,
    //         "statements": 40
    //     },
    //     "./src/dir/**/*.js": {
    //         "statements": 90
    //     },
    //     "./src/api/very-important-module.js": {
    //         "branches": 100,
    //         "functions": 100,
    //         "lines": 100,
    //         "statements": 100
    //     }
    // },
    'displayName': {
        'name': 'CLIENT',
        'color': 'blue'
    },
    'transformIgnorePatterns': [],
    // 'extensionsToTreatAsEsm': ['.js'],
    'moduleDirectories': ['node_modules']
};

export default config;