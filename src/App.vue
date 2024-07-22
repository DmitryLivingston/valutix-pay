<template>
  <Header v-if="this.$route.name !== 'special'"/>
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
          refillBalance: false,
          limits: {
            'day_limit': this.user?.status?.id !== 3 ? 10000 : 700000,
            'mounth_limit': this.user?.status?.id !== 3 ? 50000 : 3000000,
            'my_day_limit': this.user?.status?.id !== 3 ? 10000 : 700000,
            'my_mounth_limit': this.user?.status?.id !== 3 ? 50000 : 3000000
          }

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
        // if (sessionStorage.getItem('user_ID')) {
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
              // this.cards = response.data.data.cards;
              // this.cardsCount = this.cards.length;
              // this.wallets = response.data.data.wallets;
              // this.walletsCount = this.wallets.length;
              this.onLoadUser = false;
            })
            .catch((error) => {
              console.error("Error fetching user:", error);
              this.onLoadUser = false;
            });
        // }
      },

      //getParams
      getParams() {
        var myUrlParams = JSON.parse(sessionStorage.getItem('urlParams'));
          if (!myUrlParams || (Object.keys(myUrlParams).length === 0)) {
              const searchParams = new URLSearchParams(window.location.search);
              const params = {};
            for (const [key, value] of searchParams.entries()) {
              params[key] = value;
            }
            sessionStorage.setItem('urlParams', JSON.stringify(params));
            this.urlParams = JSON.parse(sessionStorage.getItem('urlParams'));
          }
          else {
            this.urlParams = JSON.parse(sessionStorage.getItem('urlParams'));
          }
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
        this.currency = this.currencies?.find(c => c.id == this.merchant?.currency_id)?.short_title;
        console.log(this.currencies, this.merchant, this.currency);
      },
      async getFullInfo() {
        await this.getCurrencies();
        await this.getMerchant();
        this.getCurrencyTitle();
      }
    },

    created() {
      this.getParams();
      if(!sessionStorage.getItem('user_token')) {
        this.getFullInfo();
      }
      if (!this.urlParams || (Object.keys(this.urlParams).length === 0)) {
        this.$router.push("/no-param");
      }
      if(sessionStorage.getItem('user_token')) {
        this.getInfo();
      };
      this.emitter.on('balanceUpdate', (pusherInfo) => {
        console.log('pusherInfo', pusherInfo);
        this.balances = pusherInfo;
      });

      this.emitter.on("historyUpdate", () => {
        this.getPayments();
      });
    },
    mounted() { 
      this.emitter.on("finish_timer", () => {
        sessionStorage.clear();
        this.urlParams = false;
        this.$router.push("/finish");
      });
      this.emitter.on("reloadUser", () => {
        this.getUser();
      });
      this.emitter.on("debit", () => {
        this.refillBalance = true;
      });
    }
  }
</script>