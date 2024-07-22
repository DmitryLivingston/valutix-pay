<template>
    <section class="invoice_section">
        <div class="container">

            <!-- step 1 -->
            <div class="card border-0 bg_green text-light step_1_card" v-if="step === 1">
                <div class="top d-flex align-items-center justify-content-between">
                    <div class="d-flex gap-4" v-if="!refillBalance">
                        <h6 class="h6 m-0">Счёт на оплату №{{ urlParams?.payment_id }}</h6>
                        <span class="timer d-none d-md-flex align-items-center gap-1">
                            <timer/>
                        </span>
                    </div>
                    <h6 class="h6" v-else>Пополнить баланс</h6>
                    <div class="arrow-button d-flex align-items-center gap-2 pe-auto" @click="$router.push('/');">
                        <img src="/static/img/backArrow.svg">
                        <span class="d-none d-md-block">Назад</span>
                    </div>
                </div>
                <div class="d-flex d-md-none mb-3 gap-1 align-items-center" v-if="!refillBalance">
                    <timer/>
                </div>
                <div class="d-flex gap-4 mb-2" v-if="!refillBalance">
                    <span>Оплата сервиса</span>
                    <a href="#">{{ merchant?.title }}</a>
                </div>
                <div class="d-flex gap-4 summ" v-if="!refillBalance">
                    <span>Сумма к оплате</span>
                    <span>{{ urlParams?.summ }} {{currency}}</span>
                </div>
                <div class="refillBalance_input" v-if="refillBalance">
                    <input placeholder="Введите сумму" type="number" class="form-control shadow-none mw-fit-content" id="refillBalance_summ" v-model="refillBalance_summ">

                    <p class="refillBalance_input_error m-0" v-if="user.status?.id === 3 && refillBalance_summ > limits?.my_day_limit">
                        Лимит превышен. Ваш лимит {{ limits?.my_day_limit }} {{currency}} сутки.  
                    </p>
                    <p class="refillBalance_input_error m-0" v-if="user.status?.id !== 3 && refillBalance_summ > limits?.my_day_limit">
                        Лимит превышен. Ваш лимит {{ limits?.my_day_limit }} {{currency}} сутки. Повысить лимит до {{ limits?.day_limit }} {{currency}} в сутки можно <a href="#" class="text-green" data-bs-toggle="modal" data-bs-target="#verifModal">верифицируясь</a>. 
                    </p>
                </div>
                <div class="bank_list">
                    <h6 class="h6">Выберите способ оплаты</h6>
                    <div class="modalCards" :class="refillBalance_summ > limits?.my_day_limit ? 'disable' : ''">
                        <div class="item rounded" v-for="method in myMethods" :key="method.id"
                            @click="selectPaymentMethod(method)"
                            :class="method == selectedPaymentMethod ? 'selected' : ''">
                            <img :src="method?.logo">
                            <span>{{ method?.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="bank_list_bottom"
                    v-if="selectedPaymentMethod && (selectedPaymentMethod.id === 3 || selectedPaymentMethod.id === 2)">
                    <div class="modalCards_bottom">
                        <div class="item rounded p-3"
                            v-for="bank in (selectedPaymentMethod.id === 3 ? bankList['uz'] : bankList['kz'])"
                            :key="bank.name" @click="selectPaymentBank(bank)"
                            :class="bank == selectedBank ? 'selected' : ''">
                            <img :src="bank?.logo">
                        </div>
                    </div>
                </div>
            </div>

            <!-- step 2 -->
            <div class="row step_2_block" v-if="step === 2">
                <div class="col-12 col-lg-5">
                    <balance :user="user" :currency_balance="currency_balance" :currency="currency" :limits="limits"
                    />
                </div>
                <div class="col-12 col-lg-7">
                    <div class="rounded bg_green text-light p-4">
                        <div class="top d-flex align-items-center justify-content-between">
                            <div class="d-flex gap-2 gap-md-4">
                                <h6 class="h6 m-0">Счёт на оплату №{{ urlParams.payment_id }}</h6>
                                <span class="timer d-flex align-items-center gap-1">
                                    <timer/>
                                </span>
                            </div>
                            <div class="arrow-button d-flex align-items-center gap-2 pe-auto" @click="back()">
                                <img src="/static/img/backArrow.svg">
                                <span class="d-none d-md-block">Назад</span>
                            </div>
                        </div>
                        <div class="d-flex flex-column flex-md-row gap-2 gap-md-4 mb-13">
                            <span>Оплата сервиса</span>
                            <a href="#">{{ merchant?.title }}</a>
                        </div>
                        <div class="d-flex gap-2 gap-md-4 summ flex-column flex-md-row">
                            <span>Сумма к оплате</span>
                            <span>{{ urlParams?.summ }} {{currency}}</span>
                        </div>
                        <div class="invoice_body">
                            <h6 class="h6 mb-3">Реквизиты для оплаты</h6>
                            <div class="d-flex gap-2 gap-md-4 mb-13 flex-column flex-md-row">
                                <span class="miw-150">Сумма к оплате</span>
                                <div class="d-flex align-items-center gap-3">
                                    <span>{{ urlParams?.summ }} {{currency}}</span>
                                    <span @click="copyCardSumm" class="copy">
                                        <img src="/img/ico/ico-copy.svg" width="12" height="15">
                                        <span @click="changeText">Скопировать</span>
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex gap-2 gap-md-4 mb-13 flex-column flex-md-row">
                                <span class="miw-150">Номер карты</span>
                                <div class="d-flex align-items-center gap-3">
                                    <span>{{ card }} </span>
                                    <span @click="copyCardCard" class="copy">
                                        <img src="/img/ico/ico-copy.svg" width="12" height="15">
                                        <span @click="changeText">Скопировать</span>
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex gap-2 gap-md-4 mb-13 flex-column flex-md-row">
                                <span class="miw-150">Получатель</span>
                                <span>{{name}}</span>
                            </div>
                        </div>
                        <div class="invoice_footer">
                            <span>Совершите перевод по указаным реквизитам и подтвердите перевод. Ваш платеж будет
                                зачислен в течении 1-2 минут</span>
                            <button class="button bg-transparent mw-100 mb-3" @click="back()">Отменить платеж</button>
                            <button class="button mw-100" @click="postDebit()">Я совершил платеж</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- step 3 -->
            <div class="row step_3_block" v-if="step === 3 || step === 4">
                <div class="col-12 col-lg-5">
                    <balance :user="user" :currency_balance="currency_balance" :currency="currency" :limits="limits" />
                </div>
                <div class="col-12 col-lg-7">
                    <div class="rounded bg_green text-light p-4">
                        <div class="top">
                            <h6 class="h6 m-0">Счёт на оплату №{{ urlParams?.payment_id }}</h6>
                        </div>
                        <div class="d-flex gap-4 mb-13">
                            <span class="miw-150">Оплата сервиса</span>
                            <a href="#">{{ merchant?.title }}</a>
                        </div>
                        <div class="d-flex gap-4 mb-13">
                            <span class="miw-150">Сумма к оплате</span>
                            <span>{{ urlParams?.summ }} {{currency}}</span>
                        </div>
                        <div class="d-flex gap-4 mb-13">
                            <span class="miw-150">Номер карты</span>
                            <span>{{ card }} </span>
                        </div>
                        <div class="d-flex gap-4 mb-13">
                            <span class="miw-150">Получатель</span>
                            <span>{{ name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="step === 3 || step === 4">
                <div class="col-12">
                    <div class="p-4 bg_green rounded d-flex align-items-center flex-column gap-5">
                        <h6 class="h6 m-0" v-if="!lastStep && !request_error">Проверяем платёж, это займёт 1-2 минуты.</h6>
                        <h6 class="h6 m-0" v-if="lastStep && !request_error">Ваш платеж успешно выполнен{{ !refillBalance ? ', можете оплатить счет' : '' }}</h6>
                        <h6 class="h6 m-0 text-center" v-if="request_error">Что то пошло не так. <br> Если вы оплатили счет свяжитесь с поддержкой</h6>
                        <div class="text-center" v-if="!lastStep && !request_error">
                            <div class="spinner-border text_green" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <button @click="postTransaction()" class="button step_3_btn" v-if="!refillBalance && !request_error" :disabled="!lastStep">Оплатить счет</button>
                        <button class="button step_3_btn" v-if="request_error">Написать в поддержку</button>
                        <button class="button step_3_btn" v-if="!request_error" @click="$router.push('/account')">Вернуться в кабинет</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import balance from '@/components/invoice/balance.vue'
import timer from '@/components/Timer.vue';
export default {
    components: {
        balance,
        timer
    },
    props: ['user', 'currency', 'urlParams', 'merchant', 'currency_balance', 'limits', 'refillBalance'],
    data: () => ({
        step: 1,
        lastStep: false,
        selectedPaymentMethod: null,
        selectedBank: null,
        card: '',
        name: '',
        myMethods: [],
        refillBalance_summ: 0,
        request_error: false,
        bankList: {
        'ru': [],
        'uz': [],
        'kz': [],
        'eu': [],
        },
    }),
    created() {
        this.getPayments();
        this.getBanks();
    },
    methods: {
        next() {
            this.step++
            if (this.step === 3) {
                setTimeout(() => {
                    this.lastStep = true;
                }, 1000);
            }
        },
        back() {
            this.step--
        },
        copyCardSumm() {
            navigator.clipboard.writeText(this.urlParams.summ);
        },
        copyCardCard() {
            navigator.clipboard.writeText(this.card);
        },
        changeText(event) {
            const originalText = event.target.textContent;
            event.target.textContent = 'Скопировано!';
            setTimeout(() => {
                event.target.textContent = originalText;
            }, 1000);
        },
        getPayments() {
            axios
                .get(this.$api_address + "/payment_methods", {
                })
                .then((response) => {
                this.myMethods = response.data.data;
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        },
        selectPaymentMethod(method) {
            this.selectedPaymentMethod = method;
            if (this.selectedPaymentMethod.id === 1) {
                if(!this.refillBalance && this.currency_balance >= this.urlParams?.summ) {
                    this.postDebit(8);
                }
                if(!this.refillBalance && this.currency_balance < this.urlParams?.summ) {
                    this.postTransaction();
                }
                if(this.refillBalance) {
                    this.postTransaction();
                }
            }
        },
        selectPaymentBank(bank) {
            this.selectedBank = bank;
            if(!this.refillBalance && this.currency_balance >= this.urlParams?.summ) {
                    this.postDebit(this.selectedBank.id);
                }
                if(!this.refillBalance && this.currency_balance < this.urlParams?.summ) {
                    this.postTransaction();
                }
                if(this.refillBalance) {
                    this.postTransaction();
                }
        },
        //getBanks
        async getBanks(){
            const countries = ['ru', 'uz', 'kz', 'eu'];
            try {
                const bankLists = await Promise.all(countries.map(country => 
                axios.get(`${this.$api_address}/banks`, { params: { country } })
                ));
                bankLists.forEach((response, index) => {
                this.bankList[countries[index]] = response.data;
                });
                // this.$globalBanks = this.bankList;
            } catch (error) {
                console.error("Ошибка при получении данных: ", error);
            }
        },

        //Пополнить баланс
        postTransaction() {
            let formData = new FormData();
            formData.append("amount", this.refillBalance_summ);
            formData.append("currency_id", this.merchant.currency_id);
            formData.append("user_id", this.$globalState.user_ID);
            formData.append("payment_method_id", this.selectedPaymentMethod?.id);
            formData.append("token", this.$globalState.user_token);
            formData.append("bank_id", this.selectedPaymentMethod.id === 1 ? 8 : this.selectedBank?.id);
            axios.post(`${this.$api_address}/casino_transactions`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    if(response.data.data){
                        this.emitter.emit('reloadUser');
                        this.next();
                        this.request_error = false;
                        this.name = response.data.data.card_owner;
                        this.card = response.data.data.card_number;
                    }
                    else {
                        this.step = 4;
                        this.request_error = true;
                    }
                }) .catch((error) => {
                    this.step = 4;
                    this.request_error = true;
                    console.error("Error fetching user:", error);
                });
        },
        //Списать с баланса
        postDebit(bank_id) {
            let formData = new FormData();
            formData.append("amount", this.urlParams.summ);
            formData.append("currency_id", this.merchant.currency_id);
            formData.append("user_id", this.$globalState.user_ID);
            formData.append("payment_method_id", this.selectedPaymentMethod?.id);
            formData.append("token", this.$globalState.user_token);
            formData.append("bank_id", bank_id);
            axios.post(`${this.$api_address}/casino_debit`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                        this.next();
                        this.request_error = false;
                }) .catch((error) => {
                    this.next();
                    this.request_error = true;
                    console.error("Error fetching user:", error);
                });
        }
    }
}
</script>

<style scoped>
.h5 {
    font-size: 30.5px;
}

.h6 {
    font-size: 25px;
}

img {
    max-width: 100%;
}

.invoice_section {
    flex: 1;
    color: #fff;
    background: no-repeat bottom left 100% url(/public/static/img/gradient-invoice.png);
}

.step_1_card {
    padding: 20px 32px;
    margin-top: 40px;
}

.top {
    margin-bottom: 13px;
}

.arrow-button {
    cursor: pointer;
}

a {
    color: #69E278;
}

.summ {
    margin-bottom: 48px;
}

.bank_list h6 {
    margin-bottom: 25px;
}

.modalCards {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
}

.modalCards .item {
    padding: 35px 0 22px;
    border: 2px solid #212121;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    background-color: #212121;
    cursor: pointer;
}

.modalCards .item:hover {
    border: 2px solid #69E278;
}

.selected {
    background-color: #4AA485 !important;
    border: 2px solid #4AA485 !important;
}

.bank_list_bottom {
    padding-top: 33px;
}

.modalCards_bottom {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
}

.modalCards_bottom .item {
    border: 2px solid #212121;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    background-color: #212121;
    cursor: pointer;
    max-height: 60px;
}

.modalCards_bottom .item img {
    object-fit: contain;
    max-height: 40px;
}

.step_2_block, .step_3_block {
    margin-top: 40px;
    margin-bottom: 40px;
}

.invoice_body {
    font-size: 16px;
    margin-bottom: 30px;
}

.invoice_footer span {
    font-size: 16px;
    max-width: 435px;
    display: block;
    margin-bottom: 16px;
}

.mb-13 {
    margin-bottom: 13px;
}

.copy {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
    color: #69E278;
}

.miw-150 {
    min-width: 150px;
}

.step_3_btn {
    max-width: 440px;
    width: 100%;
}

.mw-fit-content {
    max-width: fit-content;
}

.refillBalance_input {
    margin-bottom: 48px;
    position: relative;
    display: flex;
}

.refillBalance_input_error {
    position: absolute;
    bottom: -45px;
    color: #FF6D6D;
    max-width: 517px;
}

.disable {
    opacity: .5;
    pointer-events: none;
}

@media(max-width:768px) {
    .invoice_section {
        background: none;
    }
    .h5 {
        font-size: 20.5px;
    }
    .h6 {
        font-size: 20px;
    }
    .summ {
        margin-bottom: 30px;
    }

    .step_2_block {
        margin: 0;
    }
    .step_3_block {
        margin-bottom: 25px;
    }

    .modalCards {
        row-gap: 10px;
        column-gap: 20px;
        grid-template-columns: repeat(2, 1fr);
    }

    .modalCards .item {
        padding: 20px 0 10px;
        gap: 10px;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
    }

    .container {
        padding: 0;
        height: 100%;
    }

    .step_1_card {
        padding: 20px 32px;
        margin-top: 0;
        width: 100%;
        height: 100%;
    }

    .modalCards_bottom {
        row-gap: 10px;
        column-gap: 20px;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 1fr;
    }

    .modalCards_bottom .item {
        padding: 13px 0;
        height: 100%;
    }

    .modalCards_bottom img {
        max-width: 60%;
    }

}
</style>