<template>
    <div class="modal fade" id="verifModal" tabindex="-1" aria-labelledby="verifModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg_green p-4" v-if="step == 1">
            <div class="modal-header border-0" data-bs-theme="dark">
              <h1 class="modal-title fs-3" id="verifModalLabel">Верификация</h1>
              <button type="button" class="btn-close text-light shadow-none" data-bs-dismiss="modal" aria-label="Close" @click="clear"></button>
            </div>
            <div class="modal-body">
                  <div class="mb-3">
                    <input placeholder="Введите e-mail" autocomplete="email" type="email" class="form-control shadow-none" id="ver_mail" v-model="mail" @focus="errorMail = false">
                    <div class="form-text text_warning" v-if="errorMail">{{errorMail}}</div>
                  </div>
                  <div class="mb-3">
                    <input placeholder="Введите номер" autocomplete="tel" type="tel" class="form-control shadow-none" id="ver_phone" v-model="phone" @focus="errorPhone = false">
                    <div class="form-text text_warning" v-if="errorPhone">{{errorPhone}}</div>
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control shadow-none" id="ver_fio" v-model="fio" placeholder="ФИО">
                    <div class="form-text text_warning" v-if="errorName" @focus="errorName = false">Введите ФИО</div>
                  </div>

                  <div class="mb-3">
                      <input @change="checkALlFields" id='js-file-2' style='cursor: pointer; display: none;'
                      @input='addPass1' class='image-file js-file custom-file__input' type='file' name='uploadFile'/>
                      <label class='custom-file__label w-100 light_link_300' for='js-file-2'>
                          <i class='custom-file__icon'></i>
                          <span class='custom-file__text light_link'>
                              <img src="/static/img/attachment.svg" width="16" height="16">
                              <span v-if="pass1">{{pass1.name}}</span>
                              <span v-else>Фото паспорта (лицевая сторона)</span>
                          </span>
                      </label>
                  </div>

                  <div class="mb-3">
                      <input  id='js-file-3' style='cursor: pointer; display: none;'
                      @input='addPass2' class='image-file js-file custom-file__input' type='file' name='uploadFile'/>
                      <label class='custom-file__label w-100 light_link_300' for='js-file-3'>
                          <i class='custom-file__icon'></i>
                          <span class='custom-file__text light_link'>
                              <img src="/static/img/attachment.svg" width="16" height="16">
                              <span v-if="pass2">{{pass2.name}}</span>
                              <span v-else>Фото паспорта(прописка)</span>
                          </span>
                      </label>
                  </div>

                  <div class="mb-3">
                      <input  id='js-file-4' style='cursor: pointer; display: none;'
                      @input='addSelfi' class='image-file js-file custom-file__input' type='file' name='uploadFile'/>
                      <label class='custom-file__label w-100 light_link_300' for='js-file-4'>
                          <i class='custom-file__icon'></i>
                          <span class='custom-file__text light_link'>
                              <img src="/static/img/attachment.svg" width="16" height="16">
                              <span v-if="selfi">{{selfi.name}}</span>
                              <span v-else>Селфи с паспортом (лицевая сторона)</span>
                          </span>
                      </label>
                  </div>

                  <div style="display: flex;">
                      <span style="font-size: 16px; color: #3EA075;">*</span>
                      <span style="color: #3EA075; margin-bottom:0;font-size: 12px; line-height: 19px; font-weight: 400; font-family: Montserrat;">При загрузке документов используйте файлы форматов: png, jpeg, pdf.
                      Максимальный размер файла - 5 мб.</span>
                  </div>
                  
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="button w-100 mw-100" @click="send">Отправить данные</button>
              <div class="form-text text_warning" v-if="errors">Заполните все поля</div>
            </div>
          </div>
          <div class="modal-content bg_green p-4" v-else>
            <div class="modal-body">
                <h3>Данные успешно отправлены. Срок верификации от 30 до 60 минут</h3>
                <button style='margin-top: 20px; margin-left: auto' class='button button--full-width' data-bs-dismiss="modal" aria-label="Close" @click="clear">Окей</button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    props: ['user'],
    data () {
        return {
            step: 1,
            selfi: '',
            pass1: '',
            pass2: '',
            errors: false,
            fio: this.user?.full_name,
            mail: this.user?.email,
            phone: this.user?.phone_number,
            maxSize: 5242880,
        }
    },
    watch: {
        'user.status': function(newValue, oldValue) {
            if (newValue === 4) {
                this.step = 1;
            }
        }
    },
    methods: {
 
        addSelfi(event){
            if((event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'application/pdf')
                && event.target.files[0].size < this.maxSize){
                    this.selfi = event.target.files[0];
            } else {
                alert('Неверный формат или размер файла превышает 5Мб');
                this.selfi = '';
            }
        },
        addPass1(event){
            if((event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'application/pdf')
                && event.target.files[0].size < this.maxSize){
                this.pass1 = event.target.files[0];
            } else {
                alert('Неверный формат или размер файла превышает 5Мб');
                this.pass1 = '';
            }
        },
        addPass2(event){
            if((event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'application/pdf')
                && event.target.files[0].size < this.maxSize){
                this.pass2 = event.target.files[0];
            } else {
                alert('Неверный формат или размер файла превышает 5Мб');
                this.pass2 = '';
            }
        },

        send() {
                let formData = new FormData();
                formData.append("mail", this.mail);
                formData.append("phone_number", this.phone);
                formData.append("full_name", this.fio);
                formData.append("main_passport_image", this.pass1);
                formData.append("registration_passport_image", this.pass2);
                formData.append("selfie_image", this.selfi);
                formData.append("user_id", this.$globalState.user_ID);
                formData.append("token", sessionStorage.getItem('user_token'));
                formData.append("_method", "PUT");
                axios.post(this.$api_address + '/casino_users/' + this.$globalState.user_ID + '/verify', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    if(response.data.data) {
                        this.step = 2;
                        this.$emit('verify');
                        this.errors = false;
                    }
                    else {
                        this.errors = true;
                    }

                }).catch((error) => {
                    this.errors = true;
                });
        },

        clear() {
            this.mail = '';
            this.phone = '';
            this.fio = '';
            this.pass1 = '';
            this.pass2 = '';
            this.pass3 = '';
        },

    }
}
</script>

<style>
.custom-file__text {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #69E278;
}
.custom-file__text span {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>