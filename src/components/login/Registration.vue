<template>

                            <!-- Шаг 1 -->
                            <div class="step_1" v-if="step == 1">
                                <div class="mb-4 position-relative">
                                    <div class="position-relative">
                                        <input placeholder="Введите email" autocomplete="email" type="email" class="form-control shadow-none" @input="checkMail"
                                             v-model="email" @focus="error = ''">
                                    </div>
                                    <div class="form-text text_warning ps-2 m-0" v-if="error !== '' && !codeSendedMail">{{ error }}</div>
                                    <div class="form-text text-green ps-2 m-0" v-if="codeSendedMail === true">На ваш email отправлен код</div>
                                </div>
                                <div class="mb-4 position-relative">
                                    <div class="input-group">
                                        <input placeholder="Введите код с email" autocomplete="off" type="number" class="form-control border-0 shadow-none" v-model="mail_code" aria-describedby="basic-addon2">
                                            <span class="input-group-text bg-white border-0 shadow-none green_link" id="basic-addon2" @click="checkMail">Отправить еще</span>
                                    </div>
                                    <div class="form-text text-green ps-2 m-0" v-if="isSuccessMailCode == true">Проверка пройдена</div>
                                    <div class="form-text text_warning ps-2 m-0" v-if="errorMailCode">Неверный код</div>
                                </div>

                                <div class="mb-4 position-relative">
                                    <input placeholder="Введите номер телефона" autocomplete="off" type="tel" class="form-control shadow-none"
                                         v-model="phone" @focus="error = ''" @input="checkPhone">
                                    <!-- <div class="form-text text_warning" v-if="errorPhone">Не удалось отправить код</div> -->
                                    <div class="form-text text-green ps-2 m-0" v-if="codeSendedPhone">На ваш телефон поступит звонок</div>
                                    <div class="form-text text_warning ps-2 m-0"  v-if="errorPhone">Поле телефона обязательно для заполнения</div>
                                </div>
                                <div class="mb-4 position-relative">
                                    <div class="input-group">
                                    <input placeholder="Введите цифры" autocomplete="off" type="number" class="form-control shadow-none border-0"
                                         v-model="phone_code" @focus="error = ''">
                                         <span class="input-group-text bg-white border-0 shadow-none green_link" id="basic-addon2" @click="checkPhone">Отправить еще</span>
                                    </div>
                                    <div class="form-text text_warning ps-2 m-0" v-if="errorPhoneCode">Неверный код</div>
                                    <div class="form-text text-green ps-2 m-0" v-if="!isSuccessPhoneCode && !errorPhoneCode">Введите последние 4 цифры номера входящего звонка</div>
                                    <div class="form-text text-green ps-2 m-0" v-if="isSuccessPhoneCode">Проверка пройдена</div>
                                </div>
                                <div class="mb-6 step_1--next_btn">
                                    <button :disabled="!isSuccessMailCode || !isSuccessPhoneCode" class="button w-100 mw-100" @click="step = 2">Далее</button>
                                </div>
                                <span class="d-block text-center">Уже есть аккаунт? <a href="#" @click="goToEnter">Войти</a></span>
                            </div>

                            <!-- Шаг 2 -->
                            <div class="step_2" v-if="step == 2">
                                <h5 class="mb-4">Создайте пароль</h5>
                                <div class="mb-4 position-relative">
                                    <div class="input-group">
                                        <input type="password" autocomplete="new-password" v-model="password"
                                            class="form-control border-0 shadow-none">
                                        <span class="input-group-text bg-white">
                                            <img src="/static/img/remove_red_eye.svg" class="cursor-pointer"
                                                @click="showPassword($event.target)">
                                        </span>
                                    </div>
                                    <div class="form-text text_warning" v-if="error !== ''">{{ error }}</div>
                                </div>
                                <div class="mb-4">
                                    <span class="fs_16 ul_title mb-1 d-block">Ваш пароль должен содержать:</span>
                                    <ul class="myList">
                                        <li :class="{ 'text_warning': !isLengthValid }">Длина от 8 до 32 символов</li>
                                        <li :class="{ 'text_warning': !hasLowercaseLetter }">Хотя бы одну строчную букву
                                        </li>
                                        <li :class="{ 'text_warning': !hasUppercaseLetter }">Хотя бы одну прописную букву
                                        </li>
                                        <li :class="{ 'text_warning': !hasDigit }">Хотя бы одну цифру</li>
                                    </ul>
                                </div>
                                <div class="mb-4 position-relative" v-if="isPasswordValid">
                                    <label for="basic-url" class="form-label">Повторите пароль</label>
                                    <div class="input-group">
                                        <input type="password" class="form-control border-0 shadow-none"
                                            v-model="password_repeat">
                                        <span class="input-group-text bg-white">
                                            <img src="/static/img/remove_red_eye.svg" class="cursor-pointer"
                                                @click="showPassword($event.target)">
                                        </span>
                                    </div>
                                    <span class="form-text text_warning fs_13"
                                        v-if="isPasswordValid && (password !== password_repeat)">Пароли не совпадают</span>
                                </div>
                                <button class="next_btn button w-100 mw-100" :disabled="!isShowNext"
                                    @click="register">Регистрация</button>
                            </div>
                       
