"use strict";

function include(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (script.readyState) {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                script.onreadystatechange = null;                                                  
                onload();
            }
        } 
        else {
            onload();          
        }
    };
    head.appendChild(script);
}

function parseURL (a) {
    var d, e, f, b = document.createElement("a"),
        c = {};
    for (b.href = a, d = b.search.replace(/^\?/, "").split("&"), f = 0; f < d.length; f++) e = d[f].split("="), c[e[0]] = e[1];
    return {
    	messageHash: c.messageHash,
    	userHash: c.userHash
    };
}

function setPageUrl (hostUrl, callback) {
	function Page (hostUrl) {
		var temp = parseURL(window.location.href);
	    this.hostUrl = hostUrl;
	    this.messageHash = temp.messageHash;
	    this.userHash = temp.userHash;
	    this.prevTime = (new Date()).getTime();
	    this.prevPageId = null;
	    this.prevSubPageTime = null;
	    this.prevSubPageId = null;
	}

	Page.prototype.getHashUrl = function () {
		return '?messageHash=' + this.messageHash + '&userHash=' + this.userHash;
	};

	Page.prototype.getMessageHash = function () {
		return this.messageHash;
	};

	Page.prototype.getUserHash = function() {
	    return this.userHash;
	};

	Page.prototype.getHostUrl = function () {
	    return this.hostUrl;
	};

	Page.prototype.clickPage = function (pageId, callback) {
		this.prevPageId = pageId;
	    var data = {
	        buttonId: pageId,
	        messageHash: this.messageHash,
	        userHash: this.userHash
	    };
	    $.ajax({
	    	url: this.hostUrl + '/api/analytics/button-click',
	    	data: data,
	    	dataType: "jsonp",
	    	complete: function (xhr, a) {
	    		//console.log(xhr, a);
	    		if (callback) {
	    			callback();
	    		}
	    	}
	    });
	};

	Page.prototype.stayTimePage = function (pageId, callback) {
	    var currentTime = (new Date()).getTime();
	    var time = currentTime - this.prevTime;
	    //console.log(time);
	    this.prevTime = currentTime;

	    var data = {
	        buttonId: pageId,
	        messageHash: this.messageHash,
	        userHash: this.userHash,
	        time: time
	    };
	    $.ajax({
	    	url: this.hostUrl + '/api/analytics/button-time',
	    	data: data,
	    	dataType: "jsonp",
	    	complete: function (xhr, a) {
	    		//console.log(xhr, a);
	    		if (callback) {
	    			callback();
	    		}
	    	}
	    });
	};

	Page.prototype.clickSubPage = function (pageId, callback) {
		this.prevSubPageTime = (new Date()).getTime();
		this.prevSubPageId = pageId;

		var data = {
	        buttonId: pageId,
	        messageHash: this.messageHash,
	        userHash: this.userHash
	    };
	    $.ajax({
	    	url: this.hostUrl + '/api/analytics/button-click',
	    	data: data,
	    	dataType: "jsonp",
	    	complete: function (xhr, a) {
	    		//console.log(xhr, a);
	    		if (callback) {
	    			callback();
	    		}
	    	}
	    });
	};

	Page.prototype.stayTimeSubPage = function (pageId, stayTime, callback) {
		//console.log(stayTime);

		var data = {
			buttonId: pageId,
			messageHash: this.messageHash,
			userHash: this.userHash,
			time: stayTime
		};
		$.ajax({
			url: this.hostUrl + '/api/analytics/button-time',
			data: data,
			dataType: "jsonp",
			complete: function (xhr, a) {
				//console.log(xhr, a);
				if (callback) {
					callback();
				}
			}
		});
	};

	Page.prototype.getCurrentTime = function () {
		return (new Date()).getTime();
	};

	Page.prototype.exitPage = function () {
		if (this.prevPageId) {
			var currentTime = (new Date()).getTime();
			var time = currentTime - this.prevTime;
			//console.log(time);

			var data = {
				buttonId: this.prevPageId,
				messageHash: this.messageHash,
				userHash: this.userHash,
	        	time: time
			};
			$.ajax({
				url: this.hostUrl + '/api/analytics/button-time',
				data: data,
				dataType: "jsonp",
				complete: function (xhr, a) {
					//console.log(xhr, a);
				}
			});
		} else {
			return null;
		}
	};

	Page.prototype.exitSubPage = function () {
		if (this.prevSubPageId && this.prevSubPageTime) {
			var currentTime = (new Date()).getTime();
			var time = currentTime - this.prevSubPageTime;
			//cosnole.log(time);

			var data = {
				buttonId: this.prevSubPageId,
				messageHash: this.messageHash,
				userHash: this.userHash,
				time: time
			};
			$.ajax({
				url: this.hostUrl + '/api/analytics/button-time',
				data: data,
				dataType: "jsonp",
				complete: function (xhr, a) {
					//console.log(xhr, a);
				}
			});
		} else {
			return null;
		}
	};

	window.page = new Page(hostUrl);

	window.addEventListener("beforeunload", function () {
		page.exitPage();
		page.exitSubPage();
	});

	if (callback) {
		callback();
	}
}