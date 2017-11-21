/*
*名称:图片上传本地预览插件 v1.1
*作者:周祥
*时间:2013年11月26日
*介绍:基于JQUERY扩展,图片上传预览插件 目前兼容浏览器(IE 谷歌 火狐) 不支持safari
*插件网站:http://keleyi.com/keleyi/phtml/image/16.htm
*参数说明: img:图片ID;width:预览宽度;height:预览高度;imgType:支持文件类型;callback:选择文件显示图片后回调方法;
*使用方法:
<div>
<img id="imgPr" width="120" height="120" /></div>
<input type="file" id="up" />
把需要进行预览的img标签外 套一个DIV 然后给上传控件ID给予uploadPreview事件
$("#up").uploadPreview({ img: "imgPr", width: 120, height: 120, imgType: ["gif", "jpeg", "jpg", "bmp", "png"], callback: function () { }});
*/
jQuery.fn.extend({
    uploadPreview: function (opts) {
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            img: null,
            width: 100,
            height: 100,
            imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
            callback: function () {}
        }, opts || {});
        _self.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file)
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        };
        _this.change(function () {
            if (this.value) {
                if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert("选择文件错误,图片类型必须是" + opts.imgType.join("，") + "中的一种");
                    this.value = "";
                    return false
                }
                if (opts.img) {
                    if ($.browser.msie) {
                        try {
                            $(opts.img).attr('src', _self.getObjectURL(this.files[0]))
                        } catch (e) {
                            var src = "";
                            var obj = $(opts.img);
                            var div = obj.parent("div")[0];
                            _self.select();
                            if (top != self) {
                                window.parent.document.body.focus()
                            } else {
                                _self.blur()
                            }
                            src = document.selection.createRange().text;
                            document.selection.empty();
                            obj.hide();
                            obj.parent("div").css({
                                'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                                'width': opts.width + 'px',
                                'height': opts.height + 'px'
                            });
                            div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src
                        }
                    } else {
                        $(opts.img).attr('src', _self.getObjectURL(this.files[0]))
                    }
                };
                opts.callback(this.files[0]);
            }
        })
    }
});