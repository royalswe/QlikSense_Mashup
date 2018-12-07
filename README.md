# Angular template for Qlik Sense

Latest installed Qlik Sense server version: November 2017 (patch 1)

## require-config.js explanation

The variable `GET_APP_URI` fetch the app id from url.
`QLIK_SENSE_APP_ID` takes the value from GET_APP_ID_URI if exist or app id from coockie . The id saves as coockie if user refresh the page because the app id from uri removes when page loaded.
`ROOT` Must have the same name as the project directory name.
The `config` object holds the server information.
The `require` object loads all the javascript files that is needed in the project.




## Change from development to produktion

* Change the first rows in angular_skeleton/js/require-config.js to the example bellow

```javascript
var QLIK_SENSE_APP_ID = GET_APP_URI;
var root = '/angular_skeleton/'; // change this if root directory changes

var config = { //  example to production server with SAML prefix
    host: 'blp-qliksense01.istint.net',
    prefix: "/portal/",
    port: 443,
    isSecure: window.location.protocol === "https:"
};
```

## Third party extensions

Add a new extension steps:
* Move the extension to the extension directory.
* load the extensions in the require-config.js file. change uppercase characters to use example bellow.
```javascript
require([path + "NAME OF EXTENSIONS DIRECTORY/EXTENSION.JS"], function (extension){
    qlik.registerExtension('EXTENSION', extension);
});
```
Note: Since the November 2017 update, extensions can be added in QMC in extensions tab which can crash the app if exists in both places.

## Add sheets
The mashup will load the fields from the Sheets table that comes from the qvf app. The fields will display on the sheet list in the mashups navigation bar.

Example of the Sheets table in QlikSense Desktop:
```javascript
Sheets: 
load * inline [
    "Tab name", "Tab ID" 
    "Dashboard", "dashboard"
    "Absence", "absence-report"
];
```

Open up js/routes.js and add new route with the same name as the Tab ID in the Sheets table.
Create new folder in /components with associated html and js controller.
Add the controller javascript file in the require-config.js so it will be loaded.

## Tree structure
```
## File tree
ROOT_DIRECTORY
│
└───components
│   │
│   └─── // folder with sheet name
│       │   // html file for specific sheet
│       │   // js controller for specifik sheet
│   
└───css
|    |   main.css
|    |   qlik-styles.css
|
└───directives
|    │   AppInfoDirective.js
|    │   BookmarkDirective.js
|    |	 ExportBookmarkDirective.js
|    │   HeaderDirective.js
|    |   SelectionDirective.js
|
└───img
|
└───js
|    |   app.js
|    |   main.js
|    |   routes.js
|    |   webticket.js
|
└───lib  
|    |  bootstrap 
|    |  jspdf // library for exporting data to PDF 
|
└───partials  
|    | // All partiaL views 
└───service
|    |   ObjectService.js // empty example of service
|
└───index.html
└───require-config.js

extensions
|
└─── // third party extensions

```

 ## Naming convention

** The naming conventions are for plain HTML/CSS/JS and not frameworks or libraries.
 
 ### HTML
- All characters should be in lower case.
### CSS

- All characters should be in lower case.
- Use Underscore Delimited Strings for id
Example: `#this_is_a_id`
- Use Hyphen Delimited Strings for classes
Example: `.this-is-a-class`
- If the class is used for a relation with JavaScript the class name can start with `.js`
Example: `.js-show-when-click`

### JavaScript
- camelCase for variables and functions.
Example: `var myName`
- Always put spaces around operators ( = + - * / ), and after commas
Example: `var values = ["Volvo", "Saab", "Ferrari"];`
- Always use 4 spaces for indentation of code blocks (4 spaces, 1 tab)
- Always end a simple statement with a semicolon `;`
- General rules for complex (compound) statements:
	- Put the opening bracket at the end of the first line.
	- Use one space before the opening bracket.
	- Put the closing bracket on a new line, without leading spaces.
	- Do not end a complex statement with a semicolon.
	```
	if (time < 20) {
	    greeting = "Good day";
	} 
	else {
	    greeting = "Good evening";
	}
	```
- General rules for object definitions:

	-	Place the opening bracket on the same line as the object name.
	-	Use colon plus one space between each property and its value.
	-	Use quotes around string values, not around numeric values.
	-	Place the closing bracket on a new line, without leading spaces.
	-	Always end an object definition with a semicolon.

	```
	var person = {
	    firstName: "John",
	    lastName: "Doe",
	    eyeColor: "blue"
	};
	```
	- Short objects can be written compressed, on one line if desired
- Global variables written in UPPERCASE.
- Use 3 equal signs `===` not 2 `==` when comparison
### Files
- HTML files should have a .html extension (not .htm).
- Files should preferably have lowercase naming.

### Other

 - Everything should be in English if possible.
 - Minimize the use of global variables.

## TODO

* Logout button
* Right click menu

## Common errors presented in the console

> Error: Type already registered: [ExtensionNAme]

The xtension exist in both QMC and inside the script. Remove the extension from the QMC

> Failed to load resource: net::ERR_CONNECTION_REFUSED
  
You dont have connection with server, check you config object.

>xFailed to load https://[PATH]/qrs/extension/: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value '[SERVER]' that is not equal to the supplied origin. Origin '[SERVER]' is therefore not allowed access.

It is just trying to fetch the list of visualization extensions which you dont need in a mashup scenario.

> Uncaught SyntaxError: Unexpected token <

You are not authenticated or the session has ended

> Uncaught Error: Script error for "js/qlik", needed by: directives/HeaderDirective, directives/BookmarkDirective, script/main, components/dashboard/DashboardCtrl, app
http://requirejs.org/docs/errors.html#scripterror
    at makeError (require.js:1)
    at HTMLScriptElement.onScriptError (require.js:1)

	Start Qlik Sense desktop if local development. 

> Error: Access to XMLHttpRequest at 'https://SERVER_NAME/resources/autogenerated/product-info.json?1542287139851' from origin 'https://SERVER_NAME' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header contains the invalid value '127.0.0.1:8000'.

You need to whitelist the domain in the virtual proxy. 

## Quik guide to install and start a HTTPS server
You need to install node from https://nodejs.org to use npm

Install local-web-server with npm to get the ws command
> $ npm install -g local-web-server
 
Change directory to previous tree directory (one step back from working directory)
> $ cd .. 

Launch the secure webserver.
> $ ws --https

You will get something like this

>Serving at https://IST16960:8000, https://192.168.137.1:8000, https://172.16.2.153:8000, https://127.0.0.1:8000

Navigating to one of the listed URLs will render a directory listing or your index.html, if that file exists.
Dont forget to white list the domain in the virtual proxy inside qliksense server.

Finaly go to https://127.0.0.1:8000/[PROJECT]/index.html
