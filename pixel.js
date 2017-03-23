(function (window, undefined) {
    const w = document.documentElement.clientWidth,//页面宽
        h = document.documentElement.clientHeight,//页面高
        // checkbox宽
        l = (function () {
            let input = document.createElement('input');
            input.type = 'checkbox';
            document.body.appendChild(input);
            let length = input.offsetWidth;
            document.body.removeChild(input);
            return length;
        })(),
        // 横向个数
        x = (w / l) | 0,
        // 纵向个数
        y = (h / l) | 0,
        // 总个数
        all = x * y,
        // 中心位置索引
        center = (((y % 2 == 0) ? (all - x) / 2 : (all / 2 )) - 1) | 0;
    //checkbox按钮数组
    let btns = [];
    //数组原型上添加拷贝方法
    Array.prototype.copy = function () {
        let newArr = [];
        for (let i in this) {
            newArr[i] = typeof this[i] == 'object' ? this[i].copy() : this[i];
        }
        return newArr;
    };
    let pixel = function (model, position) {
        return new pixel.fn.init(model, position);
    };
    
    pixel.fn = pixel.prototype = {
        //迭代方法
        each: function (fn, length) {
            if (length) {
                for (let i = 0; i < length; i++) {
                    fn(i);
                }
            } else {
                for (let i of this.l) {
                    fn(i);
                }
            }
            return this;
        },
        // 初始化，参数接受二维数组、一维数组、数字与字符串
        init: function (model, position) {
            let _this = this;
            //位置索引
            this.p = position || center;
            if (typeof model == 'object') {
                //二维数组
                if (typeof model[0] == 'object') {
                    this.l = model.map(a => _this.p + a[0] + a[1] * x);
                }
                //一维数组
                if (typeof model[0] == 'number') {
                    this.l = model;
                }
            } else if (typeof model == 'number') {
                // 数字
                this.l = [model];
            }
            //字符串
            else {
                let words = {
                    a: [[0, -2], [-1, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-2, 1], [2, 1], [-2, 2], [2, 2]],
                    b: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, 0], [-1, -2], [0, 2], [0, 0], [0, -2], [1, 1], [1, -1]],
                    c: [[-2, 1], [-2, 0], [-2, -1], [-1, 2], [-1, -2], [0, 2], [0, -2], [1, 2], [1, -2]],
                    d: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, -2], [0, 2], [0, -2], [1, 1], [1, 0], [1, -1]],
                    e: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, 0], [-1, -2], [0, 2], [0, 0], [0, -2], [1, 2], [1, 0], [1, -2]],
                    f: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 0], [-1, -2], [0, 0], [0, -2], [1, 0], [1, -2]],
                    g: [[-1, -2], [0, -2], [1, -2], [-2, -1], [-2, 0], [0, 0], [1, 0], [-2, 1], [1, 1], [-1, 2], [0, 2], [1, 2]],
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
                    z: [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [1, -1], [0, 0], [-1, 1], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]],
                    ' ': [],
                    0: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [0, -1], [-2, 0], [0, 0], [-2, 1], [0, 1], [-2, 2], [-1, 2], [0, 2]],
                    1: [[-1, -2], [-2, -1], [-1, -1], [-1, 0], [-1, 1], [-2, 2], [-1, 2], [0, 2]],
                    2: [[-2, -2], [-1, -2], [0, -2], [0, -1], [-2, 0], [-1, 0], [0, 0], [-2, 1], [-2, 2], [-1, 2], [0, 2]],
                    3: [[-2, -2], [-1, -2], [0, -2], [0, -1], [-2, 0], [-1, 0], [0, 0], [0, 1], [-2, 2], [-1, 2], [0, 2]],
                    4: [[-2, -2], [0, -2], [-2, -1], [0, -1], [-2, 0], [-1, 0], [0, 0], [0, 1], [0, 2]],
                    5: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [-2, 0], [-1, 0], [0, 0], [0, 1], [-2, 2], [-1, 2], [0, 2]],
                    6: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [-2, 0], [-1, 0], [0, 0], [-2, 1], [0, 1], [-2, 2], [-1, 2], [0, 2]],
                    7: [[-2, -2], [-1, -2], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2]],
                    8: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [0, -1], [-2, 0], [-1, 0], [0, 0], [-2, 1], [0, 1], [-2, 2], [-1, 2], [0, 2]],
                    9: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [0, -1], [-2, 0], [-1, 0], [0, 0], [0, 1], [-2, 2], [-1, 2], [0, 2]],
                    '.': [[-1, 1], [0, 1], [-1, 2], [0, 2]],
                    '-': [[-1, 0], [0, 0], [1, 0]],
                    '+': [[-1, 0], [0, 0], [1, 0], [0, 1], [0, -1]],
                    ':': [[-1, -2], [0, -2], [-1, -1], [0, -1], [-1, 1], [0, 1], [-1, 2], [0, 2]]
                };
                let s = model,
                    r = [],
                    l = 0,
                    longWord = 'amqvwxyz';
                _this.each(function (i) {
                    let thisWord = words[s[i]].copy();
                    _this.each(function (i) {
                        thisWord[i][0] = thisWord[i][0] + l;
                        r.push(thisWord[i])
                    }, thisWord.length);
                    if (longWord.indexOf(s[i]) > -1) {
                        l += 6;//长
                    } else if (longWord.indexOf(s[i]) == -1) {
                        l += 5;//短
                    }
                    else {
                        l += 4;//数字与符号
                    }
                }, s.length);
                this.l = r.map(a => _this.p + a[0] + a[1] * x);
            }
            this.n = this.l.length;
            this.getRandom = function () {
                this.r = this.l.concat([]).sort(function () {
                    return .5 - Math.random();
                });
            };
            this.l.sort();
            this.getRandom();
            //动画延时
            this.wait = 0;
        },
        show: function (state) {
            let s = state != false;
            return this.each(function (i) {
                if (i >= 0 && i < all) {
                    btns[i].checked = s;
                }
            });
        },
        hide: function () {
            return this.show(false);
        },
        move: function (option, speed) {
            let _this = this;
            let next = (function () {
                let result = [];
                switch (option.target || 'right') {
                    case 'top':
                        result = [0, -1];
                        break;
                    case 'right':
                        result = [1, 0];
                        break;
                    case 'bottom':
                        result = [0, 1];
                        break;
                    case 'left':
                        result = [-1, 0];
                        break;
                    case 'top-right':
                        result = [1, -1];
                        break;
                    case 'right-top':
                        result = [1, -1];
                        break;
                    case 'bottom-right':
                        result = [1, 1];
                        break;
                    case 'right-bottom':
                        result = [1, 1];
                        break;
                    case 'bottom-left':
                        result = [-1, 1];
                        break;
                    case 'left-bottom':
                        result = [-1, 1];
                        break;
                    case 'top-left':
                        result = [-1, -1];
                        break;
                    case 'left-top':
                        result = [-1, -1];
                        break;
                    default:
                        break;
                }
                return result[0] + result[1] * x;
            })();
            return this.animate(option.steps, function () {
                _this.hide();
                _this.l = _this.l.map(a => a + next);
                _this.show();
            }, speed);
        },
        animate: function (steps, fn, speed) {
            let _this = this,
                step = 0,
                spd = speed || 300;
            setTimeout(function () {
                let t = setInterval(function () {
                    if (step == steps) {
                        clearInterval(t);
                        _this.getRandom();
                        _this.wait = 0;
                    } else {
                        fn(step);
                        step++;
                    }
                }, spd);
            }, this.wait);
            this.wait += (spd * steps + 500);
            return this;
        },
        shine: function (option, n) {
            let _this = this,
                times = option.times || 4,
                spd = option.speed;
            return this.animate(times, function () {
                _this.each(function (i) {
                    btns[i].checked = !btns[i].checked;
                }, n);
            }, spd)
        },
        fadeIn: function (speed, state) {
            let _this = this,
                s = state != false;
            return this.animate(_this.n, function (t) {
                if (btns[_this.r[t]]) {
                    btns[_this.r[t]].checked = s;
                }
            }, speed || 10)
        },
        fadeOut: function (speed) {
            return this.fadeIn(speed, false);
        },
        slideDown: function (speed, s) {
            let _this = this,
                state = s != false,
                spd = speed || 10;
            if (state) {
                return this.animate(_this.n, function (t) {
                    if (btns[_this.l[t]]) {
                        btns[_this.l[t]].checked = state;
                    }
                }, spd)
            } else {
                return this.animate(_this.n, function (t) {
                    if (btns[_this.l[_this.n - t - 1]]) {
                        btns[_this.l[_this.n - t - 1]].checked = state;
                    }
                }, spd)
            }
        },
        slideUp: function (speed) {
            return this.slideDown(speed, false)
        },
        shake: function (times, speed) {
            let _this = this;
            return this.animate(times || 6, function (t) {
                _this.hide();
                _this.l = _this.l.map(a => a + (t % 2 == 0 ? -1 : 1));
                _this.show();
            }, speed || 75)
        },
        rotate: function () {
            
        }
    };
    pixel.get = function () {
        return {
            x: x,
            y: y,
            all: all,
            center: center,
            btns: btns
        }
    };
    pixel.output = function (idx) {
        if(idx&&idx=='record'){
            clearInterval(pixel.prototype.flash.timer)
            return '[' + pixel.prototype.flash.data.substr(1) + ']';
        }else{
            let selected = '',
                x0,
                y0,
                index = idx || center;
            if (typeof index == 'number') {
                x0 = (index / x) | 0;
                y0 = index % x;
            } else {
                x0 = index[0];
                y0 = index[1];
            }
            pixel.fn.each(function (i) {
                if (btns[i].checked) {
                    let arr = [i % x - y0, ((i / x) | 0) - x0];
                    selected += ',[' + arr.join() + ']';
                }
            }, all);
            return '[' + selected.substr(1) + ']';
        }

    };
    pixel.shine = function () {
        pixel.fn.shine(all);
    };
    pixel.draw = function (option) {
        document.body.onmousedown = function () {
            this.onmouseover = function (e) {
                let thisx = (e.clientX / l) | 0,
                    thisy = (e.clientY / l) | 0;
                btns[thisx + x * thisy].checked = true;
            };
        };
        document.body.onmouseup = function () {
            this.onmouseover = '';
        };
        if (option && option == 'record') {
            pixel.prototype.flash = {
                data: '',
                t : setInterval(function () {
                    if(pixel.output().length>2){
                        pixel.prototype.flash.data += ',' + pixel.output()
                    }
                    console.log('.')
                }, 100)
            }
        }
    };
    pixel.play = function (arr) {
        let i = 0,
        t = setInterval(function () {
            $(arr[i]).show();
            if(i==arr.length-1){
                clearInterval(t);
            }
            i++
        },100)
    };
    
    // 设置样式
    (function () {
        let styleNode = document.createElement('style'),
            str = 'body,input{margin:0;overflow:hidden;line-height:12px}';
        if (styleNode.styleSheet) {
            styleNode.styleSheet.cssText = str;
        } else {
            styleNode.innerHTML = str;
        }
        document.getElementsByTagName('head')[0].appendChild(styleNode);
    })();
    // 填充按钮
    pixel.fn.each(function (i) {
        let inputs = document.createElement('input');
        inputs.type = 'checkbox';
        inputs.title = `x: ${i % x} y: ${(i / x) | 0} index: ${i}`;
        inputs.onclick = function () {
            console.log(this.title)
        };
        document.body.appendChild(inputs);
        btns.push(inputs);
    }, all);
    
    pixel.fn.init.prototype = pixel.fn;
    window.pixel = window.$ = pixel;
})(window, undefined);
