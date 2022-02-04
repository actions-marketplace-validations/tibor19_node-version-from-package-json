const fs = require('fs');
const path = require('path');

const { getInput, setFailed, debug, setOutput } = require('@actions/core');

/**
 * Get the content of package.json given the path.
 * @param fileOrFolder
 */
const findPackageJson = async (fileOrFolder) => {

  fileOrFolder = fileOrFolder ?? './';
  if(fs.existsSync(fileOrFolder)){
    if((await fs.promises.stat(fileOrFolder)).isFile()){
      return (await fs.promises.readFile(fileOrFolder)).toString();
    }
    const fileName = path.join(fileOrFolder, 'package.json');
    if(fs.existsSync(fileName)){
      return (await fs.promises.readFile(fileName)).toString();
    }
  }
  else {
    return null;
  }

};

/**
 * Get version field within package.json
 * @param path
 */
const getNodeVersion = async (fileOrFolder) => {

  const packageJson = await findPackageJson(fileOrFolder);

  if (!!packageJson) {
    return JSON.parse(packageJson)?.engines?.node;
  }
  return null;
};


const main = async () => {

  const fileOrFolder = getInput('path');
  debug(`Load package.json from ${fileOrFolder}`);

  const fallback = getInput('fallback-version')
  debug(`Fallback version ${fallback}`);

  const result = (await getNodeVersion(fileOrFolder)) ?? fallback;

  debug(`set output: version: ${result}`);
  setOutput('version', result);
};

main().catch(err => {
  console.error(err);
  console.error(err.stack);
  setFailed(err);
  process.exit(-1);
});