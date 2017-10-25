    function validate(formCls) {
        formCls = formCls || ".hk_form";
        if ($(formCls).length > 0) {
            var $form = $(formCls).validate({
                errorPlacement: function (lable, element) {
                    // $(element).tooltip({content: lable.html(), position: 'right', hideDelay: 0});
                    // $(element).tooltip("show");
                },
                success: function (lable, element) {
                    // $(element).tooltip("destroy");
                },
                submitHandler: function (vform) {
                    var msg = $(this.submitButton).attr("tip") || $p.submitTip;
                    var action = $(this.submitButton).attr("action") || vform.action;
                    $(".hk_form .txta,:input").tooltip("destroy");
                    var data = $util.data(vform), params;
                    window.console && console.log(data);
                    if (typeof (data.params) == 'function') {
                        params = data.params();
                    } else {
                        params = data.params || {};
                    }
                    if ($('.hk_editor_required').length) {//富编辑框必填验证
                        var state = true;
                      $('.hk_editor_required').each(function () {
                        var ueName = $(this).attr('class').match(/editorkey_.+/g)||['editorkey_eyeUe'];
                        ueName = ueName[0].split(/ |_/)[1];
                        // window.console && console.log(ueName,window[ueName].hasContents());
                        if (window[ueName].hasContents()) {
                            $('.editorkey_'+ueName).tooltip("destroy");
                        }else{
                            $('.editorkey_'+ueName).tooltip({content: '内容为必填！', position: 'right', hideDelay: 0});
                            state =false;
                        };
                      });
                      if (!state) { return false;};
                    };
                    var callSumbit = true;
                    if (data.beforeCallback) {//提交之前事件函数
                        callSumbit = window[data.beforeCallback]();
                    };
                    $.applyIf(params, $(vform).serializeObject());
                    var fn = function (rst) {
                        parent.window._refreshParent = true;
                        window.console && console.log(data.callback);
                        if (data.callback)window[data.callback](rst);
                        if (rst.state) {$util.closePop();};

                        if (data.submitClear)$(data.submitClear).val("");
                    }
                    if (callSumbit) {
                    $ajax.post(action, params, msg).done(fn);
                    };
                    return false;
                }
            });
            return $form;
        }
    }