Component({
  data: {
    color: "#7A7E83",
    selectedColor: "#c00",
    DBL: "https://antacnwechat.anta.cn/api?method=wx01.common.Homepageym.getDbl"/* 底部导航 */,
  },
  properties: {
    selected: {
      type: Number
    }
  },
  attached() {
    console.log(this.properties.selected);
    var that = this;
    wx.request({
      url: this.data.DBL,
      data: {
        id: "1",
        type: "3"
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log(res.data.data);

          that.setData({
            list: res.data.data
          })
        }
      },
      fail: function () {

      }
    });
  },
  methods: {
    switchTab(e) {//切换
      console.log(e);
      var data = e.currentTarget.dataset.id
      var url = e.currentTarget.dataset.path;
      console.log(data);
      console.log(url);
      wx.switchTab({
        url: url,
      })
      var that = this;

    },
  }

})

