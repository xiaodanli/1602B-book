define(["jquery","render","text!headerTpl"],function(n,o,r){return function(e){console.log(e),n("body").append(r),o(e,n("#header-tpl"),n(".render-header")),n(".icon-back").on("click",function(){history.go(-1)})}});