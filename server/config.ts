import * as nconf from 'nconf';

export const config = nconf.argv()
    .env()
    .file({ file: './config.json' });
