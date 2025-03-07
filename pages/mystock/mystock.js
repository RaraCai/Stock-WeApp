// 定义股票对象的类型

Page({
  data: {
    stockList: []
  },

  onLoad: function() {
    // 获取自选股票列表
    this.getMyStocks()
  },

	/*
	* @brief 从后端获取用户自选股票数据
	* @param null
	* @return 填充本页面的股票列表
	*/ 
  getMyStocks: function() {
    
  },

  goToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  goToDetail: function(e) {
    const stock = e.currentTarget.dataset.stock
    wx.navigateTo({
      url: `/pages/stock-detail/stock-detail?code=${stock.code}`
    })
  }
}) 