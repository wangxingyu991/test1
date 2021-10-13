import axios from 'axios'
let ajaxRootPath
ajaxRootPath = '/api'

console.log(ajaxRootPath);


const getToken = function () {
    let token = sessionStorage.getItem('token');
    if (!token) {
        return
    }
    return token
}

let ajax = {
    update() {

    },
    //加载页面
    loadView(setting) {
        var token = getToken();
        var url = ajaxRootPath + '?token=' + token + '&jkDm=' + setting.name;
        var view = setting.view;
        console.log(view);
        console.log(url);
        axios.post(url, {
                "page": "1",
                "pageSize": "10"
            }, {
                headers: {}
            }).then(function (res) {
                var result = res.data;
                view.loading = false;
                if (result.returnCode != '0000') {
                    view.$message.error(result.returnMsg);
                    return;
                }
                view.$message({
                    message: result.returnMsg,
                    type: "success"
                });

                try {
                    setting.success(result.data)
                } catch (e) {}
            })
            .catch(function (error) {
                console.log(error);
                //view.loading = false;
                view.$message.error('查询异常');
            });
    },

    query(setting) {
        console.log(setting);
    },


    queryList() {
        axios
            .get("api/getData.php", {
                // 还可以直接把参数拼接在url后边
                params: {
                    title: "眼镜"
                }
            })
            .then(function (res) {
                this.goodsList = res.data;
            })

            .catch(function (error) {
                console.log(error);
            });
    }
}

export default ajax