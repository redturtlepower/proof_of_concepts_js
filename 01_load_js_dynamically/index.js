var LoadDynamicJs = (function (exports) {
'use strict';

function alertmessage(){
  alert("Test script loaded!");
}

class Test{
  constructor(){
    alertmessage();
  }
}

exports.Test = Test;

return exports;

}({}));
