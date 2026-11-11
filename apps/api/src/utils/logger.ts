type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const formatLog = (level: LogLevel, message: string, meta?: any): string => {
  const timestamp = new Date().toISOString();
  const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`;
};

export const logger = {
  info: (msg: string, meta?: any) => console.log(formatLog('info', msg, meta)),
  warn: (msg: string, meta?: any) => console.warn(formatLog('warn', msg, meta)),
  error: (msg: string, meta?: any) => console.error(formatLog('error', msg, meta)),
  debug: (msg: string, meta?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatLog('debug', msg, meta));
    }
  },
};
