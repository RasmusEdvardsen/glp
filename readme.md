# Good Logging Practice
## What does it do
For now, GLP will log to Azure's Blob Storage, allowing you to log events from the frontend as well.
## Usage
### Init
GLP needs to be initialized with an azure account's sastoken to blob storage, or with shared key credentials **(TODO)** for the same.
Minimum sas token requirements: Blob service, Object resource type, Write permission.
For sas tokens, initializing works as follows:

    const  {AzureConfig,  credentials,  info}  =  require("good-logging-practice");
    let  s  =  new  AzureConfig(
	    "https://{storagename}.blob.core.windows.net",
	    "{sastoken}"
    );
Where AzureConfig is a class that takes an origin, a sas token, and an optional containername that defaults to *log*, and a sas token that looks somewhat like this:

    ?sv=2018-03-28&ss={service_type}&srt={resource_type}&sp={permissions}&se={endtime}&st={starttime}&spr={protocol}&sig={signature}
### Log
Currently, 3 levels of logging is supported, those 3 being **INFO**, **WARN** and **ERROR**.
Example log to **INFO**:

    info("This is a log to my 'log' container in azure storage");

## Future
 - Ability to log both to the console and to Azure at the same time.
 - Support for other clouds
 - Logged in user messages
