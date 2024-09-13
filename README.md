1. Use test.csv as file to be uploaded.
2. After the server is hit, basic validation for csv and url are done.
3. If everyone runs fine, image is downloaded and is sent for compression.
4. After compression, it is stored at a folder and folder's path is saved in DB.
5. throughout entire process, Db record value for processing is consistently changed from processing to complete/failed.
6. User is provided the request Id.

API DOCUMENTATION:

1. GET: http://localhost:3000/api/product/?requestId
    Input: Request Id
    Output: Checks for record in DB, if no record is found, a error message is returned, else the status of CSV processing

2. POST : http://localhost:3000/api/product/
    Input: Csv file (Kindly pass test.csv given in folder)
    Work: Basic validation checks are conducted first. Post checks, a record is created in DB and a request id is sent to client. In the background, image download begins. In case of error, record state is updated to failed. If download is successful, the file is sent for compression. In case of failure, record state is updated to failed. If successful, the file is stored at a path and the path is updated in csv.

