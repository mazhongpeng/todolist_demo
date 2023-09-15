window.onload = function() {
    var dian = document.querySelector('.dian');
    var body = document.body;
    var cotton = document.querySelector('.cotton');
    var img = document.querySelector('.img');
    var ull = document.querySelector('.picture');
    var lis = ull.querySelectorAll('li');
    var list = document.querySelector('.list');
    var texts = document.querySelector('#texts');
    var yanse = document.querySelector('.yanse');
    var llis = yanse.querySelectorAll('li');
    var doing = document.querySelector('.doing');
    var finish = document.querySelector('.finish');
    var timing = document.querySelectorAll('.timing');
    var buts = document.querySelectorAll('#but');
    var inputs = document.querySelectorAll('.inputs');
    var delay = document.querySelectorAll('.delay');
    var per = cotton.querySelectorAll('p');
    var arr = [];
    var she = ['powderblue', 'deepskyblue', 'orange', 'chartreuse', 'salmon'];
    var arrString, data, num = 1,
        bac = '';
    // 点击ull中的li使body换上与li中一样的图片
    for (var i = 0; i < lis.length; i++) {
        // 设置一个自定义属性来存放下标
        lis[i].setAttribute('index', i);
        // 将每个背景的路径都储存到数组中
        arr.push(lis[i].children[0].src);
        lis[i].onclick = function() {
            // 获取下标
            let index = this.getAttribute('index');
            // 当点击右下角的小图片时让bady中的背景图片换为刚刚点击的图片
            body.style.backgroundImage = "url(" + JSON.parse(data)[index] + ")";
            // 将当前bady的背景图片存储到本地保存方便后面使用
            localStorage.setItem('bacc', JSON.parse(data)[index]);
        }
    }
    // 将数组转化为本地存储可以读取的字符串类型
    arrString = JSON.stringify(arr);
    // 将数据储存到本地存储中
    localStorage.setItem("todolist", arrString);
    // 获取本地储存中照片的路径
    data = localStorage.getItem("todolist");
    // 获取当前bady的背景图片
    bac = localStorage.getItem('bacc');
    // 设置body的背景图片
    if (bac !== '') {
        body.style.backgroundImage = "url(" + bac + ")";

    }
    dian.innerHTML = '';
    for (var i = 0; i < lis.length; i++) {
        // 动态创建li节点
        var li = document.createElement('li');
        // 将li添加到ul中
        dian.appendChild(li);
        // 设置一个自定义属性来获取li的下标
        dian.children[i].setAttribute('index', i);
        // 排他思想让点击的li带上col类名
        dian.children[i].onclick = function() {
            // 获得下标
            let index = this.getAttribute('index');
            for (var j = 0; j < lis.length; j++) {
                dian.children[j].className = '';
            }
            this.className = 'col';
            // 让装图片的ull随li的点击而移动
            ull.style.marginLeft = -index * img.offsetWidth + 'px';
            num = index;
        }
    }
    // 给小圆点初始化
    dian.children[1].className = 'col';
    // 给右下角的背景图片加上动画 
    var timer;

    function move() {
        timer = setInterval(function() {
            if (num == 9) {
                num = 0;
            } else {
                num++;
            }
            ull.style.marginLeft = -num * img.offsetWidth + 'px';
            for (var j = 0; j < lis.length; j++) {
                dian.children[j].className = '';
            }
            dian.children[num].className = 'col';
        }, 2000);
    }
    move();
    // 当鼠标移入时暂停动画
    img.onmouseover = function() {
            clearInterval(timer);
        }
        // 当鼠标移出时开始动画
    img.onmouseout = function() {
            move();
        }
        // 当文本框获得焦点时清空里面的内容
    texts.onfocus = function() {
            texts.value = '';
            texts.onkeydown = function(e) {
                if (e.keyCode == 13) {
                    if (texts.value != '') {
                        var local = [];
                        local = getDate();
                        var obj = { content: texts.value, condition: false, color: false, timed: 0, delay: 0, sometime: 0 }
                        local.push(obj);
                        setDate(local);
                        setli(local);
                        sancu();
                        wancheng();
                        texts.value = '';
                    }
                }
            }
        }
        // 当文本框失去焦点时且文本框内为空时给文本框添加上相应的内容
    texts.onblur = function() {
            if (texts.value == '') {
                texts.value = '添加任务';
            }
        }
        //通过按钮去改变todolist的背景颜色
    for (var i = 0; i < llis.length; i++) {
        llis[i].setAttribute('index', i);
        llis[i].onclick = function() {
            let index = this.getAttribute('index');
            list.style.backgroundColor = she[index];
        }
    }

    function getDate() {
        var date = localStorage.getItem('listdoing');
        if (date !== null) {
            return JSON.parse(date);
        } else {
            return [];
        }
    }

    function setDate(date) {
        localStorage.setItem('listdoing', JSON.stringify(date));
    }
    setli(getDate());
    // 编译计时器里面的内容
    function setli(lis) {
        doing.innerHTML = '';
        finish.innerHTML = '';
        for (var i = 0; i < lis.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('index', i);
            if (lis[i].condition == false) {
                if (lis[i].color == true) {
                    if (lis[i].timed == 0) {
                        li.innerHTML = "<input type='checkbox' name='anniu' class='inputs'>" + "<span>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                            "<select class='timing'>" + "<option selected='selected'>" + '定时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '3分钟' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<select class='delay'>" + "<option>" + '延时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '1个小时' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<p id='shecai'>" + '' + "</p>";
                    } else if (lis[i].timed == 1) {
                        li.innerHTML = "<input type='checkbox' name='anniu' class='inputs'>" + "<span>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                            "<select class='timing'>" + "<option>" + '定时' + "</option>" + "<option selected='selected'>" + '5秒' + "</option>" + "<option>" + '3分钟' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<select class='delay'>" + "<option>" + '延时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '1个小时' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<p id='shecai'>" + '' + "</p>";
                        let ci = lis[i].content;
                        let index = li.getAttribute('index');

                        function jisi() {
                            setTimeout(function() {
                                var arra = getDate()[index];
                                var array = getDate();
                                arra.timed = 0;
                                array.splice(index, 1, arra);
                                setDate(array);
                                var r = confirm('今天你的“' + ci + '”任务完成了吗');
                                if (r == true) {
                                    alert('真棒!');
                                } else {
                                    alert("革命尚未成功，同志们仍需努力啊！");
                                }
                                setli(getDate());
                                clearInterval(timer);
                                onload();
                            }, lis[i].sometime - (+new Date()))
                        }
                        if (lis[i].sometime - (+new Date()) >= 0) {
                            jisi();
                        }
                    } else if (lis[i].timed == 2) {
                        li.innerHTML = "<input type='checkbox' name='anniu' class='inputs'>" + "<span>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                            "<select class='timing'>" + "<option>" + '定时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option selected='selected'>" + '3分钟' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<select class='delay'>" + "<option>" + '延时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '1个小时' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<p id='shecai'>" + '' + "</p>";
                        let ci = lis[i].content;
                        let index = li.getAttribute('index');

                        function jisi() {
                            setTimeout(function() {
                                var arra = getDate()[index];
                                var array = getDate();
                                arra.timed = 0;
                                array.splice(index, 1, arra);
                                setDate(array);
                                var r = confirm('今天你的“' + ci + '”任务完成了吗');
                                if (r == true) {
                                    alert('真棒!');
                                } else {
                                    alert("革命尚未成功，同志们仍需努力啊！");
                                }
                                setli(getDate());
                                clearInterval(timer);
                                onload();
                            }, lis[i].sometime - (+new Date()))
                        }
                        if (lis[i].sometime - (+new Date()) >= 0) {
                            jisi();
                        }
                    } else if (lis[i].timed == 3) {
                        li.innerHTML = "<input type='checkbox' name='anniu' class='inputs'>" + "<span>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                            "<select class='timing'>" + "<option>" + '定时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '3分钟' + "</option>" + "<option selected='selected'>" + '3个小时' + "</option>" + "</select>" +
                            "<select class='delay'>" + "<option>" + '延时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '1个小时' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<p id='shecai'>" + '' + "</p>";
                        let ci = lis[i].content;
                        let index = li.getAttribute('index');

                        function jisi() {
                            setTimeout(function() {
                                var arra = getDate()[index];
                                var array = getDate();
                                arra.timed = 0;
                                array.splice(index, 1, arra);
                                setDate(array);
                                var r = confirm('今天你的“' + ci + '”任务完成了吗');
                                if (r == true) {
                                    alert('真棒!');
                                } else {
                                    alert("革命尚未成功，同志们仍需努力啊！");
                                }
                                setli(getDate());
                                clearInterval(timer);
                                onload();
                            }, lis[i].sometime - (+new Date()))
                        }
                        if (lis[i].sometime - (+new Date()) >= 0) {
                            jisi();
                        }
                    }
                } else {
                    if (lis[i].timed == 0) {
                        li.innerHTML = "<input type='checkbox' name='anniu' class='inputs'>" + "<span>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                            "<select class='timing'>" + "<option selected='selected'>" + '定时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '3分钟' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<select class='delay'>" + "<option>" + '延时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '1个小时' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<p>" + '' + "</p>";
                    } else if (lis[i].timed == 1) {
                        li.innerHTML = "<input type='checkbox' name='anniu' class='inputs'>" + "<span>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                            "<select class='timing'>" + "<option>" + '定时' + "</option>" + "<option selected='selected'>" + '5秒' + "</option>" + "<option>" + '3分钟' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<select class='delay'>" + "<option>" + '延时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '1个小时' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<p>" + '' + "</p>";
                        let ci = lis[i].content;
                        let index = li.getAttribute('index');

                        function jisi() {
                            setTimeout(function() {
                                var arra = getDate()[index];
                                var array = getDate();
                                arra.timed = 0;
                                array.splice(index, 1, arra);
                                setDate(array);
                                var r = confirm('今天你的“' + ci + '”任务完成了吗');
                                if (r == true) {
                                    alert('真棒!');
                                } else {
                                    alert("革命尚未成功，同志们仍需努力啊！");
                                }
                                setli(getDate());
                                clearInterval(timer);
                                onload();
                            }, lis[i].sometime - (+new Date()))
                        }
                        if (lis[i].sometime - (+new Date()) >= 0) {
                            jisi();
                        }
                    } else if (lis[i].timed == 2) {
                        li.innerHTML = "<input type='checkbox' name='anniu' class='inputs'>" + "<span>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                            "<select class='timing'>" + "<option>" + '定时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option selected='selected'>" + '3分钟' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<select class='delay'>" + "<option>" + '延时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '1个小时' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<p>" + '' + "</p>";
                        let ci = lis[i].content;
                        let index = li.getAttribute('index');

                        function jisi() {
                            setTimeout(function() {
                                var arra = getDate()[index];
                                var array = getDate();
                                arra.timed = 0;
                                array.splice(index, 1, arra);
                                setDate(array);
                                var r = confirm('今天你的“' + ci + '”任务完成了吗');
                                if (r == true) {
                                    alert('真棒!');
                                } else {
                                    alert("革命尚未成功，同志们仍需努力啊！");
                                }
                                setli(getDate());
                                clearInterval(timer);
                                onload();
                            }, lis[i].sometime - (+new Date()))
                        }
                        if (lis[i].sometime - (+new Date()) >= 0) {
                            jisi();
                        }

                    } else if (lis[i].timed == 3) {
                        li.innerHTML = "<input type='checkbox' name='anniu' class='inputs'>" + "<span>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                            "<select class='timing'>" + "<option>" + '定时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '3分钟' + "</option>" + "<option selected='selected'>" + '3个小时' + "</option>" + "</select>" +
                            "<select class='delay'>" + "<option>" + '延时' + "</option>" + "<option>" + '5秒' + "</option>" + "<option>" + '1个小时' + "</option>" + "<option>" + '3个小时' + "</option>" + "</select>" +
                            "<p>" + '' + "</p>";
                        let ci = lis[i].content;
                        let index = li.getAttribute('index');

                        function jisi() {
                            setTimeout(function() {
                                var arra = getDate()[index];
                                var array = getDate();
                                arra.timed = 0;
                                array.splice(index, 1, arra);
                                setDate(array);
                                var r = confirm('今天你的“' + ci + '”任务完成了吗');
                                if (r == true) {
                                    alert('真棒!');
                                } else {
                                    alert("革命尚未成功，同志们仍需努力啊！");
                                }
                                setli(getDate());
                                clearInterval(timer);
                                onload();
                            }, lis[i].sometime - (+new Date()))
                        }
                        if (lis[i].sometime - (+new Date()) >= 0) {
                            jisi();
                        }
                    }
                }
                doing.appendChild(li);
            }
            if (lis[i].condition == true) {
                if (lis[i].color == false) {
                    li.innerHTML = "<input type='checkbox' name='anniu' checked='checked' class='inputs'>" + "<span id='line'>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                        "<p>" + '' + "</p>";
                } else {
                    li.innerHTML = "<input type='checkbox' name='anniu' checked='checked' class='inputs'>" + "<span id='line'>" + lis[i].content + "</span>" + "<button id='but'>" + '删除' + "</button>" +
                        "<p id='shecai'>" + '' + "</p>";
                }
                finish.appendChild(li);
            }
        }
        per = cotton.querySelectorAll('p');
        buts = document.querySelectorAll('#but');
        inputs = document.querySelectorAll('.inputs');
        timing = document.querySelectorAll('.timing');
        delay = document.querySelectorAll('.delay');
        sancu();
        wancheng();
        xingxing();
    }
    sancu();
    //删除函数
    function sancu() {
        for (var i = 0; i < buts.length; i++) {
            buts[i].setAttribute('index', i);
            buts[i].onclick = function() {
                let index = this.getAttribute('index');
                var array = getDate();
                array.splice(index, 1);
                setDate(array);
                setli(getDate());
                buts = document.querySelectorAll('#but');
                sancu();
            }
        }
    }
    wancheng();
    // 完成函数
    function wancheng() {
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute('index', i);
            inputs[i].onclick = function() {
                let index = this.getAttribute('index');
                if (this.checked == true) {
                    var arra = getDate().splice(index, 1);
                    arra[0].condition = true;
                    var array = getDate();
                    array.splice(index, 1);
                    array.push(arra[0]);
                    setDate(array);
                } else {
                    var arry = getDate().splice(index, 1);
                    arry[0].condition = false;
                    var array = getDate();
                    array.splice(index, 1);
                    array.splice(0, 0, arry[0]);
                    setDate(array);
                }
                setli(getDate());
                wancheng();
            }
        }
    }
    // 小星星
    xingxing();

    function xingxing() {
        for (var i = 0; i < per.length; i++) {
            per[i].setAttribute('index', i);
            per[i].onclick = function() {
                let index = this.getAttribute('index');
                if (getDate()[index].color == true) {
                    var arra = getDate().splice(index, 1);
                    arra[0].color = false;
                    var array = getDate();
                    array.splice(index, 1, arra[0]);
                    setDate(array);
                } else {
                    var arra = getDate().splice(index, 1);
                    arra[0].color = true;
                    var array = getDate();
                    array.splice(index, 1, arra[0]);
                    setDate(array);
                }
                setli(getDate());
                xingxing();
            }
        }
    }
    times();
    // 计时器
    function times() {
        for (var i = 0; i < timing.length; i++) {
            timing[i].setAttribute('index', i);
            timing[i].onchange = function() {
                let index = this.getAttribute('index');
                var arra = getDate()[index];
                var timet = +new Date();
                var array = getDate();
                if (this.children[0].selected == true) {
                    arra.timed = 0;
                    array.splice(index, 1, arra);
                    console.log(22);
                } else if (this.children[1].selected == true) {
                    arra.timed = 1;
                    arra.sometime = timet + 5000;
                    array.splice(index, 1, arra);
                } else if (this.children[2].selected == true) {
                    arra.timed = 2;
                    arra.sometime = timet + 180000;
                    array.splice(index, 1, arra);
                } else if (this.children[3].selected == true) {
                    arra.timed = 3;
                    arra.sometime = timet + 10800000;
                    array.splice(index, 1, arra);
                }
                setDate(array);
                setli(getDate());
                times();
            }

        }
    }
}