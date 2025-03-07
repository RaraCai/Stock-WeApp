const config = require('../../config.js')
const app = getApp();

Page({
    data: {
        showPopup: false,
        userInfo: null,
        userExists: false,
    },

    onLoad: function () {
        // 获取App全局数据，得知用户是否已经注册
        this.setData({
            userExists: wx.getStorageSync('userExists') || app.globalData.userExists,
        });
    },

    onLogin: function () {
        wx.getUserProfile({
            desc: '用于完善用户资料',
            success: (res) => {
                const userInfo = res.userInfo;
                // 写入缓存
                this.setData({
                    userInfo: userInfo,
                    showPopup: true, // 显示弹窗
                });
            },
            fail: (err) => {
                wx.showToast({
                    title: '授权失败',
                    icon: 'none',
                    duration: 2000
                });
            }
        });
    },

    onAllow: function () {
				// 用户不存在需要先注册
        if (this.data.userExists === false) {
            this.Register();
        } else { // 用户存在，直接登录
            this.Login();
        }
        // 关闭弹窗
        this.setData({ showPopup: false });
        //跳转到自选页面
        wx.switchTab({
            url: '/pages/mystock/mystock',
        });
    },

    onCancel: function () {
        this.setData({
            userInfo: null,
            showPopup: false
        });
        wx.showToast({
            title: '授权失败',
            icon: 'error',
            duration: 2000
        });
    },

    Register: function () {
        wx.request({
            url: `${config.baseUrl}/persons/register`,
            method: 'POST',
            data: {
                name: this.data.userInfo.nickName,
                account: wx.getStorageSync('openid'),
                password: wx.getStorageSync('openid'),
                role: 'user',
            },
            success: (res) => {
                // 修改页面数据
                this.setData({ userExists: true });
                // 修改App全局数据
                app.globalData.userExists = true;
                // 持久化存储用户注册状态
                wx.setStorageSync('userExists', true);
                // 立刻登录
                this.Login();
            },
            fail: (err) => {
                console.log(err);
            }
        });
    },

    Login: function () {
        wx.request({
            url: `${config.baseUrl}/persons/login`,
            method: 'POST',
            data: {
                account: wx.getStorageSync('openid'),
                password: wx.getStorageSync('openid'),
            },
            success: (res) => {
                // 弹窗显示登录成功
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                });
                // 返回用户token和有效时间
                wx.setStorageSync('token', res.data.token);
								wx.setStorageSync('expiresIn', res.data.expiresIn);
								// 保证安全性，将缓存中的openid字段删除
								wx.removeStorageSync('openid');
            },
            fail: (err) => {
                console.log(err);
            }
        })
    },
});