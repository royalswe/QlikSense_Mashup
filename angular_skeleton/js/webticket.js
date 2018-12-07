/**
 * @var {string} GET_APP_URI - Retrieves the the app parameter in url
 * @var {string} QLIK_SENSE_APP_ID - Retrieves the the user parameter in url
 */
var GET_APP_URI = decodeURI((RegExp("app=(.+?)(&|$)").exec(location.search) || [, ""])[1]);
var user = decodeURI((RegExp("user=(.+?)(&|$)").exec(location.search) || [, ""])[1]);

/**
 * If user exist in the url then save the parameters as coockies
 */
if(user){ // if user is in the uri
	var dir = user.substring(0,user.indexOf("/"))
	var uid = user.substring(user.indexOf("/")+1)

	if(uid !== "" && dir !== ""){
	    document.cookie = "directory=" + dir +";path=/";
	    document.cookie = "user=" + uid +";path=/";
	    document.cookie = "app=" + GET_APP_URI;

	    window.location.href =  window.location.href.split("?")[0]; 
	}
}