function readFromFile(filePath) {
    return new Promise((resolve, reject) => {
      const fs = require('fs');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err); // Reject the Promise if there's an error reading the file
        } else {
          resolve(data); // Resolve the Promise with the file contents
        }
      });
    });
  }
  
  async() =>{
    let data = await readFromFile('...')
  }
  readFromFile('file-does-not-exist.txt')
    .then((data) => console.log(`File contents: ${data}`))
    .catch((error) => console.log(`Error reading file: ${error.message}`));
console.log("Data: ",data)








  In this example, the readFromFile() function returns a Promise that resolves with the contents of a file or rejects with an error if the file can't be read. We're using the fs module to read the file, and if there's an error reading the file, we reject the Promise with the error object.
  
  We then call the readFromFile() function with a non-existent file path, which will cause an exception to be thrown. We use the catch() method to handle the rejection of the Promise and log the error message to the console.
  
  Note that in this example, the catch() method only catches errors thrown by the Promise. If there are errors thrown outside of the Promise (such as when requiring a non-existent module), they won't be caught by the catch() method.
  
  
  
  
  
  Regenerate response
  