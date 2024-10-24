<template>
    
<div class="container">
    <div class="payment_history">
        <h6>История оплат</h6>
        <div v-if="paginatedElements?.length == 0">
            <p class="text-light fz-16 no-active text-center p-3">Вы не проводили оплаты</p>
        </div>
        <div class="accordion" id="pays_history_accordeon" v-else>
            <div v-for="item in paginatedElements" :key="item.id" class="accordion-item bg-transparent border_green">
              <h2 class="accordion-header" :id="'heading' + item?.id">
                <button class="accordion-button shadow-none flex-row align-items-baseline bg-transparent text-light flex-nowrap collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + item?.id" aria-expanded="false" :aria-controls="'collapse' + item?.id">
                    <div class="row m-0 justify-content-between align-items-center flex-row gap-1 gap-xl-3 active_pays_header flex-lg-nowrap">
                        <div class="p-0 col d-none d-md-flex justify-content-center align-items-center">
                            <img src="/static/img/history_img.svg">
                        </div>
                        <div class="p-0 col-12 col-lg-6 order-3 order-lg-2">{{item?.payment?.operation_title}}</div>
                        <div class="p-0 col col-lg-2 order-1" >{{ parseFloat(item?.payment?.currency_amount ?? item?.payment?.amount).toFixed(item?.payment?.currency?.count_after_point ?? item?.payment?.withdrawal?.currency?.count_after_point) }} {{item?.payment?.currency?.short_title ?? item?.payment?.withdrawal?.currency?.short_title}}</div>
                        <div class="p-0 col order-2 order-lg-3 text-end me-2"
                        :class="{
                            'danger': item?.payment?.status == 'Отмена',
                            'success': item?.payment?.status == 'Успех',
                            'text-warning': item?.payment?.status !== 'Успех' && item?.payment?.status !== 'Отмена'
                        }">{{item?.payment?.status}}</div>
                   </div>
                </button>
              </h2>
              <div :id="'collapse' + item.id" class="accordion-collapse collapse" :aria-labelledby="'heading' + item?.id" data-bs-parent="#pays_history_accordeon">
                <div class="accordion-body bg_green text-light">
                    <div class="row m-0 mb-1">
                        <div class="p-0 col-12 col-lg-2 fz-16">ID</div>
                        <div class="p-0 col-12 col-lg fz-16">{{ item?.payment?.outer_id ?? item?.payment?.id }}</div>
                    </div>
                    <div class="row m-0"  v-if="item?.payment?.status === 'Отмена'">
                        <div class="p-0 col-12 col-lg-2 fz-16">Отмена</div>
                        <div class="p-0 col-12 col-lg fz-16">{{ item?.payment?.cancellation_message }}</div>
                    </div>
                    <template v-if="item?.payment?.status === 'Успех'">
                        <div class="row m-0 mb-1">
                            <div class="p-0 col-12 col-lg-2 fz-16">Списано</div>
                            <div class="p-0 col-12 col-lg fz-16">{{ item?.payment?.amount }} {{item?.payment?.currency?.short_title ?? item?.payment?.withdrawal?.currency?.short_title}}</div>
                        </div>
                        <div class="row m-0 mb-1">
                            <div class="p-0 col-12 col-lg-2 fz-16">Баланс до</div>
                            <div class="p-0 col-12 col-lg fz-16">{{ item?.payment?.balances.before }} {{item?.payment?.currency?.short_title ?? item?.payment?.withdrawal?.currency?.short_title}}</div>
                        </div>
                        <div class="row m-0 mb-1">
                            <div class="p-0 col-12 col-lg-2 fz-16">Баланс после</div>
                            <div class="p-0 col-12 col-lg fz-16">{{ item?.payment?.balances.after }} {{item?.payment?.currency?.short_title ?? item?.payment?.withdrawal?.currency?.short_title}}</div>
                        </div>
                        <div class="row m-0 mb-1">
                            <div class="p-0 col-12 col-lg-2 fz-16">Взято в работу</div>
                            <div class="p-0 col-12 col-lg fz-16">{{ localTime(item?.payment?.hired_at) }}</div>
                        </div>
                        <div class="row m-0">
                            <div class="p-0 col-12 col-lg-2 fz-16">Завершено</div>
                            <div class="p-0 col-12 col-lg fz-16">{{ moment(item?.payment?.updated_at).format("DD-MM-YYYY HH:mm") }}</div>
                        </div>
                        <!-- <div class="row mt-2 m-0">
                            <div class="p-0 col-12 fz-16"><a download :href="item?.payment?.proof">Скачать чек об оплате</a></div>
                        </div> -->
                    </template>

                </div>
              </div>
            </div>
        </div>
        <div class="history_pagen-block">
            <pagination v-model="page" :records="totalChecksCount" :per-page="perPage" @paginate="myCallback" :hide-count="true" :margin-pages="2"/>
        </div>
    </div>
</div>
</template>


