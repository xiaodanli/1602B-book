define(function(){return function(a,n,t,r){var o=n-r,e=t-a;console.log("dy",o),console.log("dx",e);var u=0;if(Math.abs(e)<5&&Math.abs(o)<5)return u;var c,f,h=(c=e,f=o,180*Math.atan2(f,c)/Math.PI);return-45<=h&&h<45?u=4:45<=h&&h<135?u=1:-135<=h&&h<-45?u=2:(135<=h&&h<=180||-180<=h&&h<-135)&&(u=3),u}});