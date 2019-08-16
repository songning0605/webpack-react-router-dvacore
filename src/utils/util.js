const fs = require("fs");

function is_dir(path) {
    console.log('is_dir',path);
    try {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

export default is_dir;