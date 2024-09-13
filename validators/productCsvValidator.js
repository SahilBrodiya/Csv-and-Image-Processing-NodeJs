import {logger, parseCSV} from '../helpers/index.js';

class ProductCSVValidator {

  async parseAndValidateCSV(filePath) {
    try {
      const parsedData = await parseCSV(filePath);
      const validData = this.validateData(parsedData);

      if (!validData.length) {
        throw { statusCode: 400, message: 'Kindly recheck for data in the file' };
      }

      return validData;
    } catch (error) {
      logger.error(`Error ocuured during reading file, ensure proper format: ${error.message}`);
      throw { statusCode: error.statusCode || 500, message: error.message || 'Error processing CSV file' };
    }
  }

  validateData(data) {
    const validRows = data.filter(row => this.validateRow(row));
    return validRows;
  }

  validateRow(row) {
    if (!row['Product Name'] || !row['Input Image Urls']) {
      logger.error('Validation failed: Data missing in file');
      return false;
    }

    const urls = row['Input Image Urls'].split(',');
    const validUrls = urls.every(url => this.isValidUrl(url.trim()));
    
    if (!validUrls) {
      logger.error('Invalid URL format found in Input Image Urls');
      return false;
    }

    return true;
  }

  isValidUrl(url) {
    const urlPattern = new RegExp(
      '(https?:\\/\\/)?' + 
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + 
      '((\\d{1,3}\\.){3}\\d{1,3}))' + 
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + 
      '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + 
      '(\\#[-a-zA-Z\\d_]*)?$',
      'i'
    );
    return !!urlPattern.test(url);
  }
}

export default new ProductCSVValidator();
