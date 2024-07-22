<template>

                <!-- Шаг 1 -->
                <div class="step_1">
                    <h1 v-if="fromRecovery" class="mb-4 d-none d-sm-block">Пароль успешно изменен <br> Войдите</h1>
                    <h1 v-if="fromRecovery" class="mb-4 d-block d-sm-none">Пароль успешно изменен, войдите</h1>
                    <div class="mb-4 position-relative">
                        <div class="d-flex gap-3 mb-2 enterTabs" role="tablist">
                            <label for="enter_mail" class="form-label hover_green active" data-bs-toggle="tab" data-bs-target="#mail-tab-pane" type="button"
                            role="tab" aria-controls="mail-tab-pane" aria-selected="true">Электронная почта</label>
                            <label for="enter_phone" class="form-label hover_green" data-bs-toggle="tab" data-bs-target="#phone-tab-pane" type="button"
                            role="tab" aria-controls="phone-tab-pane" aria-selected="true">Телефон</label>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane show active" id="mail-tab-pane" role="tabpanel" aria-labelledby="mail-tab" tabindex="0">
                                <input placeholder="Введите e-mail" autocomplete="email" type="email" class="form-control shadow-none" id="enter_mail" v-model="email" @focus="errorMail = false">
                                <div class="form-text text_warning" v-if="errorMail">Такого email не существует</div>
                                <div class="form-text text_warning" v-if="errorGeneral">{{ errorGeneral }}</div>
                            </div>
                            <div class="tab-pane" id="phone-tab-pane" role="tabpanel" aria-labelledby="phone-tab" tabindex="0">
                                <input placeholder="Введите номер" autocomplete="tel" type="tel" class="form-control shadow-none" id="enter_phone" v-model="phone" @focus="errorPhone = false">
                                <div class="form-text text_warning" v-if="errorPhone">Такого телефона не существует</div>
                                <div class="form-text text_warning" v-if="errorGeneral">{{ errorGeneral }}</div>
                            </div>
                        </div>

                    </div>
                    <div class="mb-4 position-relative">
                        <label for="password" class="form-label">Пароль</label>
                        <div class="input-group">
                            <input name="password" type="password" autocomplete="on" v-model="password" class="form-control border-0 shadow-none" @focus="errorPassword = false">
                            <span class="input-group-text bg-white">
                                <img src="/static/img/remove_red_eye.svg" class="cursor-pointer" @click="showPassword($event.target)">
                            </span>
                          </div>
                        <div class="form-text text_warning" v-if="errorPassword">Неверный пароль</div>
                    </div>
                    <div class="enter-btn">
                        <button class="button w-100 mw-100" :disabled="password === '' || (email === '' && phone === '')" @click="enter">Войти</button>
                    </div>

                    <div class="mb-3">
                        <!-- <span class="d-block text-center"><a href="#">Забыли пароль?</a></span> -->
                    </div>                  
                    <span class="d-block text-center">Нет аккаунта? <a href="#">Создать аккаунт</a></span>
                </div>
</template>

<script>
    export default {
        props: ['fromRecovery', 'urlParams'],
        name: "Enter",
        data() {
            return {
                email: '',
                phone: '',
                password: '',
                errorMail: false,
                errorPhone: false,
                errorPassword: false,
                errorGeneral: '',
            };
        },
        computed: {
        // Вычисляемое свойство для объединения значений из всех инпутов
            isLengthValid() {
                return this.password.length >= 8 && this.password.length <= 32;
            },
            hasLowercaseLetter() {
                return /[a-z]/.test(this.password);
            },
            hasUppercaseLetter() {
                return /[A-Z]/.test(this.password);
            },
            hasDigit() {
                return /\d/.test(this.password);
            },
            isPasswordValid() {
                return this.isLengthValid && this.hasLowercaseLetter && this.hasUppercaseLetter && this.hasDigit;
            }
        },
        methods: {
            showPassword(eventTarget) {
                let myInput = $(eventTarget).closest('.input-group').find('.form-control');
                myInput.attr('type', function(index, currentType) {
                    return currentType === 'password' ? 'text' : 'password';
                });
            },
            enter() {
                let data = {
                    password: this.password,
                    merchant_token: this.urlParams.merchant_token
                }
                if(this.email && this.password && this.phone) {
                    data.email = this.email;
                }
                else if(this.email && this.password) {
                    data.email = this.email;
                }
                else if (this.phone && this.password) {
                    data.phone_number = this.phone;
                }
                else {
                    return;
                }
                axios.post(this.$api_address+'/casino_users/auth', data, {
                    validateStatus: function (status) {
                        return status < 500; // Resolve only if the status code is less than 500
                    }
                })
                    .then(response => {
                        if(response.data.data) {
                            if(response.data.data.status.id == 5) {
                                this.errorGeneral = 'Ваш аккаунт был заблокирован. Обратитесь в поддержку';
                                return;
                            }
                            //Отправляем событие родителю и закрываем модалку
                            sessionStorage.setItem('user_ID', response.data.data.id);
                            sessionStorage.setItem('user_token', response.data.data.token);
                            sessionStorage.setItem('status_id', response.data.data.status.id);

                            this.$emit('login_user');
                        } else {
                            if(response.data.message === 'Неверный пароль') {
                                this.errorPassword = true;
                            }
                            if(response.data.errors.password){
                                this.errorPassword = true;
                            }
                            if(response.data.errors.email){
                                    this.errorMail = true;
                            }

                        }
                    })
                    .catch(function (error){
                        console.log(error.response);
                    });
            },
        },
    }

</script>

<style scoped>

    h1, .h1 {
        font-size: 30.5px;
        font-weight: 600;
        margin-bottom: 17px;
        text-transform:unset;
    }

    a {
        font-size: inherit;
        color: #69E278;
        text-underline-offset: 5px;
    }

    h2, .h2 {
        font-size: 25px;
        font-weight: 600;
    }

    .fs_16 {
        font-size: 16px;
    }

    .list_title {
        margin-bottom: 16px;
    }

    .enter_section {
        padding: 74px 0 84px;
        background: left 200px bottom 0 no-repeat url(/public/static/img/gradient.png);
        position: relative;
    }

    .enter_section::after {
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

    .enter_section .top {
        margin-bottom: 125px;
    }

    button:disabled {
        opacity: 0.3;
    }

    .enter-btn {
        margin-bottom: 78px;
    }

    .text_warning {
        color: #FF6D6D;
        font-size: 13px;
        position: absolute;
        bottom: -20px;
        left: 0;
    }

    .hover_green:hover {
        color: #69E278;
        opacity: 1 !important;
    }

    .enterTabs label:not(.active) {
        opacity: 0.3;
    }


    @media(max-width: 768px) {
        .enter_section {
            padding: 50px 0;
        }
        .enter_section::after {
            display: none;
        }
    }

    @media(max-width: 425px) {
        h1 {
            margin-bottom: 57px;
            font-size: 25px;
        }
        .enter_section {
            padding: 30px 26px 50px;
            background: left -200px bottom -150px no-repeat url(/public/static/img/gradient.png);
        }

        .enter-btn {
            margin-bottom: 200px;
        }
    }

</style>