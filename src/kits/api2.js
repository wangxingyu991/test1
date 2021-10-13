import axios from 'axios'
import myAxios from './myAxios'



let ajaxRootPath
ajaxRootPath = '/api'

const getToken = function () {
    let token = sessionStorage.getItem('token');
    if (!token) {
        return false
    }
    return token
}

const getUrl = function (name) {
    let token = getToken()
    if (!token) {
        window['_vm'].$router.push('/login')
        return false
    }
    let url = ajaxRootPath + '?jkDm=' + name + '&token=' + token;
    return url
}
const emptyFunc = () => {}

//ajax post 请求
//url 路径
//paraments body json
//success  returnCode == '0000' 时执行
//fail returnCode != '0000' 时执行
//error 异常时执行
//complete 任何时候都会执行
const post = function (pSetting) {
    //url, paraments, success, fial, error, complete
    let url = pSetting.url
    if (!url) {
        return
    }
    let parament;
    if (pSetting.data) {
        parament = pSetting.data()
    } else {
        parament = pSetting.parament
    }

    let view = pSetting.view;
    let then = pSetting.then
    if (!then) {
        let success = pSetting.success || function (result) {
            pSetting.view.$message({
                message: result.returnMsg,
                type: "success"
            });
        };
        let fail = pSetting.fail || function (result) {
            pSetting.view.$message.error(result.returnMsg);
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
                success(result.data, result)
            } catch (e) {}
            complete(result)
        }
    }
    let error = pSetting.error ? pSetting.error : (error) => {
        if (error.message == '重新登录') {
            view.$message.error('请重新登录')
        } else {
            view.$message.error('操作异常')
        }
    }

    myAxios.post(url, parament).then(then).catch(error);
}

let api = {
    call: (pSetting) => {
        let url = getUrl(pSetting.name)
        pSetting.url = url
        post(pSetting)
    },
    confirmCall: (pSetting) => {
        let title = pSetting.title || '提示'
        let text = pSetting.text || '确定执行此操作?'
        pSetting.view.$confirm(text, title, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            pSetting.url = getUrl(pSetting.name)
            post(pSetting)
        });
    },
    callList: (pSetting) => {

    }
}

export default api