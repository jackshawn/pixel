(function(window, undefined) {
    const w = document.documentElement.clientWidth; // 页面宽
    const h = document.documentElement.clientHeight; // 页面高
    const l = 13;
    const x = (w / l) | 0;
    const y = (h / l) | 0;
    const all = x * y;
    const center = (((y % 2 == 0) ? (all - x) / 2 : (all / 2 )) - 1) | 0;
    let btns = [];

    let pixel = function(model, position) {
        return new pixel.fn.init(model, position);
    };

    pixel.fn = pixel.prototype = {
        init: function(model, position) {
            // 传入函数时延迟1.2s后执行
            if(Object.prototype.toString.call(model) === '[object Function]') {
                setTimeout(model, 1200)
            } else {
                this.p = position || center;
                if(Object.prototype.toString.call(model) === '[object Array]') {
                    // 二维数组
                    if(typeof model[0] == 'object') {
                        this.model = model.map(a => this.p + a[0] + a[1] * x);
                    }
                    // 一维数组
                    if(typeof model[0] == 'number') {
                        this.model = model;
                    }
                }
                // 数字
                if(typeof model == 'number') {
                    this.model = [model];
                }
                //字符串
                if(Object.prototype.toString.call(model) === '[object String]') {
                    const words = {
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
                    let result = []
                    let offset = 0
                    let longWord = 'amqvwxyz'
                    model.split('').forEach(i => {
                        words[i].forEach(j => {
                            let arr = [j[0] + offset, j[1]]
                            result.push(arr)
                        })
                        if(longWord.indexOf(i) > -1) {
                            offset += 6; // 长
                        } else if(longWord.indexOf(i) == -1) {
                            offset += 5; // 短
                        } else {
                            offset += 4; // 数字与符号
                        }
                    })
                    this.origin = result.map(a => this.p + a[0] + a[1] * x);
                    this.model = result.map(a => this.p + a[0] + a[1] * x);
                }
                this.n = this.model.length;
                this.model.sort();
                this.getRandom = () => {
                    this.random = this.model.concat([]).sort(() => .5 - Math.random());
                }
                this.getRandom();
                this.wait = 0;
            }
        },
        show() {
            this.model.forEach(i => btns[i].checked = true);
            return this;
        },
        hide() {
            this.model.forEach(i => btns[i].checked = false);
            return this;
        },
        animate({callback, steps, speed = 300}) {
            let step = 0;
            setTimeout(() => {
                let t = setInterval(() => {
                    if(step == steps) {
                        clearInterval(t);
                    } else {
                        callback.call(this, step)
                        step++;
                    }
                }, speed);
            }, this.wait)
            this.wait += (steps * speed)
            return this;
        },
        print() {
            return this.animate({
                callback(step) {
                    btns[this.model[step]].checked = true;
                },
                steps: this.n,
                speed: 20
            });
        },
        move({target = 'right', steps, speed}) {
            let next = (() => {
                let result = [];
                switch(target) {
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
            return this.animate({
                callback(step) {
                    this.hide()
                    this.model = this.model.map(i => i + next);
                    this.show()
                    if(steps == step + 1) {
                        this.getRandom()
                    }
                },
                steps, speed
            });
        },
        fadeIn() {
            return this.animate({
                callback(step) {
                    btns[this.random[step]].checked = true
                },
                steps: this.n,
                speed: 30,
            });
        },
        fadeOut() {
            return this.animate({
                callback(step) {
                    btns[this.random[step]].checked = false
                },
                steps: this.n,
                speed: 30
            });
        },
        slideDown() {
            let top = (this.model[0] / x + 1) | 0;
            let bottom = (this.model[this.n - 1] / x + 1) | 0
            return this.animate({
                callback(step) {
                    this.model.forEach(i => {
                        if(i < (top + step) * x) {
                            btns[i].checked = true;
                        }
                    })
                },
                steps: bottom - top + 2,
                speed: 100
            });
        },
        slideUp() {
            let top = (this.model[0] / x + 1) | 0;
            let bottom = (this.model[this.n - 1] / x + 1) | 0
            return this.animate({
                callback(step) {
                    this.model.forEach(i => {
                        if(i > (bottom - step) * x) {
                            btns[i].checked = false;
                        }
                    })
                },
                steps: bottom - top + 2,
                speed: 100
            });
        },
        shake() {
            return this.animate({
                callback(step) {
                    this.hide()
                    let offset = step % 2 == 0 ? 1 : -1
                    this.model = this.model.map(i => i + offset);
                    this.show()
                },
                steps: 6,
                speed: 30
            });
        },
        shine() {
            return this.animate({
                callback(step) {
                    step % 2 == 0 ? this.hide() : this.show()
                },
                steps: 6,
                speed: 120
            });
        },
        rotate() {

        },
    };
    pixel.get = () => {
        return {
            x: x,
            y: y,
            all: all,
            center: center,
            btns: btns
        }
    };
    pixel.output = () => {
        let selected = []
        btns.forEach((i, index) => {
            if(i.checked) {
                selected.push(index)
            }
        })
        return '[' + selected.toString() + ']'
    };
    pixel.shine = () => {
        let n = 0;
        let t = setInterval(() => {
            if(n == 6) {
                clearInterval(t)
            } else {
                btns.forEach(i => {
                    i.checked = !i.checked;
                })
                n++;
            }
        }, 50)
    };
    pixel.clear = () => {
        btns.forEach(i => {
            i.checked = false;
        })
    };
    pixel.draw = () => {
        document.body.onmousedown = () => {
            this.onmouseover = e => {
                let thisx = (e.clientX / l) | 0,
                    thisy = (e.clientY / l) | 0;
                btns[thisx + x * thisy].checked = true;
            };
        };
        document.body.onmouseup = () => {
            this.onmouseover = '';
        };
    };
    pixel.record = () => {
        pixel.draw()
        let records = '';
        let t = setInterval(() => {
            if(pixel.output().length > 2) {
                records += ',' + pixel.output()
            }
        }, 100)
        document.onkeydown = (e) => {
            if(e.keyCode === 32) {
                console.log('[' + records.substr(1) + ']');
                clearInterval(t)
            }
        }
    }
    pixel.play = (arr) => {
        let n = 0;
        let t = setInterval(() => {
            if(n == arr.length - 1) {
                clearInterval(t);
            } else {
                arr[n].forEach(i => {
                    btns[i].checked = true;
                })
                n++
            }
        }, 100)
    };


    (function() {
        // 设置样式
        let styleNode = document.createElement('style'),
            str = 'body{margin:0;overflow:hidden;padding-left:3px;padding-top:1px;line-height:13px;}input{margin:-1px 0;display:inline-block;width:13px;height:13px;}';
        if(styleNode.styleSheet) {
            styleNode.styleSheet.cssText = str;
        } else {
            styleNode.innerHTML = str;
        }
        document.getElementsByTagName('head')[0].appendChild(styleNode);

        // 填充按钮
        for(let i = 0; i < all; i++) {
            let input = document.createElement('input');
            input.type = 'checkbox';
            input.title = `x: ${i % x} y: ${(i / x) | 0} index: ${i}`;
            document.body.appendChild(input);
            btns.push(input);
        }
    })();


    pixel.fn.init.prototype = pixel.fn;
    window.pixel = window.$ = pixel;
})(window, undefined);