<script>
    import pagination from 'v-pagination-3';
    import moment from "moment";
    export default {
    props: ['currencies', 'myHistory'],
    components: {
        pagination,
    },
    filters: {
        format: val => `${val}`.replace(/(\d)(?=(\d{4})+([^\d]|$))/g,
            '$1 '),
    },
    data: () => ({
        page: 1,
        perPage: 10,
        showPayLinks: false,
        showTooltip: false,
        isBuyVisible: false,
        isDepositVisible: false,
        paymentSumm: 0,
        status: sessionStorage.getItem('status_id'),
        isAddCardVisible: false,
        payment_link: "",
        comment: "",
        moment: moment,
        errorText: {
            amount: '',
            comment: '',
            payment_link: '',
            message: '',
        },
    }),

    computed: {
        totalChecksCount() {
            return this.myHistory?.length;
        },
        paginatedElements() {
            const start = (this.page - 1) * this.perPage;
            const end = start + this.perPage;
            return Object.values(this.myHistory).slice(start, end);
        },
        totalPages() {
            const pages = Math.ceil(this.totalChecksCount / this.perPage);
            return pages > 0 ? pages : 1;
        },
    },

    methods: {
        async clipboardPaste() {
            try {
                const clipboardText = await navigator.clipboard.readText();
                this.payment_link = clipboardText;
            } catch (error) {
                console.error('Failed to read from clipboard:', error);
            }
        },

        localTime(time){
                var testDateUtc = moment.utc(time);
                var localDate = moment(testDateUtc).local();
                return localDate.format("DD-MM-YYYY HH:mm");
            },

        // timeHistory() {
        //     let i = 0;
        //     let itemHist = {
        //         "id": 1273,
        //         "payment": {
        //             "id": 218,
        //             "outer_id": "922218",
        //             "status": "В ожидании",
        //             "cancellation_message": null,
        //             "cryptocurrency_amount": "11222",
        //             "currency_amount": "11111",
        //             "commission": "112",
        //             "balance_before": "48375150767.17",
        //             "balance_after": "48375139545.17",
        //             "city": "Тверь",
        //             "payment_title": "Наличные",
        //             "payment_type": "Продажа",
        //             "delivery_type": "Доставка",
        //             "address": "Заводская, 4 кв186",
        //             "date": "2024-06-20",
        //             "time": "15:00-15:30",
        //             "contact": "89143861402",
        //             "code": "QB4AQB582",
        //             "crypto_id": 1,
        //             "currency_id": 4,
        //             "user_id": 3,
        //             "created_at": "2024-06-14T11:42:52.000000Z",
        //             "updated_at": "2024-06-14T11:42:52.000000Z"
        //         }
        //     }
        //     let newHist = [];

        //     for (i = 0; i < 20; i++) {
        //         let newItem = JSON.parse(JSON.stringify(itemHist)); // Deep copy the itemHist object
        //         newItem.id = i; // Set a unique id
        //         newHist.push(newItem); // Add the new item to the newHist array
        //     }
        //     console.log(newHist);
        //     return newHist; // Return newHist instead of newItem
        // },

        //Отменяем оплату
        // cancelPay(id) {
        //     axios.delete(this.$api_address + '/payment_via_links/' + id, {
        //     params: {
        //         token: sessionStorage.getItem('user_token'),
        //     },
        //     }).then(response => {
        //         alert('Операция успешно отменена')
        //     }).catch(function (error) {
        //         alert('Что-то пошло не так, попробуйте снова')
        //     });
        // },

       
    }
    }
</script>

<style scoped>
    .bg_lightgreen {
        background:#4AA485;
    }

    .bg_green {
        background: #35634F;
    }

    .bg_black {
        background: #212121;
    }

    .border_green {
        border-color: #35634F;
    }

    .description h6 {
        text-decoration: underline;
        text-underline-offset: 5px;
    }

    #active_pays_accordeon .border_green {
        border-top: 1px solid #35634F;
        border-radius: 5px;
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

    .balance_info span:last-child, .balance_info span:first-child {
        font-size: 20px;
    }

    h6 {
        display: block;
    }

    .payment_form {
        color: #000;
        background: #35634F;
    }

    .payment_form textarea {
        height: 92px;
    }

    .accordion-button:not(.collapsed)::after, .accordion-button::after {
        background-image: url(/public/static/img/ico/ico-accordeon.svg);
        width: 30px;
        height: 15px;
    }

    .active_pays_header {
        width: 90%;
    }

    .active_pays_header :not(:first-child) {
        font-size: 16px;
    }

    #active_pays_accordeon {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .fz-16 {
        font-size: 16px;
    }

    .links {
        height: 135px;
        border-radius: 5px;
    }

    .links .left {
        border-right: 1px solid #35634F;
    }

    .btn-outline-danger:hover {
        background-color: #FF6D6D;
    }

    .btn-outline-danger {
        color: #fff;
        border-color: #FF6D6D;
        font-size: 16px;
        width: -moz-fit-content;
        width: fit-content;
    }

    .danger {
        color: #FF6D6D;
    }

    .success {
        color: #74ED79;
    }

    .description h6 {
        display: flex;
        align-items: flex-end;
        width: fit-content;
        gap: 10px;
    }

    .pay_link_tooltip {
        z-index: 9999;
    }

    .my_link {
        display: block;
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-wrap: nowrap;
    }

    .no-active {
        border-radius: 5px;
        border: 1px solid #35634F;
        font-size: 20px;
        line-height: normal;
    }


</style>
