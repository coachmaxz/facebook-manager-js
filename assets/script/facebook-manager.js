
Facebook = {
    init: function(appId, version){
        window.fbAsyncInit = function() {
            FB.init({
                appId   : appId,
                status  : true, 
                cookie  : true,
                xfbml   : true,
                version : version
            });
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    Facebook.getProfile();
                } else if (response.status === 'not_authorized') {
                    Facebook.getStatus('กรุณาตรวจสอบการเข้าสู่ระบบ');
                } else {
                    Facebook.getStatus('กรุณาล๊อกอินเข้าสู่ระบบก่อน');
                    $('#btn-login').show();
                }
            });
        };
    },
    login: function(){
        FB.login(function(response) {
           if (response.authResponse) {
                Facebook.getProfile(); // Get User Information.
            } else {
                Facebook.getStatus('Authorization failed.');
            }
        },{scope: 'email'});
    },
    getProfile:function () {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me?fields=name,email,link', function(response) {
            Facebook.getStatus('<h3>ยินต้อนรับคุณ</h3>');
            $('#btn-login').hide();
            var message = "<p><strong>Name : </strong>" + response.name + "</p>";
                message += "<p><strong>Link : </strong><a href=\"" + response.link + "\" target=\"_blank\">" + response.link + "</a></p>";
                message += "<p><strong>id : </strong> "   + response.id + "</p>";
                message += "<p><strong>Email : </strong>" + response.email + "</p><hr />";
                message += "<p><input type=\"button\" value=\"Logout\" onClick=\"Facebook.logout();\" /></p>";
            $('#profile').html(message);
        });
    },
    logout: function(){
        FB.logout(function(){
            Facebook.getStatus('ออกจากระบบสำเร็จ!');
            document.location.reload();
        });
    },
    getStatus: function(message){
        $('#message').html(message);
        console.log(message);
    }
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk')); 