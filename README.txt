# Run this command to create Docker Image
docker build -t app-nodejs:1.0.0 .

# Start Docker Image
docker run -d -p8080:8080 app-nodejs

API Documentation: Pagination and Data Retrieval
This document provides guidance on how to interact with the API to retrieve and paginate data correctly. The API returns data in the following format:

Response Format
json
Copy code
{
  "total": 3,
  "resources": [
    {
      "id": "as1",
      "name": "name 1",
      "type": "Ex",
      "humanAdGroups": ["consumer"]
    },
    {
      "id": "as2",
      "name": "name 2",
      "type": "Ex",
      "humanAdGroups": []
    },
    {
      "id": "as3",
      "name": "name 3",
      "type": "Ex",
      "humanAdGroups": []
    }
  ]
}
Field Descriptions:
total: The total number of records available in the data source.
resources: An array of objects representing the individual data entries.
id: The unique identifier of the resource.
name: The name of the resource.
type: The type of the resource (e.g., "Ex").
humanAdGroups: A list of names of groups that have access rights to the resource. If empty, no groups have access.
Query Parameters for Pagination and Sorting
To customize and paginate your API requests, use the following query parameters:

1. start
Description: The index of the first item to retrieve (0-based).
Type: Integer
Example: ?start=0 (Start from the first record).
2. size
Description: The number of items to retrieve per page.
Type: Integer
Example: ?size=10 (Retrieve 10 items per page).
3. sort
Description: The field to sort by.
Type: String (should match one of the field names, e.g., name or id).
Example: ?sort=name (Sort results by the name field).
4. desc
Description: Whether to sort results in descending order.
Type: Boolean
Example: ?desc=true (Sort in descending order).
5. query
Description: A keyword to filter the results.
Type: String
Example: ?query=name 1 (Retrieve resources with name matching "name 1").
Example API Requests
Retrieve the first page of data (default size):
bash
Copy code
GET /api/resources?start=0&size=10
Retrieve data sorted by name in ascending order:
bash
Copy code
GET /api/resources?start=0&size=5&sort=name&desc=false
Retrieve data sorted by id in descending order:
bash
Copy code
GET /api/resources?start=0&size=5&sort=id&desc=true
Search for resources with the keyword consumer:
bash
Copy code
GET /api/resources?query=consumer
Notes
Default Pagination: If start or size is not specified, default values will be applied (start=0, size=10).
Sorting Defaults: If sort is omitted, the API may use a default field to sort the results.
Empty Results: If no resources match the query, the resources array will be empty, and total will be 0.
Feel free to reach out to the support team for further questions or clarifications.
