// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		nickname: '微信用户',
  },

  /*
	 * @brief 生命周期函数，监听页面加载用户昵称
	 * @param null
	 * @return null
   */
  onLoad(options) {
		const userInfo = wx.getStorageSync('userInfo');
		this.setData({ userInfo : userInfo });
  },

   /*
	 * @brief 生命周期函数，监听页面加载用户昵称
	 * @param null
	 * @return null
   */
  goToPersonalInfo: function() {
    wx.navigateTo({
      url: '/pages/personal-info/personal-info'
    });
  },

  goToAboutUs: function() {
    wx.navigateTo({
      url: '/pages/about-us/about-us'
    });
  }
})