const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'todo');
const destinationBaseDir = path.join(__dirname, '..', 'src', 'features');
const newFolderName = process.argv[2];

if (!newFolderName) {
    console.error(
        'Please provide a new folder name as a command-line argument.'
    );
    process.exit(1);
}

const destinationDir = path.join(destinationBaseDir, newFolderName);

try {
    fs.copySync(sourceDir, destinationDir);
    console.log('Directory copied successfully.');

    // Rename files and update their contents
    const files = fs.readdirSync(destinationDir);
    files.forEach((file) => {
        const filePath = path.join(destinationDir, file);

        // Read and update file contents regardless of the file name
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const updatedContents = fileContents.replace(
            /(Todo|todo|Todos|todos)/gi,
            function (match) {
                if (match === 'Todo')
                    return (
                        newFolderName.charAt(0).toUpperCase() +
                        newFolderName.slice(1)
                    );
                if (match === 'Todos')
                    return (
                        newFolderName.charAt(0).toUpperCase() +
                        newFolderName.slice(1) +
                        's'
                    );
                if (match === 'TODOS' || match === 'TODOS')
                    return newFolderName.toUpperCase();
                return newFolderName.toLowerCase();
            }
        );

        // If the file starts with 'todo', rename it
        let newFilePath = filePath;
        if (file.startsWith('todo')) {
            const newFileName = file.replace('todo', newFolderName);
            newFilePath = path.join(destinationDir, newFileName);
            fs.renameSync(filePath, newFilePath);
        }

        // Write the updated content to the (possibly renamed) file
        fs.writeFileSync(newFilePath, updatedContents, 'utf-8');
    });

    console.log('Files renamed and contents updated successfully.');
} catch (error) {
    console.error('An error occurred:', error);
}
