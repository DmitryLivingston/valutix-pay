            <template>
              <section class="pay_order pt-5">
                <div class="container">
                  <div class="main_header flex_between gap-10">
                    <h1>Тестовый платёж</h1>
                  </div>
                  <div class="order_form">
                    <div class="order_form__item gap-10">
                      <div class="order_form__header flex_between">
                        <span class="order_form_title">Cумма</span>
                      </div>
                      <div class="order_field_wrapper flex_start">
                        <div class="order_field flex_between">
                          <input type="number" name="summ" v-model="summ">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="i_payed_button flex_center">
                    <button class="button" @click="navigateToSumm">Перейти</button>
                  </div>
                </div>
              </section>
            </template>

            <script>
            export default {
              data() {
                return {
                 summ: 0,
                };
              },
              methods: {
                navigateToSumm() {
                  this.$router.push({ path: '/login', query: { summ: this.summ } });
                }
              }
            };
            </script>

            <style scoped>

            .btn_link {
              width: 100%;
            }
              .gradient {
                background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
              }

              .pay_order .modal {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.5);
              }

              .pay_order .modal_content {
                background-color: #fff;
                border-radius: 8px;
                padding: 24px;
              }

              .timer-svg {
                width: 85px;
                height: 40px;
                overflow: visible;
              }

              .timer-svg rect {
                fill: none;
                width: 85px;
                height: 40px;
                stroke-linejoin: round;
              }

              .css-4ow8hi {
                fill: none;
                stroke: rgb(96, 76, 199);
                stroke-width: 2;
              }

              .css-17eejxx {
                fill: rgb(96, 76, 199);
                font-size: 0.75rem;
                font-weight: 600;
                x: 50%;
                y: 60%;
                text-anchor: middle;
              }

              .order_form {
                margin-bottom: 30px;
              }

              .order_form__item {
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
              }

              .order_inform {
                margin-bottom: 30px;
              }

              .order_form_title {
                color: rgb(33, 32, 32);
                font-size: 0.875rem;
                font-weight: 600;
              }

              .order_field {
                width: 100%;
                margin-right: 4px;
                background-color: rgb(238, 238, 240);
                border-radius: 8px;
                height: 48px;
                color: rgb(33, 32, 32);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease-in-out 0s;
                padding: 0;
              }

              .copy,
              .qr {
                flex-direction: column;
                gap: 2px;
                padding: 0 5px;
                border: none;
                cursor: pointer;
                color: rgb(119, 127, 137);
                font-size: 0.625rem;
                font-weight: 600;
                background: transparent;
                transition: all 0.2s ease-in-out 0s;
              }

              .qr {
                background: rgb(238, 238, 240);
              }


              .order_field:hover,
              .qr:hover {
                background: rgb(227, 227, 227);
              }

              .copy_success {
                display: none;
              }

              .copy_success.visible {
                display: block;
              }

              .copy_success {
                color: rgb(119, 127, 137);
                font-size: 0.75rem;
              }

              .i_payed_button button {
                width: 100%;
              }

              .order_field input {
                appearance: none;
                padding: 10px;
                width: 100%;
                height: 100%;
                border-color: #f9f9f9;
                border-radius: 10px;
            }

              @media(max-width: 600px) {
                #order_address {
                  max-width: 100px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }

            </style>
