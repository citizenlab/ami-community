var async = require('async');
var Q = require('q');
var _ = require('lodash');

var statsController = function(Request){
	var self = this;
	self.getTotal = function(jurisdiction_id){
		var count = new Request.RequestCollection()
		.query(function(qb){
			qb.where('operator_jurisdiction_id', jurisdiction_id);
		})
		.count();
		return new Q.Promise(function(resolve,reject){
			count.then(function(collection){
				resolve(collection);
			})
			count.catch(function(err){
				reject(err);
			})
		});
	}
	self.getVerified = function(jurisdiction_id){
		var count = new Request.RequestCollection()
		.query(function(qb){
			qb.innerJoin('request_contacts', 'requests.request_id', 'request_contacts.request_id');
			qb.where('operator_jurisdiction_id', jurisdiction_id);
		})
		.count();
		return new Q.Promise(function(resolve,reject){
			count.then(function(collection){
				resolve(collection);
			})
			count.catch(function(err){
				reject(err);
			})
		});
	}
	self.getByCompany = function(jurisdiction_id){
		return new Request.RequestCollection()
		.query(function(qb){
			qb.where('operator_jurisdiction_id', jurisdiction_id);
		})
		fetch()
		.then(function(collection){
			return new Q.Promise(function(resolve,reject){
				groupedEvents = events.countBy("operator_id");
				if(Object.keys(groupedEvents).length){
					resolve(groupedEvents);
				}
				else{
					reject("No events");
				}
			});
		})
	}
	self.getByDate = function(jurisdiction_id){
		return new Request.RequestCollection()
		.query(function(qb){
			qb.where('operator_jurisdiction_id', jurisdiction_id);
			qb.groupBy('operator_id');
		})
		.fetch();
	}
	this.methodAllocator = function(req, res){
		var method = req.params.method;
		var jurisdiction = parseInt(req.params.jurisdiction);
		if(isNaN(jurisdiction)){
			throw new Error("jurisdiction not a number");
		}
		var jsonPromise;
		if(typeof method == "undefined" || typeof jurisdiction == "undefined"){
			throw new Error("Missing parameters");
		}
		switch(method){
			case "getTotal":
				jsonPromise = self.getTotal(jurisdiction);
			break;
			case "getVerified":
				jsonPromise = self.getVerified(jurisdiction);
			break;
			case "getByCompany":
				jsonPromise = self.getByCompany(jurisdiction);
			break;
			case "getByDate":
				jsonPromise = self.getByDate(jurisdiction);
			break;
			default:
				throw new Error("Incorrect method provided");
		}
		console.log(jsonPromise);
		jsonPromise
		.then(function(data){
			res.json(data);
		})
		.catch(function(err){
			throw new Error(err);
		});
	}
	return self;
}
module.exports.statsController = statsController;