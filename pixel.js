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
    let pixel = function (arr, p) {
        return new pixel.fn.init(arr, p);
    };
    
    pixel.fn = pixel.prototype = {
        //迭代方法
        each: function (fn, l) {
            if (l) {
                for (let i = 0; i < l; i++) {
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
        init: function (arg, p) {
            let _this = this;
            //位置索引
            this.p = p || center;
            if (typeof arg == 'object') {
                //二维数组
                if (typeof arg[0] == 'object') {
                    this.l = arg.map(a => _this.p + a[0] + a[1] * x);
                }
                //一维数组
                if (typeof arg[0] == 'number') {
                    this.l = arg;
                }
            } else if (typeof arg == 'number') {
                // 数字
                this.l = [arg];
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
                let s = arg,
                    r = [],
                    l = 0,
                    longWord = 'amqvwxyz';
                _this.each(function (i) {
                    let thisWord = words[s[i]];
                    _this.each(function (i) {
                        thisWord[i][0] += l;
                    }, thisWord.length);
                    if (longWord.indexOf(s[i]) > -1) {
                        l += 6;//长
                    } else if (longWord.indexOf(s[i]) == -1) {
                        l += 5;//短
                    }
                    else {
                        l += 4;//数字与符号
                    }
                    r = r.concat(thisWord);
                }, s.length);
                this.l = r.map(a => _this.p + a[0] + a[1] * x);
            }
            this.n = this.l.length;
        },
        show: function (arg) {
            let state = arg != false;
            return this.each(function (i) {
                if (i >= 0 && i < all) {
                    btns[i].checked = state;
                }
            });
        },
        hide: function () {
            return this.show(false);
        },
        move: function (option, speed) {
            let next = (function () {
                let r = [];
                switch (option.target || 'right') {
                    case 'top':
                        r = [0, -1];
                        break;
                    case 'right':
                        r = [1, 0];
                        break;
                    case 'bottom':
                        r = [0, 1];
                        break;
                    case 'left':
                        r = [-1, 0];
                        break;
                    case 'top-right':
                        r = [1, -1];
                        break;
                    case 'bottom-right':
                        r = [1, 1];
                        break;
                    case 'bottom-left':
                        r = [-1, 1];
                        break;
                    case 'top-left':
                        r = [-1, -1];
                        break;
                    default:
                        break;
                }
                return r[0] + r[1] * x;
            })();
            let steps = 0,
                _this = this,
                spd = speed || 300,
                t = setInterval(function () {
                    if (steps == option.steps) {
                        clearInterval(t);
                    } else {
                        _this.hide();
                        _this.l = _this.l.map(a => a + next);
                        _this.show();
                        steps++;
                    }
                }, spd);
            return this;
        },
        animate: function (option,fn,speed) {
            let _this = this,
                steps = 0,
                spd = speed||300,
                t = setInterval(function () {
                    if(steps==option.steps){
                        clearInterval(t);
                    }else{
                        fn(steps);
                        steps++;
                    }
                },spd);
            return this;
        },
        shine: function (a) {
            let _this = this;
            return this.animate({steps:4},function () {
                _this.each(function (i) {
                    btns[i].checked = !btns[i].checked;
                },a);
            })
        },
        fadeIn: function (speed,s) {
            let _this = this,
             state = s != false;
            this.l.sort(function () {
                return .5-Math.random();
            });
            return this.animate({steps:_this.n},function (t) {
                if(btns[_this.l[t]]){
                    btns[_this.l[t]].checked = state;
                }
            },speed||10)
        },
        fadeOut: function (speed) {
            return this.fadeIn(speed||10,false);
        },
        lineIn: function (speed,s) {
            let _this = this,
                state = s != false;
            return this.animate({steps:_this.n},function (t) {
                if(btns[_this.l[t]]){
                    btns[_this.l[t]].checked = state;
                }
            },speed||10)
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
                selected += ',[' + arr.join() + ']'
            }
        }, all);
        return '[' + selected.substr(1) + ']';
    };
    pixel.shine = function () {
        pixel.fn.shine(all);
    };
    pixel.draw = function () {
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

