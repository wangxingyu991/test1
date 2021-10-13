//import axios from 'axios'
import myAxios from './myAxios'



let ajaxRootPath
ajaxRootPath = '/api'



let kits = function () {
    const view = this

    const emptyFunc = () => {}

    const toast = {
        message(msg) {
            view.$message({
                message: msg,
                type: "success"
            });
        },
        error(msg) {
            view.$message.error(msg);
        }
    }

    const getToken = function () {
        let token = sessionStorage.getItem('token');
        if (!token) {
            view.$router.push('/login')
            throw new Error()
        }
        return token
    }

    const getUrl = function (name) {
        let url = ajaxRootPath + '?jkDm=' + name + '&token=' + getToken();
        return url
    }

    const post = function (url, parament, success, finalFunc) {
        //console.log('post',url,parament,success,finalFunc)
        finalFunc = finalFunc || function () {}

        myAxios.post(url, parament).then(resp => {
                var result = resp.data;
                if (result.returnCode != '0000') {
                    view.$message.error(result.returnMsg);
                    finalFunc()
                    return;
                }
                view.$message({
                    message: result.returnMsg,
                    type: "success"
                });
                let runFianl = true
                try {
                    runFianl = success(result.data)
                } catch (e) {}
                if (runFianl) {
                    finalFunc()
                }
            })
            .catch(function (error) {
                console.log('msg',error.message);
                if(error.message == '重新登录'){
                    view.$message.error('请重新登录')
                } else {
                    view.$message.error('操作异常')
                }
            });
    }

    //ajax post 请求
    //url 路径
    //paraments body json
    //success  returnCode == '0000' 时执行
    //fail returnCode != '0000' 时执行
    //error 异常时执行
    //complete 任何时候都会执行
    const post2 = function (pSetting) {
        //url, paraments, success, fial, error, complete
        let url = pSetting.url
        let parament = pSetting.parament

        let then = pSetting.then
        if (!then) {
            let success = pSetting.success || function (result) {
                view.$message({
                    message: result.returnMsg,
                    type: "success"
                });
            };
            let fail = pSetting.fail || function (result) {
                view.$message.error(result.returnMsg);
            };
            let complete = pSetting.complete || emptyFunc

            then = (response) => {
                var result = response.data;
                if (result.returnCode != '0000') {
                    try {
                        fail(result)
                    } catch (e) {}
                    complete(result)
                    return;
                }

                try {
                    success(result)
                } catch (e) {}
                complete(result)
            }
        }
        let error = pSetting.error ? pSetting.error : (error) => {
            if(error.message == '重新登录'){
                view.$message.error('请重新登录')
            } else {
                view.$message.error('操作异常')
            }
        }

        myAxios.post(url, pSetting.parament).then(then).then((response) => {
            })
            .catch(error);
    }

    let _index = 0;
    let r = {
        ajax: {
            post: post2
        },
        api: {
            //调用api
            call: (name, parament, success) => {
                let setting = {
                    url: getUrl(name),
                    parament,
                    success
                }
                post2(setting)
            },
            callList: (pSetting) => {
                const list = pSetting.list

                const call = function () {
                    let current = list.shift()
                    let url = getUrl(current.name)
                    let parament = current.parament
                    myAxios.post(url, parament).then((response) => {
                        var result = response.data;
                        if (result.returnCode != '0000') {
                            toast.error(result.returnMsg)
                            return;
                        }

                        current.success(result)
                        if (list.length) {
                            call()
                        } else {
                            pSetting.callback()
                        }
                    });
                }

                call()


            },
            update: (name, parament, success,finalFunc) => {
                var url = getUrl(name);
                console.log(name, parament);
                post(url, parament, success,finalFunc)
            },

            load: (name, success) => {
                var url = getUrl(name)
                var parament = Object.assign({}, view.filterData, view.pagination)
                console.log(name, parament)
                post(url, parament, success)
            }
        },
        page: {
            foucus(refName) {
                let el = view.$refs[refName];
                if (!el) {
                    return
                }

                let func = el.focus;
                if (func) {
                    func()
                }
            },
            back(timeout) {
                if (timeout) {
                    setTimeout(() => {
                        view.$emit("reload")
                        view.$emit("back")
                    }, timeout);
                    return
                }
                view.$emit("reload")
                view.$emit("back")
            }
        },
        //
        //
        //
        createIndex: (n) => {
            if (n) {
                return n + (_index++)
            }
            return _index++;
        },
        assign: (data) => {
            return Object.assign({}, data)
        },
        data: (name) => {
            let data = view[name];
            if (data) {
                return Object.assign({}, data)
            }
            return {}
        },
        message: (msg) => {
            view.$message(msg);
        },
        confirm: (pSetting) => {
            let title = pSetting.title || '提示'
            let text = pSetting.text || '确定执行此操作?'
            view.$confirm(text, title, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(pSetting.yes);
        },
        success: (pSetting) => {
            if (typeof pSetting == 'string') {
                view.$message({
                    type: "success",
                    message: pSetting
                });
            } else {
                view.$message(pSetting);
            }
        },

        loadSecelt: (selectName, apiName, callback) => {},
        //
        //
        //
        table: (name, paramentFunc, fillFunc) => {
            const r = {
                load: () => {
                    let url = getUrl(name)
                    let parament = paramentFunc()
                    console.log(name, parament)
                    post(url, parament, fillFunc)
                }
            }
            return r;
        },
        form: (name, paramentFunc, successFunc, finalFunc) => {
            const r = {
                submit: () => {
                    let url = getUrl(name)
                    let parament = paramentFunc()
                    console.log(name, parament)
                    post(url, parament, successFunc, finalFunc)
                },
                reset: () => {

                }
            }
            return r
        },

        //组件
        control: {
            /*
             * 创建标准from组件
             * pSetting
             *   ref  : string, form ref name
             *   name : string, api name
             *   data : function, get parament function
             *   success: function, ajax 操作返回成功
             *   fail : function, ajax 操作返回失败
             *   error : function, ajax 请求错误
             *   complete: function, ajax 请求完成
             */
            getStandardForm(pSetting) {
                console.log('pSetting', pSetting)

                const ref = view.$refs[pSetting.name]
                console.log('ref', ref)

                const submitAjax = () => {
                    view.showBtnLoading = true
                    let url = getUrl(pSetting.api)
                    let parament = pSetting.data ? pSetting.data() : Object.assign({}, view[pSetting.name])
                    let submitSetting = {
                        url,
                        parament,
                        success: pSetting.success || function (result) {
                            view.$message({
                                message: result.returnMsg,
                                type: "success"
                            });
                            setTimeout(() => {
                                view.$emit("reload")
                                view.$emit("back")
                            }, 600);
                        },
                        fail: pSetting.fail || null,
                        complete: pSetting.complete || function (result) {
                            view.showBtnLoading = false
                        },
                        error: pSetting.error || null
                    }
                    post2(submitSetting)
                }



                const r = {
                    submit: () => {
                        ref.validate(valid => {
                            console.log(pSetting.name + ' validate : ', valid)
                            if (valid) {
                                submitAjax()
                                return true
                            } else {
                                //console.log("error submit!!");
                                return false;
                            }
                        });
                    },
                    reset: () => {
                        if (ref) ref.reset()
                    }
                }
                return r
            },
            getStandardTable(pSetting) {

            }
        },

        // json -> treeData
        arr2TreeData(arr, fn_filter, gz) {
            let root = []
            let i = 0
            if (gz == undefined) {
                gz = (child, father) => {
                    return child.pid.indexOf(father.id) > -1
                }
            }
            try {
                arr.forEach(a => {
                    if (fn_filter != undefined && fn_filter(a)) {
                        return true
                    }
                    if (root.length > 0) { // root不空，开始匹配
                        let nRoot = true;
                        for (let i = 0; i < root.length; i++) { // 遍历root, 进行匹配
                            nRoot = true;
                            let r = root[i]
                            if (gz(a, r)) { // r是父元素
                                guizong(r, a, gz)
                            } else if (gz(r, a)) { // a是父元素
                                guizong(a, r, gz)
                                root[i] = a
                            } else { // 未匹配
                                nRoot = false
                            }
                            if (nRoot) { // 匹配成功 进行外层匹配
                                break
                            }
                        }
                        if (!nRoot) { // 跳出循环时， nRoot为false,未匹配成功，新分支，添加进root
                            root.push(a)
                        }
                    } else { // root 空时直接添加
                        root.push(a)
                    }
                });
            } catch (e) {
                console.log(e)
            }

            return root
        },
        /**
         * 从对象数组中获取包含对应属性值的方法
         * @param val 匹配值
         * @param arr 数据数组
         * @param bz_attr 匹配属性名
         * @param qz_attr 取值属性名 （为空返回匹配数据对象）
         * @param obj  （直接赋值对象）
         * @param obj_attr （直接复制对象对应属性）
         * @returns {string|*}
         */
        getParamFormArr(val, arr, bz_attr, qz_attr, obj, obj_attr) {
            let find = arr.find(a => {
                return a[bz_attr] + '' === val + ''
            })
            if (find != undefined) {
                if (qz_attr == null) {
                    return find
                }
                if (obj == null) {
                    return find[qz_attr]
                }
                obj[obj_attr] = find[qz_attr]
            }
            return ''
        }

    } // new kits
    return r
}

// 认祖归宗
function guizong(parent, child, gz) {
    let noPush = false
    if (parent.children != undefined) {
        // 需要遍历 进一步找子集
        parent.children.forEach(p => {
            if (gz(child, p)) {
                guizong(p, child, gz)
                noPush = true // 不push
                return
            }
        })
    } else if (!noPush) {
        parent.children = []
    }
    if (!noPush) {
        // 1.空子集，无需匹配，直接添加, 2.和父元素的子集都不匹配，
        parent.children.push(child);
    }
}

export default kits