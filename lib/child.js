(function(define) {'use strict'
	define("latte_qiniu/lib/child", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		process.on("message", function(m) {
 			switch(m.type) {
 				case "start":
 					var qiniu = require("qiniu");
 					var qiniuConfig = m.config;
 					qiniu.conf.ACCESS_KEY = qiniuConfig.access_key;
					qiniu.conf.SECRET_KEY = qiniuConfig.secret_key;
 				break;
 				case "download":
 					require("./download")(m.key, m.value, function(err, result) {
 						if(err) {
 							return process.send({
 								err: err,
 								key: m.key
 							});
 						}else{
 							process.send({
 								key: m.key
 							});
 						}
 					});
 				break;
 				case "update":
 					require("./update")(m.token, m.key, m.value, function(err, result) {
 						if(err) {
 							return process.send({
 								err:err,
 								key: m.key
 							});
 						}else{
 							process.send({
 								key: m.key
 							});
 						}
 					});
 				break;
 			} 
 			
 		});
 	});
})(typeof define === "function"? define: function(name, reqs, factory) {factory(require, exports, module); });
