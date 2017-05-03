/* global $ Cookies localStorage sessionStorage locals*/
$(document).ready(function() {
  
  var bounce = locals.bounce
  var assign = bounce.assign, assignKeys = ( assign ? Object.keys(assign) : [])

  //window.history.pushState({}, null, bounce.redirectURL);

  if(bounce.clear) {
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }

  if(assignKeys[0]) {
    for(var a in assignKeys) {
      var assignType = assignKeys[a], assign = assign[assignType];
      if(assign[0]) {
        for(var b in assign) {
          switch(assignType) {
            case 'cookies':
              Cookies.remove(assign[b].name)
              Cookies.set(assign[b].name, assign[b].cookie, { expires: assign[b].exp, path: '/' });
              break;
            case 'sessionStorage':
              sessionStorage.setItem(assign.name, assign.val);
              break;
            case 'localStorage':
              localStorage.setItem(assign.name, assign.val);
              break;
          }
        }
      }
    }    
  }

});