const axios = require('axios')

const getToken = () => {
  return 'Token'
}
const setToken = (token) => {
  return axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
/**判断是否是刷新token请求 */

const ins = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

ins.interceptors.response.use(
  async (res) => {
    if (res.headers.authorization) {
      const token = res.headers.authorization.replace('Bearer ', '')
      setToken(token)
      ins.defaults.headers.Authorization = `Bearer ${token}`
    }
    if (res.headers.refreshtoken) {
      const refreshtoken = res.headers.refreshtoken.replace('Bearer ', '')
      setRefreshToken(refreshtoken)
    }
    if (res.data.code === 401 && !isReFreshResponse(res.config)) {
      //刷新token
      const isSuccess = await refreshToken()
      if (isSuccess) {
        //有新的token后,重新请求
        console.log(' 重新请求');
        res.config.headers.Authorization = `Bearer ${getToken()}`
        const response = await ins.request(res.config)
        return response
      } else {
        //没有新的token,跳转登陆页面
        console.log(' 跳转登陆页面');
      }
    }
    return res.data
  }
)

export default ins;
let promise
async function refreshToken() {
  if (promise) {
    return promise
  }
  console.log('刷新token');
  promise = new Promise(async resolve => {
    const resp = await ins.get('http://localhost:3000/api/auth/refresh', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      __isRefreshToken: true
    })
    resolve(resp.code === 0)
  })
  promise.finally(()=>promise = null)
  return promise
}

function isReFreshResponse(res) {
  return !!res.headers.__isRefreshToken
}