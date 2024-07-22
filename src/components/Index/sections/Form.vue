<template>
    <section class="form">
        <div class="container">
            <div class="row gap-3 gap-lg-0">
                <div class="col-12 col-lg-8">
                    <div class="card_form">
                        <div class="row gap-3 gap-lg-0">
                            <div class="left_form col-12 col-lg-6">
                                <div class="mb-3 ms-3 d-flex align-items-center gap-3">
                                    <div class="number">
                                        <span>1</span>
                                    </div>
                                    <span>Выберите исходную валюту</span>
                                </div>
                                <div class="top d-flex flex-column gap-3">
                                    <div class="form_header d-flex justify-content-between">
                                        <h6 class="m-0 ms-2">Отдаете</h6>
                                        <span>Мин: 300 Макс: 9 000 000</span>
                                    </div>
                                    <div class="input-group">
                                        <input type="text" class="form-control border-0" placeholder="Введите сумму" v-model="amount1" aria-describedby="basic-addon2">
                                        <span class="input-group-text gap-2 bg-white rounded-end" id="basic-addon2">{{selectedMethod1 && selectedMethod1 !== '0' ? paymentMethods.find(m => m.name === selectedMethod1).currency : ''}} <img src="/static/img/icons/flag/EU.png" v-if="selectedMethod1"></span>
                                        <span class="change_icon d-none d-lg-block"><img src="/static/img/icons/change.svg" @click="reverseAmount"></span>
                                    </div>
                                    <div class="tab_items">
                                        <button v-for="tab in tabs" :key="tab.id+'giving'" @click="activeTabGiving = tab.id, selectedMethod1 = 0, selectedCurrency1 = 0" class="my_btn tab_item" :class="{ 'is_active': tab.id === activeTabGiving }">{{ tab.name }}</button>
                                    </div>
                                    <div class="filter_options">
                                        <div v-for="tab in tabs" :key="tab.id" class="tab" :class="{ 'is_active': tab.id === activeTabGiving }">
                                            <div class="filter_buttons" v-if="tab.id === activeTabGiving">
                                                <button class="my_btn btn_filter" :class="{ 'is_active': button === selectedCurrency1 }" v-for="button in tab.buttons" :key="button" @click="selectedCurrency1 = button, selectedMethod1 = 0">{{ button }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <select class="form-select form-control shadow-none" v-model="selectedMethod1">
                                        <option value="0">Не выбрано</option>
                                        <option v-for="(option, index) in optionsGiving" :key="index">
                                            {{ option.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="right_form col-12 col-lg-6">
                                <div class="mb-3 ms-3 d-flex align-items-center gap-3">
                                    <div class="number">
                                        <span>2</span>
                                    </div>
                                    <span>Выберите получаемую валюту</span>
                                </div>
                                <div class="top d-flex flex-column gap-3 right_part">
                                    <div class="form_header d-flex justify-content-between">
                                        <h6 class="m-0 ms-2">Получаете</h6>
                                    </div>
                                    <div class="input-group">
                                        <input type="text" class="form-control border-0" placeholder="Введите сумму" v-model="amount2" aria-describedby="basic-addon3">
                                        <span class="input-group-text gap-2 bg-white" id="basic-addon3">{{selectedMethod2  && selectedMethod2 !== '0' ? paymentMethods.find(m => m.name === selectedMethod2).currency : ''}} <img src="/static/img/icons/USDT.png" v-if="selectedMethod2"></span>
                                    </div>
                                    <div class="tab_items">
                                        <button v-for="tab in tabs" :key="tab.id+'receiving'" @click="activeTabReceiving = tab.id, selectedMethod2 = 0, selectedCurrency2 = 0" class="my_btn tab_item" :class="{ 'is_active': tab.id === activeTabReceiving }">{{ tab.name }}</button>
                                    </div>
                                    <div class="filter_options">
                                        <div v-for="tab in tabs" :key="tab.id" class="tab" :class="{ 'is_active': tab.id === activeTabReceiving }">
                                            <div class="filter_buttons" v-if="tab.id === activeTabReceiving">
                                                <button class="my_btn btn_filter" :class="{ 'is_active': button === selectedCurrency2 }" v-for="button in tab.buttons" :key="button" @click="selectedCurrency2 = button, selectedMethod2 = 0">{{ button }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom right_part">
                                    <select class="form-select shadow-none" v-model="selectedMethod2">
                                        <option value="0">Не выбрано</option>
                                        <option :selected="index == 0" v-for="(option, index) in optionsReceiving" :key="index">
                                            {{ option.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="reserves rounded overflow-hidden bg_green d-none d-lg-block">
                            <h6 class="mb-3">Резервы валют</h6>
                            <div class="d-flex justify-content-between flex-wrap row-gap-2 gap-4">
                                <div class="d-flex gap-2 reserves_item" v-for="item in 10">
                                <img src="/static/img/icons/tinkoff.png" width="22" height="22">
                                <div class="d-flex flex-column gap-1">
                                    <p class="title mb-1">Тинькофф</p>
                                    <span>30 000 000₽</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="mb-3 ms-3 d-flex align-items-center gap-3">
                        <div class="number">
                            <span>3</span>
                        </div>
                        <span>Заполните реквизиты</span>
                    </div>
                    <div class="result_form">
                        <div class="result_form_top">
                            <h6 class="ms-2">Ввод данных</h6>
                            <span class='fz-14 mb-1 d-block'>Курс обмена:  90 RUB = 1 USDT</span>
                            <div class="outline_light result_currencies">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="d-flex gap-2"  v-if="selectedMethod1 && selectedMethod1 !== '0'">
                                            <img src="/static/img/icons/tinkoff.png" width="20" height="20">
                                            <div class="d-flex flex-column fz-14">
                                                <span>{{selectedMethod1}}</span>
                                                <span>{{ amount1 }} {{paymentMethods.find(m => m.name === selectedMethod1).currency}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="d-flex gap-2"  v-if="selectedMethod2 && selectedMethod2 !== '0'">
                                            <img src="/static/img/icons/tinkoff.png" width="20" height="20">
                                            <div class="d-flex flex-column fz-14">
                                                <span>{{selectedMethod2}}</span>
                                                <span>{{ amount2 }} {{paymentMethods.find(m => m.name === selectedMethod2).currency}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6 class="ms-2">Введите данные</h6>
                            <form v-if="activeTabGiving == 'fiat' && activeTabReceiving == 'fiat'">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ФИО отправителя">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Номер карты отправителя">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ФИО получателя">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Номер карты получателя">
                            </form>
                            <form v-if="activeTabGiving == 'cashless' || activeTabReceiving == 'cashless'">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Название компании">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Контакт для связи">
                            </form>
                            <form v-if="activeTabGiving == 'crypto' && activeTabReceiving == 'crypto'">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек USDT - TRC20">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек BTC">
                            </form>
                            <form v-if="activeTabGiving == 'cash' && activeTabReceiving == 'cash'">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Дата получения">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Время получения">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Адрес (улица, дом)">
                            </form>
                            <form v-if="activeTabGiving == 'electronic' && activeTabReceiving == 'electronic'">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек Perfect money">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек PayPal">
                            </form>
                            <form v-if="(activeTabGiving == 'cash' && activeTabReceiving == 'fiat') || (activeTabReceiving == 'cash' && activeTabGiving == 'fiat')">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Дата получения">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Время получения">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Адрес (улица, дом)">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ФИО получателя">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Номер карты получателя">
                            </form>
                            <form v-if="(activeTabGiving == 'cash' && activeTabReceiving == 'electronic') || (activeTabReceiving == 'cash' && activeTabGiving == 'electronic')">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Дата получения">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Время получения">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Адрес (улица, дом)">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек Perfect money">
                            </form>
                            <form v-if="(activeTabGiving == 'electronic' && activeTabReceiving == 'fiat') || (activeTabReceiving == 'electronic' && activeTabGiving == 'fiat')">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек Perfect money">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ФИО получателя">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Номер карты получателя">
                            </form>
                            <form v-if="(activeTabGiving == 'crypto' && activeTabReceiving == 'fiat') || (activeTabReceiving == 'crypto' && activeTabGiving == 'fiat')">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек USDT - TRC20">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ФИО получателя">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Номер карты получателя">
                            </form>
                            <form v-if="(activeTabGiving == 'crypto' && activeTabReceiving == 'electronic') || (activeTabReceiving == 'crypto' && activeTabGiving == 'electronic')">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек USDT - TRC20">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек Perfect money">
                            </form>
                            <form v-if="(activeTabGiving == 'crypto' && activeTabReceiving == 'cash') || (activeTabReceiving == 'crypto' && activeTabGiving == 'cash')">
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш Email">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Дата получения">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Время получения">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Адрес (улица, дом)">
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Кошелек USDT - TRC20">
                            </form>
                        </div>
                        <button class="bottom" data-bs-toggle="modal" data-bs-target="#confModal">Обменять сейчас</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Form',
    props: ['paymentMethods', 'currency_from_parent', 'currency_to_parent'],
    data: () => ({
        selectedCurrency1: 0,
        selectedCurrency2: 0,
        selectedMethod1: 0,
        selectedMethod2: 0,
        amount1: 0,
        amount2: 0,
        
    }),
    setup() {
        const activeTabGiving = ref('fiat'); // Для первой группы вкладок
        const activeTabReceiving = ref('fiat'); // Для второй группы вкладок
        const tabs = ref([
            { id: 'fiat', name: 'Фиат', buttons: ['Все', 'KZT', 'RUB', 'USD', 'EUR'] },
            { id: 'cashless', name: 'Безнал', buttons: ['EU – Безнал', 'РФ – Безнал'] },
            { id: 'cash', name: 'Наличные', buttons: ['Выберите город'] },
            { id: 'electronic', name: 'Эл. деньги', buttons: ['Все', 'KZT', 'RUB', 'USD', 'EUR'] },
            { id: 'crypto', name: 'Криптовалюта', buttons: ['Все', 'USDT', 'BTC', 'ETH', 'LTC', 'TON'] },
            // Добавьте остальные вкладки по аналогии
        ]);

        return { activeTabGiving, activeTabReceiving, tabs };
    },
    watch: {
        selectedMethod2: {
            handler(val, oldVal) {
                if(this.selectedMethod1 !== '0' && this.selectedMethod1 !== 0 && val !== '0' && val !== 0) {
                    let firstMethod = this.paymentMethods.find(m => m.name == this.selectedMethod1).link;
                    let secondMethod = this.paymentMethods.find(m => m.name == val).link;
                    console.log('/'+firstMethod+'_'+secondMethod);
                    this.$emit('changeMethod', {
                        currency_from: this.selectedCurrency1,
                        currency_to: this.selectedCurrency2,
                    });
                    this.$router.push(`/${firstMethod}_${secondMethod}`);
                }
                else {
                    this.$emit('changeMethod', {
                        currency_from: 0,
                        currency_to: 0,
                    });
                    this.$router.push('/');
                }
            },
        },
        selectedMethod1: {
            handler(val, oldVal) {
                if(this.selectedMethod2 !== '0' && this.selectedMethod2 !== 0 && val !== '0' && val !== 0) {
                    let secondMethod = this.paymentMethods.find(m => m.name == this.selectedMethod2).link;
                    let firstMethod = this.paymentMethods.find(m => m.name == val).link;
                    this.$emit('changeMethod', {
                        currency_from: this.selectedCurrency1,
                        currency_to: this.selectedCurrency2,
                    });
                    this.$router.push(`/${firstMethod}_${secondMethod}`);
                }
                else {
                    this.$emit('changeMethod', {
                        currency_from: 0,
                        currency_to: 0,
                    });
                    this.$router.push('/');
                }
            },
        },
    },
    computed: {
        optionsGiving() {
            if(this.selectedCurrency1 !== 'Все') {
                const result = this.paymentMethods.filter((option) => option.currency == this.selectedCurrency1);
                return result;
            }
            else {
                return this.paymentMethods;
            }
        },
        optionsReceiving() {
            if(this.selectedCurrency2 !== 'Все') {
                const result = this.paymentMethods.filter((option) => option.currency == this.selectedCurrency2);
                return result;
            }
            else {
                return this.paymentMethods;
            }
        },
    },
    methods: {
        reverseAmount() {
            let tempAmount1 = this.amount1;
            let tempAmount2 = this.amount2;
            this.amount1 = tempAmount2;
            this.amount2 = tempAmount1;
            let tempCurrency1 = this.selectedCurrency1;
            let tempCurrency2 = this.selectedCurrency2;
            let tempTabGiving = this.activeTabGiving;
            let tempTabReceiving = this.activeTabReceiving;
            this.activeTabGiving = tempTabReceiving;
            this.activeTabReceiving = tempTabGiving;
            this.selectedCurrency1 = tempCurrency2;
            this.selectedCurrency2 = tempCurrency1;
            let tempMethod1 = this.selectedMethod1;
            let tempMethod2 = this.selectedMethod2;
            this.selectedMethod2 = tempMethod1;
            this.selectedMethod1 = tempMethod2;
        },
        useDataFromParent() {
            if(Number(this.currency_from_parent) !== 0  && Number(this.currency_to_parent) !== 0) {
                this.selectedCurrency1 = this.currency_from_parent;
                this.selectedCurrency2 = this.currency_to_parent;
            }
        },
    },
    mounted() {
      const currentUrl = window.location.pathname;
      // Избавляемся от начального слеша, если он есть
      const trimmedPath = currentUrl.startsWith('/') ? currentUrl.slice(1) : currentUrl;
      // Разделение пути на части по разделителю '_'
      const parts = trimmedPath.split('_');
      if (parts.length === 2) {
        // Запись значений в переменные
        const [currencyFrom, currencyTo] = parts;

        this.selectedCurrency1 = this.paymentMethods.find(m=> m.link == currencyFrom).currency;
        this.selectedCurrency2 = this.paymentMethods.find(m=> m.link == currencyTo).currency;
        this.selectedMethod1 = this.paymentMethods.find(m=> m.link == currencyFrom).name;
        this.selectedMethod2 = this.paymentMethods.find(m=> m.link == currencyTo).name;

        // Находим вкладку, в buttons которой есть selectedMethod1
        const activeTab1 = this.tabs.find(tab =>
            tab.buttons.some(button => button === this.selectedCurrency1)
        );

        const activeTab2 = this.tabs.find(tab =>
            tab.buttons.some(button => button === this.selectedCurrency2)
        );

        if (activeTab1) {
            this.activeTabGiving = activeTab1.id;
        }

        if (activeTab2) {
            this.activeTabReceiving = activeTab2.id;
        }

      } else {
        console.error('URL не содержит двух частей, разделённых символом "_"');
      }

    },
}
</script>


<style scoped>
.card_form {
    color: #fff;
    /* background: #35634F; */
    margin-bottom: 20px;
}

.top {
    min-height: 298px;
    padding: 20px;
    background: #35634F;

}

.bottom {
    background:#4AA485;
    padding: 20px;
}

.form_header {
    font-size: 14px;
    align-items: center;
}

.form-select option {
    background: #35634F;
    color: #fff;
}

.my_btn {
    padding: 6px 20px;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.tab_items, .filter_buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tab_item {
    border-radius: 5px;
    background: #fff;
    border: 1px solid #fff;
    color: #0A0C1D;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.tab_item:hover, .tab_item.is_active, .btn_filter.is_active {
    background: #4AA485;
    color: #fff;
    border: 1px solid #4AA485;
}

.btn_filter {
    border-radius: 30px;
    border: 1px solid #fff;
    color: #fff;
    background: transparent;
}

.tab {
    display: none;
}

.tab.is_active {
    display: block;
}

.outline_light {
    border: 1px solid #fff;
}

.result_form {
    background: #35634F;
    color: #fff;
    border-radius: 5px;
    text-align: start;
}

.result_form .result_form_top {
    padding: 20px 15px;
    min-height: 443px;
}

.result_form_top form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.result_form button.bottom {
    width: 100%;
    height: 67px;
    border: 0;
    color: #fff;
    border-radius: 0 0 5px 5px;
}

.result_currencies {
    border-radius: 5px;
    padding: 13px 9px;
    margin-bottom: 15px;
    min-height: 69px;
}

.right_part {
    margin-left: -30px;
    padding-left: 50px;
}

.change_icon {
    position: absolute;
    top: calc(50% - 14px);
    right: -45px;
    cursor: pointer;
}

.reserves {
    padding: 10px 20px;
}

.reserves .title {
    font-size: 14px;
}

.reserves span {
    font-size: 12px;
    color: #BCBCBC;
}

/* .reserves_item {
    flex: 1 0 20%;
} */
.number {
    width: 48px;
    aspect-ratio: 1/1;
    border: 2px solid #35634F;
    padding: 6px;
    background-color: #0A0C1D;
    border-radius: 50%;
}

.number span {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #35634F;
}

.left_form .top {
    border-radius: 5px 0 0 0;
}

.left_form .bottom {
    border-radius: 0 0 0 5px;
}

.right_form .top {
    border-radius: 0 5px 0 0;
}

.right_form .bottom {
    border-radius: 0 0 5px 0;
}

@media(max-width: 992px) {
    .card_form {
        background: none;
    }

    .left_form .top, .right_form .top {
        border-radius: 5px 5px 0 0;
    }

    .left_form .bottom, .right_form .bottom {
        border-radius: 0 0 5px 5px;
    }

    .right_part {
        margin-left: 0;
        padding-left: 20px;
    }

    .form {
        padding: 50px 0;
    }
}

@media(max-width: 500px) {
    .card_form {
        margin-bottom: 0;
    }
}

</style>