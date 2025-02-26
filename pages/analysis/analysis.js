// pages/analysis/analysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		currentTab: 'analysis', /*默认显示tab我的估值*/ 
    stockList: [
      { name: '贵州茅台', code: '600519', estimatedPrice: '2000.00' },
      { name: '五粮液', code: '000858', estimatedPrice: '300.00' }
    ],
    selectedStockIndex: null,
    valuationList: [
      { name: '市盈率(动)', value: '32.5', estimate: '31.5' },
      { name: '市盈率(静)', value: '30.8', estimate: '29.8' },
      { name: '市净率', value: '8.5', estimate: '8.2' },
      { name: '市现率', value: '25.6', estimate: '24.8' }
    ],
    analysisList: [
      { name: '同比增长', value: '15.6%' },
      { name: '环比增长', value: '5.2%' }
    ],
    animationData: {} // 用于存储动画数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
		this.loadTabContent(this.data.currentTab);
    this.animation = wx.createAnimation({
      duration: 2500, // 动画持续时间
      timingFunction: 'ease-in-out'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

	},
	
	goToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
	},
	
	switchTab: function(e){
		const tab = e.currentTarget.dataset.tab;
		if (this.data.currentTab === tab) return; 
    this.setData({
      currentTab: tab
    });
		//渲染tab内容
    this.loadTabContent(tab);
	},
	
	loadTabContent(tab) {
    if (tab === 'analysis') {
      // 加载我的估值数据
      this.loadAnalysisData();
    } else if (tab === 'principles') {
      // 加载估值原理数据
      this.loadPrinciplesData();
    }
  },

  // 加载我的估值数据
  loadAnalysisData() {
    // TODO: 实现加载我的估值数据的逻辑
  },

  // 加载估值原理数据
  loadPrinciplesData() {
    // TODO: 实现加载估值原理数据的逻辑
  },

  toggleStockDetail: function(e) {
    const index = e.currentTarget.dataset.index;
    const isSelected = this.data.selectedStockIndex === index;

    if (isSelected) {
      // 收起动画
      this.animation.height(0).opacity(0).step();
      this.setData({
        animationData: this.animation.export(),
        selectedStockIndex: null
      });
    } else {
      // 展开动画
      this.animation.height('auto').opacity(1).step();
      this.setData({
        animationData: this.animation.export(),
        selectedStockIndex: index
      });
    }
  }
})