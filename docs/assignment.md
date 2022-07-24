# Running the project

Running the project locally will run without DynamoDB. Change the code to use the JSON files and fs if you want to do this. 

After deploying to AWS, you need to configure some data to make it work. 

## DynamoDB content and mock events

In ./data/ you'll find the contents of the DynamoDB table VehicleToHandheldDevice, which need to be uploaded in AWS in order to test the solution. Here you can also find test events, to put on the GpsCoordinates Queue to trigger the flow. 
