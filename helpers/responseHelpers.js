import {logger} from '../helpers/index.js';

/**
 * Sends a JSON response indicating success, along with the provided data.
 * Logs details about the request and the response.
 * 
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {object} data - The response data to send.
 */
export function successResponse(req, res, statusCode, data) {
  logger.info(`Success Response: ${JSON.stringify(data)}`);
  res.status(statusCode).json({
    success: true,
    data
  });
}

/**
 * Sends a JSON response indicating an error, along with the error message.
 * Logs details about the request and the error.
 * 
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {object} error - Complete Error Body
 * @param {string} errorMessage - The error message to send.
 */
export function errorResponse(req, res, statusCode, errorMessage) {
  const errorResponse = {
    success: false,
    error: errorMessage
  };
  logger.error(`Error Response: ${JSON.stringify(errorResponse)}`);
  res.status(statusCode).json(errorResponse);
}
