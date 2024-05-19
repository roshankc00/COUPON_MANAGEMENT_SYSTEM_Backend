import fs from 'fs-extra';
fs.copySync('../email-templates', '../dist/email-templates');
fs.copySync('../images', '../dist/images');
