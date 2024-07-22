<template>
  <section class="account_section">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="balance card d-flex flex-row overflow-hidden">
            <div class="d-flex flex-column balance_info p-4">
              <span class="mb-2">Баланс</span>
              <span>{{currency_balance}} {{currency}}</span>
            </div>
            <button class="bg_lightgreen ms-auto justify-content-center gap-2 p-4 d-flex flex-column border-0" @click="go_next_debit()">
              <img width="30" height="31" src="/static/img/operation-arrow.svg" class="ms-auto">
              <span class="add_balance">Пополнить баланс</span>
            </button>
          </div>
          <div class="invoice_card position-relative card border-0 bg_green text-light p-4">
            <div class="invoice_card_top d-flex justify-content-between align-items-center">
              <div class="d-flex flex-column gap-1">
                <h5 class="h5 mb-0">Счёт на оплату №{{ urlParams.payment_id }}</h5>
                <span>Оплата сервиса <a target="_blank" class="text-green" href="#">{{merchant.title}}</a></span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1">
                <timer/>
              </div>
            </div>
            <div class="invoice_card_bottom d-flex flex-column">
              <span class="mb-1">Сумма к оплате</span>
              <h5 class="h5 mb-3">{{ urlParams.summ }} {{currency}}</h5>
              <button class="button w-100 mw-100" @click="go_next()">Оплатить счет</button>
            </div>
          <span class="text_green under_invoce_card_text">Чтобы оплатить счет пополните баланс</span>

          </div>
        </div>
        <div class="col-12 col-md-7">
          <div class="row">
            <div class="col-12 col-md-10 mx-auto mb_green_bg">
              <div class="profile text-light z-index-2 position-relative">
                <div class="d-flex gap-3 mb-4 align-items-center">
                  <h5 class="h5 m-0">Профиль</h5>
                  <div :class="user.status?.id !== 3 ? 'text_warning' : 'text-green'">
                    {{ user.status?.title }}
                  </div>
                </div>
                <div class="profile_contacts fs-5 d-flex flex-column gap-2">
                  <span>{{ user.email }}</span>
                  <span>{{ user.phone_number }}</span>
                  <span v-if="user.status?.id === 3">{{ user.full_name }}</span>
                </div>
                <span class="mb-3 d-block" v-if="user.status?.id === 3">
                  У вас увеличенные лимиты
                </span>
                <div class="limits d-flex flex-column gap-2">
                  <span class="d-flex align-items-center">Лимиты <img width="11" height="11" class="ms-2" src="/static/img/ico/ico-info.svg"></span>
                  <span class="limits_info mb-2"><span class="pe-2">{{ limits?.my_day_limit }} {{currency}}</span>  из {{ limits?.day_limit }} {{currency}} / сутки</span>
                  <span class="limits_info"><span class="pe-2">{{ limits?.my_mounth_limit }} {{currency}}</span>  из {{ limits?.mounth_limit }} {{currency}} / месяц</span>
                </div>
                  <span class="under_limits" v-if="user.status?.id !== 3 && user.status?.id !== 2">
                    Пройдите верификацию что бы увеличить лимит до 50 000₽ в сутки
                  </span>
                  <button class="button bg-transparent verification_btn" data-bs-toggle="modal" data-bs-target="#verifModal" v-if="user.status?.id !== 3 && user.status?.id !== 2">Пройти верификацию</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <History
  :myHistory="myHistory"
  :currencies="currencies"
  />
</template>

<script>
import History from '@/components/account/History.vue';
import timer from '@/components/Timer.vue';
export default {
  props: ['user', 'urlParams', 'merchant', 'currency', 'currencies', 'currency_balance', 'limits', 'myHistory'],
  components: {
    History,
    timer
  },
  methods: {
    go_next() {
      if(this.urlParams?.summ > this.currency_balance) {
        this.emitter.emit('debit');
      }
      this.$router.push('/invoice');

    },
    go_next_debit() {
      console.log('отправляю');
      this.emitter.emit('debit');
      this.$router.push('/invoice');
    }
  }
}
</script>

<style scoped>

.account_section {
  margin-top: 28px;
  position: relative;
  margin-bottom: 120px;
}

.account_section::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 54%;
  background-color: #35634F;
  z-index: 1;
  border-radius: 5px 0 0 5px;
}

.add_balance {
  max-width: 93px;
  text-align: center;
  color: #FFF;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.z-index-2 {
  z-index: 2 !important
}

.balance {
  background: left / cover no-repeat url('/public/static/img/balance.png');
  border: 1px solid #35634F;
  margin-bottom: 30px;
}

.balance_info {
  color: #000;
}

.balance_info {
  color: #FFF;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.balance_info span:nth-child(2) {
  font-size: 30.5px;
}

.balance_info span:first-child {
  font-size: 20px;
}

.bg_green {
  background: #35634F;
}

.h5 {
  font-size: 25px;
}

.invoice_card_top {
  margin-bottom: 68px;
}

.profile {
  padding: 35px 0 23px ;
}

.profile_contacts {
  margin-bottom: 47px;
  display: flex;
}

.limits {
  background: #212121;
  padding: 23px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.limits_info {
  font-size: 15px;
  font-weight: 400;
}

.limits_info span {
  font-size: 25px;
  font-weight: 600;
}

.under_limits {
  display: block;
  max-width: 350px;
  margin-bottom: 30px;
}

.verification_btn {
  max-width: 400px;
  width: 100%;
}

.verification_btn:hover {
  background-color: #4aa485 !important;
  transition: .2s;
}

.under_invoce_card_text {
  position: absolute;
  bottom: -30px;
  left: 0;
  display: block;
  width: 100%;
  text-align: center;
}

.limits_info br {
  display: none;
}

@media(max-width:768px) {
  .account_section::after {
    display: none;
  }
  .profile {
    padding: 48px 28px;
  }
  .mb_green_bg {
    background: #35634F;
  }

  .invoice_card {
    margin-bottom: 74px;
  }

  .profile_contacts {
    margin-bottom: 20px;
  }

.account_section {
  margin-bottom: 60px;
}

.invoice_card_top {
  margin-bottom: 36px;
}

.payment_history {
  padding-bottom: 60px;
}


}

@media(max-width:500px) {
  .h5{
    font-size: 18px;
  }
  .limits_info {
    font-size: 10px;
    font-weight: 400;
  }
  
  .limits_info span {
    font-size: 20px;
    font-weight: 600;
  }
  .limits {
    margin-bottom: 20px;
  }
}


</style>