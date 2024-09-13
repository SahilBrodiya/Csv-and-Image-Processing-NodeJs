import csv from 'csv-parser';
import { createReadStream } from 'fs';
import winston from 'winston';

// Function to parse CSV
export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Logger
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'auditLogs.log' })
  ]
});
