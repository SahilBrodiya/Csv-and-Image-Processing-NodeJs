import { successResponse, errorResponse } from '../helpers/responseHelpers.js';
import productCSVValidator from '../validators/productCsvValidator.js'
import productManagementService from '../services/projectManagementService.js.js';

class ProductController {

    async uploadCSV(req, res) {
      try {
        const {path: filePath} = req.file;
        const {webhookUrl} = req.body;
        const parsedData = await productCSVValidator.parseAndValidateCSV(filePath);
        const requestId = await productManagementService.createRequest(parsedData,webhookUrl);
        return successResponse(req,res, 200, { requestId });
      } catch (error) {
        return errorResponse(req,res, error.statusCode || 500, error.message);
      }
    }

  async checkStatus(req, res) {
    try {
      const {requestId} = req.params;
      const requestStatus = await productManagementService.getRequestStatus(requestId);
      return successResponse(req,res, 200, { status: requestStatus.status});
    } catch (error) {
      return errorResponse(req, res, error.statusCode || 500, error.message);
    }
  }
}

export default new ProductController();
