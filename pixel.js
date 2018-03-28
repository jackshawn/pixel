((window, undefined) => {
    const w = document.documentElement.clientWidth; // 页面宽
    const h = document.documentElement.clientHeight; // 页面高
    const l = 13;
    const x = (w / l) | 0;
    const y = (h / l) | 0;
    const all = x * y;
    const center = (((y % 2 == 0) ? (all - x) / 2 : (all / 2 )) - 1) | 0;
    let btns = [];

    let pixel = (model, position) => {
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
                        A: [[0, -2], [-1, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-2, 1], [2, 1], [-2, 2], [2, 2]],
                        B: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, 0], [-1, -2], [0, 2], [0, 0], [0, -2], [1, 1], [1, -1]],
                        C: [[-2, 1], [-2, 0], [-2, -1], [-1, 2], [-1, -2], [0, 2], [0, -2], [1, 2], [1, -2]],
                        D: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, -2], [0, 2], [0, -2], [1, 1], [1, 0], [1, -1]],
                        E: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 2], [-1, 0], [-1, -2], [0, 2], [0, 0], [0, -2], [1, 2], [1, 0], [1, -2]],
                        F: [[-2, 2], [-2, 1], [-2, 0], [-2, -1], [-2, -2], [-1, 0], [-1, -2], [0, 0], [0, -2], [1, 0], [1, -2]],
                        G: [[-1, -2], [0, -2], [1, -2], [-2, -1], [-2, 0], [0, 0], [1, 0], [-2, 1], [1, 1], [-1, 2], [0, 2], [1, 2]],
                        H: [[-2, -2], [1, -2], [-2, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [-2, 1], [1, 1], [-2, 2], [1, 2]],
                        I: [[-2, -2], [-1, -2], [0, -2], [-1, -1], [-1, 0], [-1, 1], [-2, 2], [-1, 2], [0, 2]],
                        J: [[-1, -2], [0, -2], [1, -2], [0, -1], [0, 0], [-2, 1], [0, 1], [-1, 2]],
                        K: [[-2, -2], [1, -2], [-2, -1], [0, -1], [-2, 0], [-1, 0], [-2, 1], [0, 1], [-2, 2], [1, 2]],
                        L: [[-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2], [-1, 2], [0, 2], [1, 2]],
                        M: [[-2, -2], [2, -2], [-2, -1], [-1, -1], [1, -1], [2, -1], [-2, 0], [0, 0], [2, 0], [-2, 1], [2, 1], [-2, 2], [2, 2]],
                        N: [[-2, -2], [1, -2], [-2, -1], [-1, -1], [1, -1], [-2, 0], [0, 0], [1, 0], [-2, 1], [1, 1], [-2, 2], [1, 2]],
                        O: [[-1, -2], [0, -2], [-2, -1], [1, -1], [-2, 0], [1, 0], [-2, 1], [1, 1], [-1, 2], [0, 2]],
                        P: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [-2, 1], [-2, 2]],
                        Q: [[-1, -2], [0, -2], [1, -2], [-2, -1], [2, -1], [-2, 0], [0, 0], [2, 0], [-2, 1], [1, 1], [-1, 2], [0, 2], [2, 2]],
                        R: [[-2, -2], [-1, -2], [0, -2], [-2, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [-2, 1], [0, 1], [-2, 2], [1, 2]],
                        S: [[-1, -2], [0, -2], [1, -2], [-2, -1], [-1, 0], [0, 0], [1, 1], [-2, 2], [-1, 2], [0, 2]],
                        T: [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [0, -1], [0, 0], [0, 1], [0, 2]],
                        U: [[-2, -2], [1, -2], [-2, -1], [1, -1], [-2, 0], [1, 0], [-2, 1], [1, 1], [-1, 2], [0, 2]],
                        V: [[-2, -2], [2, -2], [-2, -1], [2, -1], [-2, 0], [2, 0], [-1, 1], [1, 1], [0, 2]],
                        W: [[-2, -2], [2, -2], [-2, -1], [2, -1], [-2, 0], [0, 0], [2, 0], [-2, 1], [-1, 1], [1, 1], [2, 1], [-2, 2], [2, 2]],
                        X: [[-2, -2], [2, -2], [-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1], [-2, 2], [2, 2]],
                        Y: [[-2, -2], [2, -2], [-1, -1], [1, -1], [0, 0], [0, 1], [0, 2]],
                        Z: [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [1, -1], [0, 0], [-1, 1], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]],
                        a: [[-1, 0], [0, 0], [-2, 1], [0, 1], [-1, 2], [0, 2]], 
                        b: [[-2, -2], [-2, -1], [-2, 0], [-1, 0], [-2, 1], [0, 1], [-2, 2], [-1, 2]], 
                        c: [[-1, 0], [0, 0], [-2, 1], [-1, 2], [0, 2]], 
                        d: [[0, -2], [0, -1], [-1, 0], [0, 0], [-2, 1], [0, 1], [-1, 2], [0, 2]], 
                        e: [[-1, -1], [-2, 0], [0, 0], [-2, 1], [-1, 1], [-1, 2], [0, 2]], 
                        f: [[-1, -2], [0, -2], [-1, -1], [-2, 0], [-1, 0], [0, 0], [-1, 1], [-1, 2]], 
                        g: [[-1, -1], [-2, 0], [0, 0], [-1, 1], [0, 1], [0, 2], [-2, 3], [-1, 3]], 
                        h: [[-2, -2], [-2, -1], [-2, 0], [-1, 0], [-2, 1], [0, 1], [-2, 2], [0, 2]], 
                        i: [[-2, -2], [-2, 0], [-2, 1], [-2, 2]], 
                        j: [[-1, -2], [-1, 0], [-1, 1], [-2, 2], [-1, 2]], 
                        k: [[-2, -2], [-2, -1], [-2, 0], [0, 0], [-2, 1], [-1, 1], [-2, 2], [0, 2]], 
                        l: [[-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2]], 
                        m: [[-1, 0], [1, 0], [-2, 0], [-2, 1], [0, 1], [2, 1], [-2, 2], [0, 2], [2, 2]], 
                        n: [[-1, 0], [-2, 0], [-2, 1], [0, 1], [-2, 2], [0, 2]], 
                        o: [[-1, 0], [-2, 1], [0, 1], [-1, 2]], 
                        p: [[-2, -1], [-1, -1], [-2, 0], [0, 0], [-2, 1], [-1, 1], [-2, 2], [-2, 3]], 
                        q: [[-1, -1], [0, -1], [-2, 0], [0, 0], [-1, 1], [0, 1], [0, 2], [0, 3]], 
                        r: [[-2, -1], [-2, 0], [-1, 0], [-2, 1], [-2, 2]], 
                        s: [[-1, -1], [0, -1], [-2, 0], [-1, 0], [0, 1], [-2, 2], [-1, 2]], 
                        t: [[-1, -1], [-2, 0], [-1, 0], [0, 0], [-1, 1], [-1, 2], [0, 2]], 
                        u: [[-2, 0], [0, 0], [-2, 1], [0, 1], [-1, 2], [0, 2]], 
                        v: [[-2, 0], [0, 0], [-2, 1], [0, 1], [-1, 2]], 
                        w: [[-2, 0], [0, 0], [2, 0], [-2, 1], [0, 1], [2, 1], [-1, 2], [1, 2]], 
                        x: [[-2, 0], [0, 0], [-1, 1], [-2, 2], [0, 2]], 
                        y: [[-2, 0], [0, 0], [-1, 1], [0, 1], [0, 2], [-2, 3], [-1, 3]], 
                        z: [[-2, 0], [-1, 0], [0, 0], [-1, 1], [-2, 2], [-1, 2], [0, 2]], 
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
                        ',': [[-1, 2], [-2, 3]],
                        '-': [[-1, 0], [0, 0], [1, 0]],
                        '+': [[-1, 0], [0, 0], [1, 0], [0, 1], [0, -1]],
                        ':': [[-1, -2], [0, -2], [-1, -1], [0, -1], [-1, 1], [0, 1], [-1, 2], [0, 2]]
                    };
                    let result = []
                    let offset = 0
                    model.split('').forEach(i => {
                        words[i].forEach(j => {
                            let arr = [j[0] + offset, j[1]]
                            result.push(arr)
                        })
                        if('AMQVWXYZTmw'.indexOf(i) > -1) {
                            offset += 6;
                            return
                        }
                        if('.-+:0123456789Iabcdefghknopqstuvxyz'.indexOf(i) > -1) {
                            offset += 4;
                            return
                        }
                        if('jr'.indexOf(i) > -1) {
                            offset += 3;
                            return
                        }
                        if('il '.indexOf(i) > -1) {
                            offset += 2;
                            return
                        }
                        offset += 5;
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
            this.wait += ((steps * speed) + 200)
            return this;
        },
        print(time = 800) {
            return this.animate({
                callback(step) {
                    btns[this.model[step]].checked = true;
                },
                steps: this.n,
                speed: time / this.n
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
        fadeIn(time = 800) {
            return this.animate({
                callback(step) {
                    btns[this.random[step]].checked = true
                },
                steps: this.n,
                speed: time / this.n
            });
        },
        fadeOut(time = 800) {
            return this.animate({
                callback(step) {
                    btns[this.random[step]].checked = false
                },
                steps: this.n,
                speed: time / this.n
            });
        },
        slideDown(time = 400) {
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
                speed: time / (bottom - top + 2)
            });
        },
        slideUp(time = 400) {
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
                speed: time / (bottom - top + 2)
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
                speed: 50
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
        delay(time = 0){
            this.wait += time;
            return this;
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
    pixel.output = (c = center) => {
        let selected = '['
        btns.forEach((i, index) => {
            if(i.checked) {
                let offsetX = index % x - c % x;
                let offsetY = Math.floor(index / x) - Math.floor(c / x);
                selected += ('[' + [offsetX, offsetY].toString() + ']')
            }
        })
        return selected.replace(/\]\[/g,'],[') + ']'
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


    (() => {
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
