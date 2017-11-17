var Update = {
    callback:function (delta_s) {},
    get: function () {
	return Update.callback;
    },
    set: function (callback=function(delta_s){}) {
	Update.callback = callback;
    },
};
