(function(define) {'use strict'
	define("latte_qiniu/lib/download", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		var latte_lib = require("latte_lib")
 			, http = require("http");
 		var downloadFile = function(dpath, npath,callback) {
 			//console.log(dpath, npath);
 			
 			var Url = require("url");
 			var options = {
 				host: Url.parse(dpath).host,
 				port: 80,
 				path: Url.parse(dpath).pathname
 			};

 			var file = latte_lib.fs.createWriteStream(npath);
 			http.get(options, function(res) {
 				res.setEncoding("utf8");
 				res.pipe(file);
 			});
 			file.on("finish", function() {
 				callback();
 			});
 			file.on("error", function(err) {
 				callback(err);
 			});
 		}
 		module.exports = downloadFile;
 	});
})(typeof define === "function"? define: function(name, reqs, factory) {factory(require, exports, module); });
