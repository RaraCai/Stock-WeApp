const config = require('./config.js')

App({
  globalData: {
        // 用户信息
		userInfo: null,
		openid: null,
        userExists: false,		
  },
  onLaunch() {
    // 获取用户openid和注册状态
    this.getOpenid();
	},

	/*
	* @brief 获取微信用户openid，查询数据库注册状态
	* @param null
	* @return 未注册用户强制弹窗注册
	*/
	getOpenid(){
        wx.login({
            success: (res) => {
                if(res.code){
                    // 向后端请求微信用户openid
                    wx.request({
                        url: `${config.baseUrl}/wx/openid?code=${res.code}`,
                        method: 'GET',
                        success: (res) => {
                            // 缓存openid到本地
                            wx.setStorageSync('openid', res.data.openid);
                            this.globalData.openid = res.data.openid;

							// 更新注册状态
                            this.globalData.userExists = res.data.userExists;
                        },
                        fail: (err) => {
                            console.error('获取openid失败', err);
                        }
                    });
                }
                else{
                    console.error('登录失败', res.errMsg);
                }
            },
            fail: (err) => {
                console.error('微信登录调用失败', err);
            }
        });
        
    },
}) 