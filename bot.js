import { LinuxBot } from './src/index';
import { config } from '#config';
require('dotenv').config();

new LinuxBot({
    config
});