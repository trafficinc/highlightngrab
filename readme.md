## Options

`el` can be element: example "p" for paragraph, and class or id.

LinkHighlighter.init({
  el: "#myp",
  saveBtn : "#saveBtn",
  lhWatch: function(event) {
  	// watch for new highlighted areas event
  	console.log(event);
  },
  lhValue:function(value) {
    // highlighted area value
  	//console.log(value);
  }
});