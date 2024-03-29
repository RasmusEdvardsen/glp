
# Med Log
## What does it do
For now, MedLog will log to Azure's Blob Storage, allowing you to log events from the web or backend to a secure blob in Azure.
## Usage
### Init
MedLog can be initialize in the following ways:
- Shared key credentials:
	- storagename and storagekey is required.
- Sas token:
	- Minimum sas token requirements: Blob service, Object resource type, Write permission.

For shared key creds, initializing works as follows:

	import { AzureSharedKey, info, init } from 'med-log';
	let az: AzureSharedKey = new AzureSharedKey(
		{storagename},
		{sharedkey},
		{origin},
		{logging container - defaults to 'log'}
	);
	init(az);
	
### Vue
AzureSharedKey is **NOT** supported when used as a Vue plugin.
 
Include a declaration file, e.g., med-log.d.ts, in your project (typically in src):

	import Vue from 'vue'; 
	declare module 'vue/types/vue' {
		export interface Vue {
			info: (...string: string[]) => Promise<string>;
		}
	}
Injecting the plugin:

	import { AzureSasToken, init } from 'med-log';
	let ask = new AzureSasToken(
		{async function that returns new sas token},
		{origin},
		{container}
	);
	init(ask);
	Vue.use(MedLog);
Using it:

	await this.info("'this' is a Vue object, or a class extending Vue");
### Log
Currently, 3 levels of logging is supported, those 3 being **INFO**, **WARN** and **ERROR**.
Example log to **INFO**:

	await info("This is a log to my 'log' container in azure storage");

Awaiting the call isn't necessary, it returns a boolean, stating whether it succeeded or not.
## Security
Please do use CORS to only allow domains that you wish to be able to access your azure storage account.
## Future
- Ability to log both to the console and to Azure at the same time.
- Support for other clouds
- Logged in user messages