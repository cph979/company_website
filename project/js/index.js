(function (a) {
  a.fn.DB_tabMotionBanner = function (b) {
    var c = {
      key: "",
      autoRollingTime: 3000,
      bgSpeed: 1000,
      motion: ""
    };
    a.extend(c, b);
    return this.each(function () {
      var h = a(this);
      var k = h.find(".DB_imgSet");
      var r = h.find(".DB_imgSet li");
      var i = h.find(".DB_menuSet");
      var m = h.find(".DB_menuSet li");
      var e = h.find(".DB_bgSet li");
      var q = h.find(".DB_next");
      var g = h.find(".DB_prev");
      var f = r.length;
      var p = 0;
      var j = 0;
      s();

      function s() {

        l();
        d();
        t();
        o()
      }

      function l() {
        k.css({
          position: "relative"
        });
        r.css({
          position: "absolute"
        });
        for (var y = 0; y < f; y++) {
          if (y == p) {
            r.eq(y).show()
          } else {
            r.eq(y).hide()
          }
        }
        for (var y = 0; y < r.length; y++) {
          var x = r.eq(y).find("img");
          for (var w = 0; w < x.length; w++) {
            var A = x.eq(w);
            var v = c.motion[A.attr("class")];
            if (v != null) {
              var z = Number(A.css("left").split("px")[0]);
              var B = Number(A.css("top").split("px")[0]);
              A.data({
                x2: z,
                y2: B,
                x1: z + v.left,
                y1: B + v.top,
                opacity: v.opacity,
                speed: v.speed,
                delay: v.delay == null ? 0 : v.delay
              })
            }
          }
        }
      }

      function d() {
        h.bind("mouseenter",
            function () {
              clearInterval(j);
              q.show();
              g.show()
            });
        h.bind("mouseleave",
            function () {
              t();
              q.hide();
              g.hide()
            });
        m.bind("click",
            function () {
              if (a(this).index() != p) {
                p = a(this).index();
                o()
              }
            });
        m.bind("mouseenter",
            function () {
              n(a(this).find("img"), "src", "_off", "_on")
            });
        m.bind("mouseleave",
            function () {
              if (p != a(this).index()) {
                n(a(this).find("img"), "src", "_on", "_off")
              }
            });
        q.bind("click",
            function () {
              u()
            });
        g.bind("click",
            function () {
              p--;
              if (p == -1) {
                p = f - 1
              }
              o()
            })
      }

      function u() {
        p = ++p % f;
        o()
      }

      function t() {
        j = setInterval(u, c.autoRollingTime)
      }

      function o() {
        for (var z = 0; z < r.length; z++) {
          var A = r.eq(z);
          var y = e.eq(z);
          if (p == z) {
            A.show();
            var x = A.find("img");
            for (var w = 0; w < x.length; w++) {
              var A = x.eq(w);
              var v = c.motion[A.attr("class")];
              if (v != null) {
                if (A.attr("src").indexOf(".png") > 0 && a.browser.msie && a.browser.version < 9) {
                  A.css({
                    left: A.data("x1"),
                    top: A.data("y1"),
                    opacity: 1,
                    display: "none"
                  })
                } else {
                  A.css({
                    left: A.data("x1"),
                    top: A.data("y1"),
                    opacity: A.data("opacity")
                  })
                }
                A.stop().delay(A.data("delay")).queue(function () {
                  a(this).css("display", "block");
                  a(this).dequeue()
                }).animate({
                      left: A.data("x2"),
                      top: A.data("y2"),
                      opacity: 1
                    },
                    A.data("speed"))
              }
            }
            n(m.eq(z).find("img"), "src", "_off", "_on");
            m.eq(z).addClass("select");
            y.stop(true, true).fadeIn(c.bgSpeed)
          } else {
            A.hide();
            n(m.eq(z).find("img"), "src", "_on", "_off");
            m.eq(z).removeClass("select");
            y.stop(true, true).fadeOut(c.bgSpeed)
          }
        }
      }

      function n(w, z, v, x) {
        var y = w.attr(z);
        if (String(y).search(v) != -1) {
          w.attr(z, y.replace(v, x))
        }
      }
    })
  }
})(jQuery);
$(function () {
  $('.ibanner').DB_tabMotionBanner({
    autoRollingTime: 1000000000,
    bgSpeed: 600,
    motion: {
      DB_1_1: {left: -500, opacity: 0, speed: 400, delay: 700},
      DB_2_1: {left: -500, opacity: 0, speed: 400, delay: 700},
      DB_3_1: {left: -500, opacity: 0, speed: 400, delay: 700},
      end: null
    }
  })
  //erm
  $("a[data-tips]").hover(
      function (e) {
        var t = $(this).offset().top + $(this).height();
        var l = $(this).offset().left + $(this).width();
        $('<img width="104" height="104" src="' + $(this).data('tips') + '" id="' + $(this).data('id') + '" />').css({
          "position": "absolute",
          "top": t,
          "left": l
        }).appendTo($(document.body));
      },
      function (e) {
        $("#" + $(this).data('id')).remove();
      }
  );

  var ua = navigator.userAgent.toLocaleLowerCase();
  var pf = navigator.platform.toLocaleLowerCase();
  var isAndroid = (/android/i).test(ua) || ((/iPhone|iPod|iPad/i).test(ua) && (/linux/i).test(pf))
      || (/ucweb.*linux/i.test(ua));
  var isIOS = (/iPhone|iPod|iPad/i).test(ua) && !isAndroid;
  var isWinPhone = (/Windows Phone|ZuneWP7/i).test(ua);

  var mobileType = {
    pc: !isAndroid && !isIOS && !isWinPhone,
    ios: isIOS,
    android: isAndroid,
    winPhone: isWinPhone
  };

  if (!mobileType.pc) {
    $(".ibanner").addClass("w1200")
  }
})

