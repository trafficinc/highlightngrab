## Link Highlighter
Will highlight selected text in DOM element, say "p"/paragraph element and allow to select the text, then grab it to store it or manipulate it further.<br />
### See index.html for implementation<br /><br />

## This is experimental<br />
## Options<br />

`el` can be element: example "p" for paragraph, and class or id.

LinkHighlighter.init({<br />
&nbsp;&nbsp;el: "#myp",<br />
&nbsp;&nbsp;saveBtn : "#saveBtn",<br />
&nbsp;&nbsp;lhWatch: function(event) {<br />
&nbsp;&nbsp;// watch for new highlighted areas event<br />
&nbsp;&nbsp;console.log(event);<br />
&nbsp;},<br />
&nbsp;&nbsp;lhValue:function(value) {<br />
&nbsp;&nbsp;// highlighted area value<br />
&nbsp;&nbsp;//console.log(value);<br />
&nbsp;}<br />
});<br />
