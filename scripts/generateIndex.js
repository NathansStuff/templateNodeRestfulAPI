const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');

function shouldIgnoreFolder(dir) {
    const indexPath = path.join(dir, 'index.ts');

    // If index.ts doesn't exist, return true (meaning ignore the folder).
    if (!fs.existsSync(indexPath)) {
        return true;
    }

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    return indexContent.includes('// @scripts ignore-folder');
}

function generateIndexForDir(dir) {
    // Check if directory should be ignored
    if (shouldIgnoreFolder(dir)) {
        return;
    }

    const files = fs.readdirSync(dir);

    const exports = files
        .filter((file) => {
            const excludedPatterns = [
                '.test.ts',
                '.test.js',
                '.test.tsx',
                '.test.jsx',
            ];
            return (
                !excludedPatterns.some((pattern) => file.endsWith(pattern)) &&
                file !== 'index.ts'
            );
        })
        .map((file) => {
            const fileNameWithoutExtension = path.basename(file, '.ts');
            return `export * from './${fileNameWithoutExtension}';`;
        })
        .join('\n');

    fs.writeFileSync(path.join(dir, 'index.ts'), exports);
}

function traverseDirs(dir) {
    const filesAndDirs = fs.readdirSync(dir, { withFileTypes: true });

    for (const dirent of filesAndDirs) {
        if (dirent.isDirectory()) {
            const nextDir = path.join(dir, dirent.name);
            generateIndexForDir(nextDir);
            traverseDirs(nextDir); // Recursive call for nested directories
        }
    }
}

traverseDirs(srcPath);
