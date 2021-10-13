import axios from 'axios' //引入axios
import router from '@/router' //引入router

let instance = axios.create({

});

instance.defaults.baseURL = '/api'
instance.defaults.headers.post['Content-Type'] = 'application/json';


// http response 拦截器
instance.interceptors.response.use(
    response => {
        if (sessionStorage.getItem('tlog')) {
            router.push('/login');
            throw SyntaxError('重新登录');
        }
        //拦截响应，做统一处理 
        if (response.data.returnCode) {
            //console.log(response.data.returnCode)
            switch (response.data.returnCode) {
                case '9003':
                case '9004':
                    router.push('/login');
                    //throw SyntaxError('重新登录');
                    throw Error('重新登录');
            }
        }  
        
        if (response.data.token) {
            //console.log('update token!!!!');
            sessionStorage.setItem('token', response.data.token)
        }
        return response
    },
);


export default instance