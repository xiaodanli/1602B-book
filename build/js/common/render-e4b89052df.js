define(["jquery","handlebars"],function(e,a){return function(e,r,n,t){var i=r.html(),u=a.compile(i);a.registerHelper("addInd",function(e){return e+1}),a.registerHelper("limit",function(e){return e<5}),a.registerHelper("equal",function(e,r){return e==r});var l=u(e);t?n.html(l):n.append(l)}});