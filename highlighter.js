var LinkHighlighter = (function () {
  'use strict';

  var el = 'p';
  var p = document.querySelector(el);

  var store = {
    store: {
      saveBtn: "#saveBtn",
      el: "p",
      lhWatch: function () { },
      lhValue: function () { }
    },
    get: function (key) {
      return this.store[key];
    },
    init: function (key, item, callback) {
      this.store[key] = item;
      callback("initialized");
    },
    set: function (key, item) {
      this.store[key] = item;
    }
  }

  function init(opts) {
    store.set('el', opts.el);
    store.init('opts', opts, function (elem) {
      if (elem === 'initialized') {
        el = store.get('el');
        var backupDom = store.get('backupDom');
        if (document.querySelector(el) !== null) {
          var pageElem = document.querySelector(el);
          saveDom(pageElem);
          start(pageElem);
          listeners(pageElem, opts);
        } else {
          console.warn("DOM element does not exist.");
        }
      }
    });
  }

  function saveDom(el) {
    domstore.set('oldDom', el.cloneNode(true));
  }

  function start(el) {
    el.onmouseup = el.onkeyup = el.onselectionchange = function () {
      store.set('getSelectionText', getSelectionText(el));
    };
  }

  function getSelectionText(el) {
    var text = "";
    var activeEl = el.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == el)) {
      text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
      text = window.getSelection().toString();
    }
    return text;
  }

  function listeners(pageElem, opts) {
    var saveBtn = document.querySelector(store.get('opts').saveBtn);
    if (saveBtn === null) {
      console.warn("Dom element does not have correct id assignment");
      return false;
    }

    String.prototype.hashCode = function () {
      var hash = 0, i, chr;
      if (this.length === 0) return hash;
      for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };

    function isDifference(a, b) {
      if (a !== b) {
        return true;
      } else {
        return false;
      }
    }

    // refactor this
    saveBtn.addEventListener("click", function () {
      pageElem.innerHTML = domstore.get('oldDom').innerHTML;
      if (store.get('getSelectionText') === "undefined") {
        return false;
      }

      // Testing textarea to view results - in Dev,Prod REMOVE THIS!
      document.getElementById("sel").value = store.get('getSelectionText');
  
      if (typeof opts.lhValue !== "undefined") {
        opts.lhValue(store.get('getSelectionText'));
      }

      if (undefined !== store.get('getSelectionText')) {
        var regex = new RegExp(store.get('getSelectionText').toString());
        var newText = p.innerHTML.replace(regex, function ($xax) {
          return "<span>" + $xax + "</span>";
        });
      }
     
      domstore.addNewDom(newText);
      pageElem.innerHTML = newText;

      if (typeof domstore.getNewOldDoms()[1] === "undefined") {
        domChangeEvent.set(true);
        if (typeof opts.lhWatch !== "undefined") {
          opts.lhWatch(domChangeEvent.get());
        }
        return false;
      }
      if (domstore.getNewOldDoms()[1] !== "undefined") {
        var isDiff = isDifference(pageElem.innerHTML.hashCode(), domstore.getNewOldDoms()[1].hashCode());
        if (isDiff) {
          // DOM changed
          domChangeEvent.set(true);
        } else {
          domChangeEvent.set(false);
        }
        if (typeof opts.lhWatch !== "undefined") {
          opts.lhWatch(domChangeEvent.get());
        }
      } else if (domstore.getNewOldDoms()[0] !== "undefined" && domstore.getNewOldDoms()[1] === "undefined") {
        domChangeEvent.set(true);
        if (typeof opts.lhWatch !== "undefined") {
          opts.lhWatch(domChangeEvent.get());
        }
      } else {
        domChangeEvent.set(false);
        if (typeof opts.lhWatch !== "undefined") {
          opts.lhWatch(domChangeEvent.get());
        }
      }

    });
  }

  var domChangeEvent = {
    changed: {
      'domchange': false
    },
    set: function (value) {
      this.changed['domchange'] = value;
    },
    get: function () {
      return this.changed['domchange'];
    }
  }

  var domstore = {
    data: {},
    newOldDoms: [],
    addNewDom: function (elem) {
      if (this.newOldDoms[0] !== null) {
        this.newOldDoms[1] = this.newOldDoms[0];
      }
      this.newOldDoms[0] = elem;
    },
    getNewOldDoms: function () {
      // [1] new Dom, [2] previous DOM for Diff
      return this.newOldDoms;
    },
    get: function (key) {
      return this.data[key];
    },
    set: function (key, item) {
      this.data[key] = item;
    }
  }

  function getDiff(a, b) {
    var i = 0;
    var j = 0;
    var result = "";

    while (j < b.length) {
      if (a[i] != b[j] || i == a.length) {
        result += b[j];
      } else {
        i++;
      }
      j++;
    }
    return result;
  }

  return {
    init: init
  }

}());