var menus = {
  "ymxz" : {
    "sub" : [{
      "name" : "RuoYi 源码下载",
      "url" : "https://gitee.com/y_project/RuoYi",
      "target" : "_blank"
    }, {
      "name" : "RuoYi-Vue 前端分离版",
      "url" : "https://gitee.com/y_project/RuoYi-Vue",
      "target" : "_blank"
    }, {
      "name" : "RuoYi-Cloud 微服务版",
      "url" : "https://gitee.com/y_project/RuoYi-Cloud",
      "target" : "_blank"
    }
    ]
  },
  "zxys" : {
    "sub" : [{
      "name" : "RuoYi 在线演示",
      "url" : "http://demo.ruoyi.vip",
      "target" : "_blank"
    }, {
      "name" : "RuoYi-Vue 前端分离版",
      "url" : "http://vue.ruoyi.vip",
      "target" : "_blank"
    }, {
      "name" : "RuoYi-Cloud 微服务版",
      "url" : "http://cloud.ruoyi.vip",
      "target" : "_blank"
    }
    ]
  },
  "spjc" : {
    "sub" : [{
      "name" : "RuoYi 视频教程",
      "url" : "http://doc.ruoyi.vip/ruoyi/document/spjc.html",
      "target" : "_blank"
    }, {
      "name" : "RuoYi-Vue 前端分离版",
      "url" : "http://doc.ruoyi.vip/ruoyi-vue/document/spjc.html",
      "target" : "_blank"
    }, {
      "name" : "RuoYi-Cloud 微服务版本",
      "url" : "http://doc.ruoyi.vip/ruoyi-cloud/document/spjc.html",
      "target" : "_blank"
    }
    ]
  }
};

var submenuStr;
function setSubmenu(key, data) {
  submenuStr = '<div class="remind" data-key2="'+key+'">';
  var tmp;
  for (var i in data['sub']) {
    tmp = data['sub'][i];
    submenuStr += '<a href="' + tmp['url'] + '"' + (typeof tmp.target != 'undefined' ? ('target="' + tmp.target + '"') : '') + '>' + tmp['name'] + '</a>';
  }
  submenuStr += '</div>';
  if ($(".remind").data('key2') != key) {
    $(".remind").remove();
    $(submenuStr).appendTo($("body"));
  }
}

$(function () {
  $(document).on('mouseover mouseout', '.submenu,.remind', function (e) {
    if (e.type == 'mouseover') {
      var _key = $(this).data('key') ? $(this).data('key') : $(".remind").data('key2');
      setSubmenu(_key, menus[_key]);
      var _target = $('[data-key="' + _key + '"]');
      var _left = parseInt(_target.offset().left - ($(".remind").width() - _target.width()) / 2 + 20);
      var _top = parseInt(_target.offset().top + $(".header").height());
      $(".remind").css({ "left" : _left, "top" : _top }).show();
    } else {
      $(".remind").hide();
    }
  })
})