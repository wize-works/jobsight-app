const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define source and destination directories
const srcGraphqlDir = path.resolve(__dirname, '../src/graphql');
const destGraphqlDir = path.resolve(__dirname, '../src/models');

// Ensure the destination directory exists
function ensureDirExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Convert a single GraphQL file to a JS file with gql tag
function convertGraphqlFile(srcFilePath, destFilePath) {
    const graphqlContent = fs.readFileSync(srcFilePath, 'utf8');

    // Create JS content with gql tag
    const jsContent = `import { gql } from 'graphql-request';

export const ${path.basename(srcFilePath, '.graphql')} = gql\`
${graphqlContent.trim()}
\`;
`;

    // Create destination directory if it doesn't exist
    ensureDirExists(path.dirname(destFilePath));

    // Write the JS file
    fs.writeFileSync(destFilePath, jsContent);
    console.log(`Converted: ${srcFilePath} -> ${destFilePath}`);
}

// Create an index file for a directory
function createIndexFile(dirPath, files) {
    const imports = [];
    const exports = [];

    files.forEach(file => {
        if (file === 'index.js') return;

        const baseName = path.basename(file, '.js');
        imports.push(`import { ${baseName} } from './${baseName}';`);
        exports.push(baseName);
    });

    const content = `${imports.join('\n')}

export {
  ${exports.join(',\n  ')}
};
`;

    fs.writeFileSync(path.join(dirPath, 'index.js'), content);
    console.log(`Created index: ${path.join(dirPath, 'index.js')}`);
}

// Process all files in a directory recursively
function processDirectory(srcDir, destDir) {
    ensureDirExists(destDir);

    const items = fs.readdirSync(srcDir);
    const jsFiles = [];

    // First, convert all GraphQL files
    for (const item of items) {
        const srcItemPath = path.join(srcDir, item);
        const destItemPath = path.join(destDir, item);

        if (fs.statSync(srcItemPath).isDirectory()) {
            // Recursively process subdirectories
            processDirectory(srcItemPath, destItemPath);
        } else if (item.endsWith('.graphql')) {
            // Convert GraphQL file to JS
            const jsFileName = item.replace('.graphql', '.js');
            const jsFilePath = path.join(destDir, jsFileName);
            convertGraphqlFile(srcItemPath, jsFilePath);
            jsFiles.push(jsFileName);
        }
    }

    // Then create index files for each directory with JS files
    if (jsFiles.length > 0) {
        createIndexFile(destDir, jsFiles);
    }
}

// Start the conversion process
console.log('Starting GraphQL to gql object conversion...');
ensureDirExists(destGraphqlDir);
processDirectory(srcGraphqlDir, destGraphqlDir);
console.log('Conversion complete!');

// Create a root index file that exports everything
console.log('Creating root index file...');
const serviceDirectories = fs.readdirSync(destGraphqlDir)
    .filter(item => fs.statSync(path.join(destGraphqlDir, item)).isDirectory());

const rootImports = [];
const rootExports = [];

serviceDirectories.forEach(dir => {
    const subdirs = fs.readdirSync(path.join(destGraphqlDir, dir))
        .filter(item => fs.statSync(path.join(destGraphqlDir, dir, item)).isDirectory());

    subdirs.forEach(subdir => {
        const namespace = `${dir.replace(/-/g, '')}${subdir.charAt(0).toUpperCase() + subdir.slice(1)}`;
        rootImports.push(`import * as ${namespace} from './${dir}/${subdir}';`);
        rootExports.push(namespace);
    });
});

const rootContent = `${rootImports.join('\n')}

export {
  ${rootExports.join(',\n  ')}
};
`;

fs.writeFileSync(path.join(destGraphqlDir, 'index.js'), rootContent);
console.log('Root index file created!');