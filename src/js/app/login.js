require(['jquery', 'storage'], function($, storage) {
    //点击登陆
    $("#sub-btn").on("click", function() {

        var username = $("#user").val();

        var pwd = $("#pwd").val();

        var tip;

        if (!$.trim(username)) {
            tip = "用户名为空"
        } else if (!$.trim(pwd)) {
            tip = "密码为空"
        }

        if (tip) {
            $(".tip").html(tip)
        } else {
            $.ajax({
                url: '/login',
                dataType: 'json',
                type: 'post',
                data: {
                    username: username,
                    pwd: pwd
                },
                success: function(res) {
                    console.log(res);
                    if (res.code === 1) {
                        history.go(-1);
                        storage.set("username", username);
                    } else {
                        alert(res.msg);
                    }
                },
                error: function(error) {
                    console.warn(error)
                }
            })
        }
    })
})