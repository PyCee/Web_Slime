var Update = {
    callback:function () {},
    get: function () {
	return Update.callback;
    },
    set: function (callback=function(delta_s){}) {
	Update.callback = callback;
    },
};
