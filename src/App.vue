<template>
  <Header 
    v-if="this.$route.name !== 'special'"
    :urlParams="urlParams"
    :merchant="merchant"
    :laying="laying"
  />
  <router-view
  :balances="balances"
  :currencies="currencies"
  :user="user"
  :urlParams="urlParams"
  :merchant="merchant"
  :currency="currency"
  :currency_balance="currency_balance"
  :limits="limits"
  :myHistory="myHistory"
  :refillBalance="refillBalance"
  @login_user="login_user"
  @paramsFromInvoice="paramsFromInvoice"
  @urlParams="getUrlParamsFromLogin"
  />
  <VerificationModal
  :user="user"
  @verify="verify"
  />
</template>

<script>
  import "./css/main.css";
  import Header from '@/components/Header.vue'
  import VerificationModal from '@/components/Verification-modal.vue'
  export default {
    name: "App",
    components: {
        Header,
        VerificationModal
    },
    data() {
        return {
          onLoadUser: false,
          balances: [],
          currencies: [],
          user: [],
          urlParams: [],
          merchant: [],
          mylimits: [],
          myHistory: [],
          currency: '',
          currency_balance: 1,
          refillBalance: sessionStorage.getItem("refillBalance") || false,
          limits: {
            'day_limit': this.user?.status?.id !== 3 ? 10000 : 700000,
            'mounth_limit': this.user?.status?.id !== 3 ? 50000 : 3000000,
            'my_day_limit': 0,
            'my_mounth_limit': 0
          },
          laying: false,

        }
    },

    methods: {
      login_user() {
        this.$router.push("/account");
        this.getInfo();
      },
      logout() {
        this.user = null;
        this.$router.push("/login");
      },
      async getInfo(){
        this.$globalState.user_ID = sessionStorage.getItem('user_ID');
        this.$globalState.status_id = sessionStorage.getItem('status_id');
        this.$globalState.user_token = sessionStorage.getItem('user_token');
        await this.getFullInfo();
        this.getUser();
        this.getLimits();
        this.getPayments();
      },
      verify() {
        this.getUser();
      },
      //getUser
      getUser() {
          this.emitter.emit('turnOnPusher');
          this.onLoadUser = true;
          return axios
            .get(this.$api_address + "/users/" + this.$globalState.user_ID, {
              params: {
                user_id: this.$globalState.user_ID,
                token: sessionStorage.getItem('user_token'),
                status_id: this.$globalState.status_id
              },
            })
            .then((response) => {
              this.user = response.data.data;
              this.$globalState.status_id = this.user.status.id;
              this.balances = response.data.data.balances;
              this.currency_balance = this.balances?.find(b => b.title == this.currency)?.value
              this.onLoadUser = false;
            })
            .catch((error) => {
              console.error("Error fetching user:", error);
              this.onLoadUser = false;
            });
        // }
      },

      getUrlParamsFromLogin(data) {
        this.urlParams = data;
        this.getFullInfo();
      },

        //getParams
        getParams() {
            var myUrlParams = JSON.parse(sessionStorage.getItem('urlParams'));
            if (!myUrlParams || (Object.keys(myUrlParams).length === 0)) {
                console.log('Параметров в сессии нет, пытаемся получить');
                const searchParams = new URLSearchParams(window.location.search);
                const params = {};
                for (const [key, value] of searchParams.entries()) {
                    params[key] = value;
                }
                console.log('Получили эти параметры', params);
                sessionStorage.setItem('urlParams', JSON.stringify(params));
                this.urlParams = JSON.parse(sessionStorage.getItem('urlParams'));
                this.$emit('urlParams', this.urlParams);
            } else {
                console.log('Параметры в сессии есть');
                this.urlParams = JSON.parse(sessionStorage.getItem('urlParams'));
                console.log('Вот параметры из сессии', this.urlParams);
            }

            if (!this.urlParams.merchant_token) {
              if(window.location.pathname !== '/special') {
                this.$router.push("/no-param");
              }
            }
        },

      //paramsFromInvoice
      paramsFromInvoice(data) {
        // this.urlParams.merchant_token = data.merchant_token;
        this.urlParams.summ = data.amount;
        this.urlParams.payment_id = data.payment_id;
        sessionStorage.setItem('urlParams', JSON.stringify(this.urlParams));
        this.urlParams = JSON.parse(sessionStorage.getItem('urlParams'));
      },
        //getMerchant
        getMerchant() {
          return axios
              .get(this.$api_address + "/merchants_by_token", {
                params: {
                  merchant_token: this.urlParams.merchant_token
                },
              })
              .then((response) => {
                this.merchant = response.data.data;
                console.log("this.merchant", this.merchant);
              })
              .catch((error) => {
                console.error("Error fetching user:", error);
              });
      },
      //Получаем лимиты
      getLimits() {
        return axios
            .get(this.$api_address + "/casino_users/" + this.$globalState.user_ID +"/limits", {
              params: {
                user_id: this.$globalState.user_ID,
                merchant_token: this.urlParams.merchant_token
              },
            })
            .then((response) => {
                this.mylimits = response.data.data;
                this.limits.my_day_limit = this.mylimits.at_days_limit
                this.limits.my_mounth_limit = this.mylimits.at_month_limit
            })
            .catch((error) => {
              console.error("Ошибка получения лимитов:", error);
            });
      },

       //Получаем список оплат
       getPayments() {
            axios
            .get(this.$api_address + "/casino_payment_history",{
                params: {
                    user_id: sessionStorage.getItem('user_ID'),
                    token: sessionStorage.getItem('user_token'),
                }
            })
            .then((response) => {
                this.myHistory = response.data.data;
            });
        },
        
      //Получаем валюты
      getCurrencies() {
        return axios
          .get(this.$api_address + "/currencies")
          .then((response) => {
            this.currencies = response.data.data;
            console.log("this.currencies", this.currencies);
          })
          .catch((error) => {
            console.error("Error fetching crypto:", error);
          });
      },

       //Получаем название валюты
      getCurrencyTitle() {
        this.currency = this.currencies?.find(c => c.id == this.merchant?.currency?.id)?.short_title;
        console.log(this.currencies, this.merchant, this.currency);
      },
      async getFullInfo() {
        await this.getCurrencies();
        await this.getMerchant();
        this.getCurrencyTitle();
      }
    },

    watch: {
        'user.status': function(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.limits.day_limit = this.user?.status?.id !== 3 ? 10000 : 700000;
              this.limits.mounth_limit =  this.user?.status?.id !== 3 ? 50000 : 3000000;
            }
        }
    },

    created() {
      if((window.location.pathname == '/special')) {
        sessionStorage.clear();
        localStorage.clear();
      }
      if((window.location.pathname == '/account' || window.location.pathname == '/invoice')) {
        this.urlParams = JSON.parse(sessionStorage.getItem('urlParams'));
        console.log('this.urlParams', this.urlParams);
        this.getFullInfo();
      }

      if(sessionStorage.getItem('user_token')) {
        this.getInfo();
      };
      this.emitter.on('balanceUpdate', (balance) => {
        console.log('balance', balance);
        console.log('balancesss', this.balances);
        // this.balances = pusherInfo;
        let index = this.balances.findIndex(b => b.id == balance.id);
          if(index == -1) {
            return;
          }
      this.balances[index].value = balance.value;
      this.balances[index].frozen_value = balance.frozen_value;
      this.currency_balance = this.balances?.find(b => b.title == this.currency)?.value
      this.getLimits();
      });

      console.log('вот', this.urlParams);
    },
    mounted() { 
      // if(this.$route.name == 'login') {
      //   sessionStorage.clear();
      // }
      this.emitter.on("finish_timer", () => {
        sessionStorage.clear();
        this.urlParams = false;
        this.$router.push("/finish");
      });
      this.emitter.on("userUpdate", (data) => {
        if(data.id == this.user.id) {
          this.user = data;
          this.getLimits();
        if(this.user.status.id == 5) {
          this.logout();
        }
      }
      });
      this.emitter.on("merchantPaymentUpdate", (data) => {
        if(data.status == 'Успех' || data.status == 'Отмена') {
          sessionStorage.setItem("step", 4);
          sessionStorage.setItem("laying", true);
          this.$router.push("/invoice");
          this.laying = true;
          // setTimeout(() => {
          //   this.$router.push("/special");
          // }, 10000);
      }
      });

      this.emitter.on("just_refill_balance", (data) => {
        this.refillBalance = data;
        sessionStorage.setItem("refillBalance", data);
      });

      this.emitter.on("historyUpdate", () => {
        this.getPayments();
      });
    }
  }
</script>