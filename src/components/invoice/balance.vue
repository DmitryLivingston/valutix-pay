<template>
    <div class="balance card d-flex flex-row justify-content-between overflow-hidden text-light p-3">
        <div class="d-flex flex-column balance_info">
            <h6 class="m-0 fs-5 mb-2">Баланс</h6>
            <h5 class="h5 mb-1 limit_amount">{{currency_balance}} {{currency}}</h5>
        </div>
        <div class="d-flex flex-column align-items-end">
            <div class="d-flex align-items-center gap-2 mb-2">
                <div :class="user.status?.id !== 3 ? 'text_warning' : 'text-green'" class="d-none d-md-block">
                    {{ user.status?.title }}
                  </div>
                <h6 class="m-0 fs-5">Лимит</h6>
            </div>
            <h5 class="h5 mb-0 mb-lg-2 ">{{ limits?.my_day_limit }} {{currency}}</h5>
            <h6 class="m-0 fs-5 mb-fs-5">Из {{ limits?.day_limit }} {{currency}} / сутки</h6>
            <div :class="user.status?.id !== 3 ? 'text_warning' : 'text-green'" class="d-block d-md-none mb-fs-5">
                {{ user.status?.title }}
              </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user', 'currency_balance', 'currency', 'limits']

}
</script>

<style scoped>
.h6 {
    font-size: 25px;
}
.h5 {
    font-size: 30.5px;
}
.balance {
    background: left / cover no-repeat url('/public/static/img/balance.png');
    border: 1px solid #35634F;
    margin-bottom: 30px;
}

@media(max-width:992px) {
    .h5 {
        font-size: 20.5px;
    }
    .h6 {
        font-size: 20px;
    }
    .mb-fs-5 {
        font-size: 10px !important;
    }
    .balance {
        margin: 25px 37px;
    }
}
</style>