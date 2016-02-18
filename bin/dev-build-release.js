var path = require('path'),
    fs = require('fs'),
    argv = require('yargs').argv,
    chalk = require('chalk');

function error(msg) {
    console.log(chalk.red(msg));
    process.exit(-1);
}

function getPkg() {
    var pkg;
    try {
        pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './package.json')));
    } catch (e) {
        error('Could not open the package.json!');
    }
    return pkg;
}

var pkg = getPkg();
var currentVersion = pkg.version;
var buildNumber = argv.b;

if (!currentVersion) {
    error('Could not find the current version!');
}

if (!buildNumber) {
    error('Could not find the build number!');
}

console.log(chalk.blue('Updating version to ' + currentVersion + '-' + buildNumber));
pkg.version = currentVersion + '-' + buildNumber;

try {
    fs.writeFileSync(path.resolve(process.cwd(), './package.json'), JSON.stringify(pkg, null, 2));
} catch (e) {
    error('Could not write to the package.json!');
}
