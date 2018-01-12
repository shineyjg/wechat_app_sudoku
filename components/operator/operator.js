// operator.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object
    },
    current: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap: function (e) {
      // console.log('operator tap', e.currentTarget.dataset.id)
      this.triggerEvent('setCellDigit', e.currentTarget.dataset.id, { bubbles: true, composed: true})
    }
  },
  ready: function () {
    // console.log(this.properties.data)
  }
})
