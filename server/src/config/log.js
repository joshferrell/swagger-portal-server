import bunyan from 'bunyan';
import { config } from './index';

export const log = bunyan.createLogger({
    name: config.name,
    serializers: {
        err: bunyan.stdSerializers.err
    },
    streams: [
        { stream: process.stdout }
    ],
    level: 'trace'
});

export default log;
