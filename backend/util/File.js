const fs = require('fs');
const path = require('path');
// const extractPath = 'extraido/';

const save = (filename, txt) => {
    checkDirectory(extractPath, (error) => {
        if (!error) {
            fs.appendFileSync(filename, txt + '\n');
        } else {
            console.log("ERRO AO CRIAR PASTA : ", error);
        }
    })
}

const checkDirectory = (directory, callback) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, callback);
    }
    callback();
}

module.exports = {
    save: (filename, txt) => {
        save(filename, txt)
    },
    saveList: (folder, filename, list) => {
        checkDirectory(folder, (error) => {
            if (!error) {
                const stream = fs.createWriteStream(folder + '/' + filename);
                stream.once('open', (fd) => {
                    stream.write('[\n');
                    let text
                    for (let i = 0; i < list.length; i++) {
                        text = JSON.stringify(list[i])
                        if ((i + 1) < list.length)
                            text += ','

                        stream.write(text + '\n');
                    }
                    stream.write(']\n');
                    stream.end();
                });
            } else {
                console.log("ERRO AO CRIAR PASTA : ", error);
            }
        });
    },
    saveListDirect: (folder, filename, list) => {
        checkDirectory(folder, (error) => {
            if (!error) {
                const stream = fs.createWriteStream(folder + '/' + filename);
                stream.once('open', (fd) => {
                    // stream.write('[\n');
                    // let text
                    for (let i = 0; i < list.length; i++) {
                        // text = JSON.stringify(list[i])
                        // if ((i + 1) < list.length)
                        // text += ','

                        stream.write(list[i] + '\n');
                    }
                    // stream.write(']\n');
                    stream.end();
                });
            } else {
                console.log("ERRO AO CRIAR PASTA : ", error);
            }
        });
    },
    saveUpdate: (folder, filename, list) => {
        checkDirectory(folder, (error) => {
            if (!error) {
                const stream = fs.createWriteStream(folder + '/' + filename);
                stream.once('open', (fd) => {
                    stream.write(list);
                    stream.end();
                });
            } else {
                console.log("ERRO AO CRIAR PASTA : ", error);
            }
        });
    },
    readFiles: (dir) => {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (error, fileNames) => {
                if (error) {
                    reject(error)
                } else {
                    let files = []
                    fileNames.sort((a, b) => {
                        return a.localeCompare(b)
                    })
                    for (let i = 0; i < fileNames.length; i++) {
                        files.push({
                            name: fileNames[i],
                            path: path.resolve(dir, fileNames[i])
                        })
                    }
                    resolve(files)
                }
            });
        })
    },
    saveContent: (folder, filename, content) => {
        checkDirectory(folder, (error) => {
            if (!error) {
                fs.writeFileSync(folder + '/' + filename, content);
            } else {
                console.log("ERRO AO CRIAR PASTA : ", error);
            }
        });
    },
}