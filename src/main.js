import Vue from 'vue'
import App from './App'
import moment from 'moment'
Vue.use(moment)

Vue.config.productionTip = false

App.mpType = 'app'
// 歌曲时间过滤
Vue.filter("timedata", data => {
  return parseFloat(data / 1000 / 60)
    .toFixed(2)
    .toString()
    .padStart(2, 0);
})
Vue.filter("newplay", (data) => {
  if (data < 10000) {
    return data
  }
  return (data / 10000).toFixed(2) + '万'
})
// 日期过滤
Vue.filter("newtime", (data) => {
  moment.locale();
  return moment(data).format('YYYY--MM--DD')
})

const app = new Vue({
  ...App
})
app.$mount()