</template>

<script>
export default {
    props: ['urlParams'],
    emits: ['go_enter'],
    name: "Registration",
    data() {
        return {
            email: '',
            phone: '',
            mail_code: '',
            phone_code: '',
            password: '',
            password_repeat: '',
            step: 1,
            isSuccessMailCode: false,
            isSuccessPhoneCode: false,
            error: '',
            errorPincode: false,
            codeSendedMail: false,
            codeSendedPhone: false,
            errorMailCode: false,
            errorPhone: false,
            errorPhoneCode: false,
            session_id_mail: '',
            session_id_phone: '',
            i: 0,
        };
    },
    computed: {
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
            return this.isLengthValid && this.hasLowercaseLetter && this.hasUppercaseLetter && this.hasDigit ? true : false;
        },
        isShowNext() {
            return this.isPasswordValid && (this.password === this.password_repeat) ? true : false;
        },
    },
    methods: {
        showPassword(eventTarget) {
            let myInput = $(eventTarget).closest('.input-group').find('.form-control');
            myInput.attr('type', function (index, currentType) {
                return currentType === 'password' ? 'text' : 'password';
            });
        },

        goToEnter() {
            this.$emit('go_enter'); // Вызываем событие go_enter
        },

        goToStep2() {
            if(this.codeSendedPhone == true && this.codeSendedMail == true) {
                this.step = 2;
            }
        },

        //Проверка почты
        checkMail() {
            this.i++;
            let data = { email: this.email }
            axios.post(this.$api_address + '/casino_users/register_email', data, {
                validateStatus: function (status) {
                    return status < 500;
                }
            }).then(response => {
                this.codeSendedMail = true;
                if (response.data.errors) {
                    this.error = response.data.errors.email[0];
                    this.codeSendedMail = false;
                    return;
                }
                else {
                    if (response.data.data) {
                        this.error = '';
                        this.session_id_mail= response.data.data.session_id;
                    } else {
                        console.log('Ошибочка мыла');
                        this.codeSendedMail = false;
                    }
                }

            }).catch(function (error) {
                console.log(error.response);
            });
        },

        //Проверка телефона
        checkPhone() {
            if(this.phone.length > 10) {
            let data = { phone: this.phone }
            axios.post(this.$api_address + '/casino_users/register_phone', data, {
                validateStatus: function (status) {
                    return status < 500;
                }
            }).then(response => {
                this.codeSendedPhone = true;
                if (response.data.errors) {
                    this.codeSendedPhone = false;
                    return;
                }
                else {
                    if (response.data.data) {
                        console.log('response.data.data.session_id', response.data.data.session_id);
                        this.session_id_phone = response.data.data.session_id;
                        this.errorPhone = false;
                    } else {
                        console.log('Ошибочка телефона');
                        this.codeSendedPhone = false;
                    }
                }
            }).catch(function (error) {
                console.log(error.response);
            });
        }
        },

        //Проверка кода Email
        checkCodeMail() {
            let data = {
                code: this.mail_code,
                session_id: this.session_id_mail
            }
            axios.post(this.$api_address + '/casino_users/check_code', data, {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            }).then(response => {
                if (response.data.message) {
                    this.errorMailCode = true;
                    this.isSuccessMailCode = false;
                } else {
                    this.errorMailCode = false;
                    this.isSuccessMailCode = true,
                    sessionStorage.setItem('session_id_mail', this.session_id_mail);
                }
            }).catch(function (error) {
                this.errorMailCode = true;
                this.isSuccessMailCode = false;
            });
        },

        //Проверка кода телефона
        checkCodePhone() {
            let data = {
                code: this.phone_code,
                session_id: this.session_id_phone
            }
            axios.post(this.$api_address + '/casino_users/check_code', data, {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            }).then(response => {
                if (response.data.message) {
                    this.errorPhoneCode = true;
                    this.isSuccessPhoneCode = false;
                } else {
                    this.errorPhoneCode = false;
                    this.isSuccessPhoneCode = true;
                    sessionStorage.setItem('session_id_phone', this.session_id_phone);
                }
            }).catch(function (error) {
                this.errorPhoneCode = true;
                this.isSuccessPhoneCode = false;
            });
        },

        //Регистрация
        register() {
            let data = {
                nickname: this.email,
                email: this.email,
                phone_number: this.phone,
                password: this.password,
                password_repeat: this.password_repeat,
                merchant_token: this.urlParams.merchant_token
            }
            axios.post(this.$api_address + '/casino_users', data, {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            })
                .then(response => {
                    if (response.data.data) {
                        sessionStorage.setItem('user_ID', response.data.data.id);
                        sessionStorage.setItem('user_token', response.data.data.token['token']);
                        sessionStorage.setItem('status_id', response.data.data.status['id']);
                        this.$emit('login_user');
                    } else {
                        if (response.data.errors.password) {
                            this.error = true;
                        }
                        if (response.data.errors.password_repeat) {
                            this.error = true;
                        }

                    }
                })
                .catch(function (error) {
                    this.error = true;
                });
        },
    },

    watch: {
        phone_code: {
            handler(val) {
                if(String(val).length === 4) {
                    this.checkCodePhone();
                }
            }
        },
        mail_code: {
            handler(val) {
                if(String(val).length === 6) {
                    this.checkCodeMail();
                }
                else {
                    console.log(String(val).length);
                }
            }
        }
    }

    
}

</script>

<style scoped>
a {
    font-size: inherit;
    color: #69E278;
}

.fs_16 {
    font-size: 16px;
}

.mb-6 {
    margin-bottom: 67px;
}

.list_title {
    margin-bottom: 16px;
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

.registration_section .step_2 ul li {
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

.green_link {
    color:#4AA485;
    font-family: Montserrat;
    font-size: 16px;
    cursor: pointer;
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

.next_btn {
    margin-top: 150px;
}

.step_1--next_btn {
    margin-top: 110px;
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

.myList {
    padding: 0;
}

.myList li {
    margin-bottom: 4px;
}


@media(max-width: 1024px) {
    .pincode input[type="number"] {
        width: 50px;
        height: 50px;
    }
}

@media(max-width: 425px) {

    .form-check {
        margin-bottom: 144px;
    }

    .step_2 ul li:not(:last-child) {
        margin-bottom: 4px;
    }

    .step_2 .ul_title {
        margin-bottom: 4px;
    }

    .pincode input[type="number"] {
        width: 35px;
        height: 50px;
    }

    .input-group-text {
        font-size: 12px;
    }

}
</style>