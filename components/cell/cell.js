// cell.js
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
    },
    check: {
      type: Boolean
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
    selectCurrent: function () {
      // console.log('cell selectCurrent', this.properties.data.index, this.properties.current)
      this.triggerEvent('selectCurrent', this.properties.data.index, { bubbles: true, composed: true})
    }
  },
  ready: function () {
    // console.log('cell ready()', this.properties.data, this.properties.check)
  }
})
