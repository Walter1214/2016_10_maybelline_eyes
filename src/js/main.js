//  $.gapv = function(pageName) {
//      // var trackerName = ga.getAll()[0].get('name');
//      // ga(trackerName + '.send', 'pageview', pageName);
//      dataLayer.push({
//          'event': 'VirtualPageView',
//          'VirtualPageURL': pageName
//      });
//      console.log(pageName);
//  }

//  console.log('main.js', window.fbAsyncInit);
 //  window.fbAsyncInit = function() {
 //      FB.init({
 //          appId: '1723379247981127',
 //          xfbml: true,
 //          version: 'v2.8'
 //      });
 //      console.log('facebook work');
 //      $(document).trigger("fbAsyncInit");
 //  };

 //  (function(d, s, id) {
 //      var js, fjs = d.getElementsByTagName(s)[0];
 //      if (d.getElementById(id)) { return; }
 //      js = d.createElement(s);
 //      js.id = id;
 //      js.src = "//connect.facebook.net/zh_TW/sdk.js";
 //      fjs.parentNode.insertBefore(js, fjs);
 //  }(document, 'script', 'facebook-jssdk'));


 // $(function(){
 //     $.getScript('//connect.facebook.net/zh_TW/sdk.js', function(){
 //     FB.init({
 //          appId: '1723379247981127',
 //          xfbml: true,
 //          version: 'v2.8'
 //      });
 //       console.log('facebook work');
 //      $(document).trigger("fbAsyncInit");
 //     //FB.getLoginStatus(updateStatusCallback);
 //   });
 // })