var pixel = (function () {
    //获取屏幕尺寸信息
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    console.log(w + ' ' + h);

    //在number原型上添加取整方法
    Number.prototype._floor = function () {
        return Math.floor(this);
    };
    //在number原型上添加获取0-这个数之间随机数的方法
    Number.prototype._random = function () {
        return (this * Math.random())._floor();
    };
    //在array原型上添加复制方法；.concat().slice(0)方法无效
    Array.prototype._copy = function () {
        var newArr = [];
        for (var i in this) {
            newArr[i] = typeof this[i] == 'object' ? this[i]._copy() : this[i];
        }
        return newArr;
    };
    //在array原型上添加变换方法
    Array.prototype._transform = function () {
        var newArr = [];
        var t90 = [
            [0, 1],
            [-1, 0]
        ];
        for (var i = 0; i < this.length; i++) {
            if (typeof this[i][0] == 'number') {
                var fir = this[i][0] * t90[0][0] + this[i][1] * t90[1][0];
                var sec = this[i][0] * t90[0][1] + this[i][1] * t90[1][1];
                newArr[i] = [fir, sec]
            } else {
                newArr[i] = this[i]._transform();
            }
        }
        return newArr;
    };
    //按钮，以及其横向、纵向和总个数
    var btns;
    var x = (w / 13)._floor();
    var y = (h / 18)._floor();
    var all = x * y;

    var model = function () {
        //todo
        //用于创建常用的数字、字母等模型
    };
    //原型上添加方法
    model.prototype = {
        //返回屏幕尺寸信息
        bgInfo: function () {
            return {
                x: x,
                y: y,
                all: all,
                btns: btns
            }
        },
        //迭代方法
        each: function () {
            var arrlength = (arguments.length == 2) ? arguments[0].length : all;
            for (var a = 0; a < arrlength; a++) {
                arguments[arguments.length - 1](a);
            }
        },
        //初始化，页面填充按钮，设置相关样式
        init: function () {
            this.each(function () {
                var inputs = document.createElement('input');
                inputs.type = 'radio';
                document.body.appendChild(inputs)
            });
            btns = document.getElementsByTagName('input');
            var styleNode = document.createElement('style');
            str = 'body,input{margin:0;overflow:hidden}';
            if (styleNode.styleSheet) {
                styleNode.styleSheet.cssText = str;
            } else {
                styleNode.innerHTML = str;
            }
            document.getElementsByTagName('head')[0].appendChild(styleNode);
        },
        //输出排版，arr为模型数组，i为渲染起始位置，state为设置状态
        layout: function (i, arr, state) {
            var newstate = (state == 'show') ? 'checked' : '';
            var newi;
            this.each(arr, function (a) {
                newi = i + arr[a][0] + arr[a][1] * x;
                if ((newi > 0) && (newi < all)) {
                    btns[newi].checked = newstate;
                }
            });
        },
        //画直线方法，参数分别为方向、起始位置以及结束位置
        line: function (x_or_y, start, end) {
            switch (x_or_y) {
                case 'x':
                    this.each(function (i) {
                        if (i > start && i < end) {
                            btns[i].checked = 'checked';
                        }
                    });
                    break;
                case 'y':
                    var liney = end % x;
                    this.each(function (i) {
                        if (i > start && i < end && (i % x == liney)) {
                            btns[i].checked = 'checked';
                        }
                    });
                    break;
                default:
                    console.log('line towards erro')
            }
        },
        //画框方法
        box: function (start, end) {
            var top_left = start;
            var top_right = start + end % x - start % x;
            var bottom_left = (end / x)._floor() * x + start % x;
            var bottom_right = end;
            this.line('x', top_left, top_right);
            this.line('x', bottom_left, bottom_right);
            this.line('y', top_left, bottom_left);
            this.line('y', top_right, bottom_right);
        },
        //模型移动方法，option对象为移动配置参数，可配置移动的方向，速度，距离以及移动完成的回调函数
        move: function (i, array, option) {
            var _this = this;
            var arr = array._copy();
            var towards = (function (t) {
                var moveStr;
                switch (t) {
                    case 'top':
                        moveStr = 'arr[c][1]--';
                        break;
                    case 'bottom':
                        moveStr = 'arr[c][1]++';
                        break;
                    case 'right':
                        moveStr = 'arr[c][0]++';
                        break;
                    case 'left':
                        moveStr = 'arr[c][0]--';
                        break;
                    default:
                        moveStr = 'console.log("move towards erro")';
                        break;
                }
                return function (c) {
                    eval(moveStr);
                }
            })(option.towards);
            var tomove = setInterval(function () {
                if (option.steps > 0) {
                    _this.each(arr, function (c) {
                        _this.layout(i, arr, 'hide');
                        towards(c);
                        _this.layout(i, arr, 'show');
                    })
                } else {
                    clearInterval(tomove);
                    if (typeof option.callBack == 'function')option.callBack();
                }
                option.steps--;
            }, option.speed || 100)
        },
        //动画方法
        animate: function (fns, option) {
            var steps = 0;
            var toshow = setInterval(function () {
                if (steps < option.end) {
                    typeof fns == 'function' ? fns(steps) : fns[steps](steps);
                }
                if (steps == option.end) {
                    clearInterval(toshow);
                }
                steps++;
            }, option.speed || 300);
        },
        //全屏闪烁方法，未实现，this指向有问题
        shine: function () {
            this.animate(function (a) {
                this.each(function (i) {
                    (bg.btns[i].checked == '') ? bg.btns[i].checked = 'checked' : bg.btns[i].checked = '';
                })
            }, {end: 4, speed: 400})
        },
        //todo
        countdownTimer: function () {
        },
        //字母与数字
        printWord: function (word, start) {
            var s = word.split('');
            var b = start || (x * 3 + 3);
            var wordModel = {
                a: [[0, -2], [-1, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-2, 1], [2, 1], [-2, 2], [2, 2]],
                b: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, 0], [-1, -2], [0, 2], [0, 0], [0, -2], [1, 1], [1, -1]],
                c: [[-2, 1], [-2, 0], [-2, -1], [-1, 2], [-1, -2], [0, 2], [0, -2], [1, 2], [1, -2]],
                d: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, -2], [0, 2], [0, -2], [1, 1], [1, 0], [1, -1]],
                e: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, 0], [-1, -2], [0, 2], [0, 0], [0, -2], [1, 2], [1, 0], [1, -2]],
                f: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 0], [-1, -2], [0, 0], [0, -2], [1, 0], [1, -2]],
                g: [[-1, -2], [0, -2], [1, -2], [2, -2], [-2, -1], [-2, 0], [1, 0], [2, 0], [-2, 1], [2, 1], [-1, 2], [1, 2], [2, 2]],
                h: [[-2, -2], [1, -2], [-2, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [-2, 1], [1, 1], [-2, 2], [1, 2]],
                i: [[-1, -2], [0, -2], [1, -2], [0, -1], [0, 0], [0, 1], [-1, 2], [0, 2], [1, 2]],
                j: [[-1, -2], [0, -2], [1, -2], [0, -1], [0, 0], [-2, 1], [0, 1], [-1, 2]],
                k: [[-2, -2], [1, -2], [-2, -1], [0, -1], [-2, 0], [-1, 0], [-2, 1], [0, 1], [-2, 2], [1, 2]],
                l: [[-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2], [-1, 2], [0, 2], [1, 2]],
                m: [[-2, -2], [2, -2], [-2, -1], [-1, -1], [1, -1], [2, -1], [-2, 0], [0, 0], [2, 0], [-2, 1], [2, 1], [-2, 2], [2, 2]],
                n: [[-2, -2], [1, -2], [-2, -1], [-1, -1], [1, -1], [-2, 0], [0, 0], [1, 0], [-2, 1], [1, 1], [-2, 2], [1, 2]],
                o: [[-1, -2], [0, -2], [-2, -1], [1, -1], [-2, 0], [1, 0], [-2, 1], [1, 1], [-1, 2], [0, 2]],
                p: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [-2, 1], [-2, 2]],
                q: [[-1, -2], [0, -2], [1, -2], [-2, -1], [2, -1], [-2, 0], [0, 0], [2, 0], [-2, 1], [1, 1], [2, 1], [-1, 2], [0, 2], [1, 2], [2, 2]],
                r: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [-2, 1], [0, 1], [-2, 2], [1, 2]],
                s: [[-1, -2], [0, -2], [1, -2], [-2, -1], [-1, 0], [0, 0], [1, 1], [-2, 2], [-1, 2], [0, 2]],
                t: [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [0, -1], [0, 0], [0, 1], [0, 2]],
                u: [[-2, -2], [1, -2], [-2, -1], [1, -1], [-2, 0], [1, 0], [-2, 1], [1, 1], [-1, 2], [0, 2]],
                v: [[-2, -2], [2, -2], [-2, -1], [2, -1], [-2, 0], [2, 0], [-1, 1], [1, 1], [0, 2]],
                w: [[-2, -2], [2, -2], [-2, -1], [2, -1], [-2, 0], [0, 0], [2, 0], [-2, 1], [-1, 1], [1, 1], [2, 1], [-2, 2], [2, 2]],
                x: [[-2, -2], [2, -2], [-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1], [-2, 2], [2, 2]],
                y: [[-2, -2], [2, -2], [-1, -1], [1, -1], [0, 0], [0, 1], [0, 2]],
                z: [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [1, -1], [0, 0], [-1, 1], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]]
            };
            for (var i = 0; i < s.length; i++) {
                var longWord = 'agmqvwxyz';
                var thisWord = s[i];
                var distance = longWord.indexOf(thisWord) == -1 ? 5 : 6;
                this.layout(b, wordModel[thisWord], 'show')
                b = b + distance;
            }
            var numModel = {
                //todo
            };
        }
    };
    //返回实例
    return new model();
})();
