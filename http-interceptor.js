import axios from 'axios'

axios.interceptor.response.use(
    response => {
        if (response.status === 200) {
        const data = response.data
            if (data.code === -1) {
                clearHanlder()
            }
        }
        return response
    }, err => {
        if( err.response.status === 401 ) {
           clearHanlder()
        }
    }
)

function clearHanlder(){
    // store.commit('setToken', '');
    // localStorage.removeItem('token')
/*     router.push({
        path: '/login',
        query: {redirect: router.currentRoute.path}
        // router.currentRoute.path 回跳到当前页面 
    })  */    
}