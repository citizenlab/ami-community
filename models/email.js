var sendgridAPIKey = require('../conf/sendgrid.conf.js').sendgridAPIKey;
var sendgrid = require('sendgrid')(sendgridAPIKey);

var Q = require('q');
var _ = require('lodash');
var policy = require('../conf/policy.conf').policy;

var Email = function(){
	var self = this;
	var unsubLink = policy.unsubLink
	this.message = {
		"subject": "A message from Access My Info",
		"from": "notifications@accessmyinfo.org",
	}
	this.send = function(params){
		var message = _.defaults(params, self.message);
		return new Q.Promise(function(resolve,reject){
			sendgrid.send(
				message 
			, function(err, json){
				if(err){
					reject(err);
				}
				else{
					resolve(json);
				}
			});
		});
	}
}

exports.EmailModel = Email;


