<template>
    <section class="registration_section vh-none vh-md-100">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-5 mb-5 mb-md-0">

                    <div class="card border-0">
                        <div class="top">
                            <h2 class="list_title mb-1">Счет на оплату</h2>
                            <span>Номер счета №{{ urlParams.payment_id }}</span>
                        </div>
                        <div class="bottom">
                            <span class="d-block mb-1">Сумма к оплате</span>
                            <h2 class="mb-0">{{ urlParams.summ }} {{currencies?.find(c => c?.id == merchant?.currency_id)?.short_title}}</h2>
                        </div>
                    </div>
                    <span class="info text-center">Для оплаты счета выполните вход в систему</span>

                </div>

                <div class="col-12 col-md-5 mx-auto z-index-2 ">
                    <div class="d-flex" id="myTab" role="tablist">
                        <h2 class="active hover_green m-0" id="home-tab" data-bs-toggle="tab"
                            data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane"
                            aria-selected="true">Регистрация</h2>
                        <h2 class="hover_green m-0" id="profile-tab" data-bs-toggle="tab"
                            data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane"
                            aria-selected="false">Вход</h2>
                    </div>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
                            tabindex="0">
                            <Registration @login_user="login_user" :urlParams="urlParams"/>
                        </div>
                        <div class="tab-pane" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                            tabindex="0">
                            <Enter @login_user="login_user" :urlParams="urlParams"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Enter from '@/components/login/Enter.vue'
import Registration from '@/components/login/Registration.vue'
export default {
    props: ['urlParams', 'currencies', 'merchant'],
    name: "Login",
    components: {
        Enter,
        Registration,
    },
    // created() {
    //     sessionStorage.clear();
    // },
    methods: {
        login_user() {
            this.$emit('login_user');
        }
    }
}

</script>

<style scoped>
h1,
.h1 {
    font-size: 30.5px;
    font-weight: 600;
    margin-bottom: 17px;
    text-transform: unset;
}

a {
    font-size: inherit;
    color: #69E278;
}

h2,
.h2 {
    font-size: 25px;
    font-weight: 600;
}

.fs_16 {
    font-size: 16px;
}

.list_title {
    margin-bottom: 16px;
}

#myTab {
    gap: 48px;
    margin-bottom: 51px;
}

#myTab h2:not(.active) {
    opacity: 0.3;
}

.hover_green:hover {
    color: #69E278;
    opacity: 1 !important;
}

.registration_section {
    padding: 74px 0 84px;
    background: left 200px bottom 0 no-repeat url(/public/static/img/gradient.png);
    position: relative;
    height: 100%;
}

.registration_section::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 54%;
    background-color: #35634F;
    z-index: 0;
}

.registration_section .card {
    background-color: #35634F;
    padding: 20px;
    margin-bottom: 16px;
    color: #fff;
}

.registration_section .card .top {
    margin-bottom: 68px;
}

.z-index-2 {
    z-index: 2 !important
}

button:disabled {
    opacity: 0.3;
}

.form-check-input {
    width: 17px;
    height: 17px;
    padding: 2px;
    margin-top: 7px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: transparent;
    cursor: pointer;
}

.form-check-input:checked[type=checkbox] {
    background-image: url(/public/static/img/ellipse.svg);
    background-repeat: no-repeat;
    background-position: center;
}

.registration_section ul li {
    font-weight: 400;
    display: flex;
    align-items: center;
}

.registration_section .top ul li:before {
    content: url(/public/static/img/ellipse.svg);
    margin-right: 10px;
}

.registration_section .step_3 ul li {
    color: #74ED79;
}

.registration_section .top ul li:not(:last-child) {
    margin-bottom: 10px;
}

.registration_section .step_1 ul li:before {
    content: url(/public/static/img/ellipse.svg);
    margin-right: 10px;
    margin-bottom: 2px;
    display: block;
}

.form-check {
    margin-bottom: 44px;
}

.form-check-label {
    font-size: 13px;
}

.pincode {
    text-align: center;
    justify-content: space-between;
    display: flex;
    gap: 10px;
}

.pincode input[type="number"] {
    display: inline-block;
    border: none;
    border-radius: 5px;
    width: 68px;
    height: 68px;
    line-height: 50px;
    text-align: center;
    color: #212121;
    font-size: 30.5px;
    font-style: normal;
    font-weight: 400;
    padding: 16px 0px;
    outline: none;
    background-color: #fff;
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
    appearance: textfield;
}

.pincode input[type="number"]::-webkit-outer-spin-button,
.pincode input[type="number"]::-webkit-inner-spin-button {
    display: none;
}

.pincode input[type="number"]:focus {
    border: 2px solid #1dd216;
}

.next_2 {
    margin-bottom: 156px;
}

.fs_13 {
    font-size: 13px;
}

.form-text {
    font-size: 13px;
    position: absolute;
    left: 0;
    bottom: -20px;
}

.info {
    display: block;
    margin: 0 auto;
    color: #69E278;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

@media(max-width: 1024px) {
    .pincode input[type="number"] {
        width: 50px;
        height: 50px;
    }
}



@media(max-width: 768px) {
    .registration_section {
        padding: 50px 0;
    }

    .registration_section::after {
        display: none;
    }

    #myTab {
        gap: 15px;
        margin-bottom: 22px;
    }

    .registration_section .card .top {
        margin-bottom: 16px;
    }

}

@media(max-width: 425px) {
    h1 {
        margin-bottom: 57px;
        font-size: 25px;
    }

    h2 {
        font-size: 20px;
    }

    .registration_section {
        padding: 30px 0 50px;
        background: left bottom no-repeat url(/public/static/img/gradient.png);
        flex: 1;
    }

    .form-check {
        margin-bottom: 144px;
    }

    .step_3 ul li:not(:last-child) {
        margin-bottom: 4px;
    }

    .step_3 .ul_title {
        margin-bottom: 4px;
    }

    .pincode input[type="number"] {
        width: 35px;
        height: 50px;
    }

}
</style>