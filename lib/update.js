(function(define) {'use strict'
	define("latte_qiniu/lib/update", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		var latte_lib = require("latte_lib")
 			, http = require("http")
 			, qiniu = require("qiniu");
 		var updateFile = function(token, key , value ,callback) {
 			var extra = new qiniu.io.PutExtra();
			extra.params = {xUser : "dong" }; 
 			qiniu.io.putFile(token, key, value, extra,function(err, ret) {
				if(err) {
					console.log("file "+value+ " failed " , err);
					return callback(err, ret);
				}
				callback(err , ret);
			});
 		}
 		module.exports = updateFile;
 	});
})(typeof define === "function"? define: function(name, reqs, factory) {factory(require, exports, module); });
