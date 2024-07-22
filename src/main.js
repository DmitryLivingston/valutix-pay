import { createApp, h, reactive } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import Pusher from 'pusher-js'
import mitt from 'mitt';
const emitter = mitt();


window.axios = axios;
window.Pusher = Pusher;

//Pusher
Pusher.logToConsole = true;
var pusher = new Pusher('31d0a782425bb73ada2c', {
    cluster: 'mt1'
});

emitter.on('turnOnPusher', (callback) => {
  var channelBalance = pusher.subscribe('balance');
  channelBalance.bind('balanceUpdate', function(data) {
      app.config.globalProperties.$pusherInfo.balance = data.balance;
      emitter.emit('balanceUpdate', app.config.globalProperties.$pusherInfo.balance);
  });

  var channelTransaction = pusher.subscribe('transaction');
  channelTransaction.bind('transactionUpdate', function(data) {
    app.config.globalProperties.$pusherInfo.transaction = data.transaction;
      emitter.emit('transactionUpdate', app.config.globalProperties.$pusherInfo.transaction);
      emitter.emit('historyUpdate', app.config.globalProperties.$pusherInfo.transaction);
  });

});


const apiAddress =
  window.location.hostname === 'valutix.io' || window.location.hostname === 'www.valutix.io'
    ? 'https://valutix.io/api'
    : 'https://staging.valutix.io/api';

// Create reactive objects for global state
const globalState = reactive({
  user_ID: sessionStorage.getItem('user_ID') || null,
  status_id: sessionStorage.getItem('status_id') || null,
  session_id: sessionStorage.getItem('session_id') || null,
  user_token: sessionStorage.getItem('user_token') || null,
});

const pusherInfo = reactive({
  transaction: null,
  deposit: null,
  payout: null,
  withdrawal: null,
  cash: null,
  balance: null,
  courses: null,
  user: null,
  check: null,
});

const app = createApp({
  render() {
    return h(App);
  }
});

// Provide the URL parameters and global state to the app
app.config.globalProperties.$globalState = globalState;
app.config.globalProperties.$api_address = apiAddress;
app.config.globalProperties.$pusherInfo = pusherInfo;
app.config.globalProperties.emitter = emitter;

app.use(router).mount('#app');