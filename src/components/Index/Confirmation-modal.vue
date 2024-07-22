<template>
    <!-- Modal -->
    <div class="modal fade" id="confModal" tabindex="-1" aria-labelledby="confModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header border-0 flex-wrap">
              <div class="d-flex flex-between w-100">
                  <h2 class="modal-title" id="confModalLabel">Подтверждение</h2>
                  <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <p class="m-0 mt-2 mt-lg-0">Для завершения операции обмена нажмите на кнопку перейти к оплате</p>
            </div>
            <div class="modal-body">
                <div class="payment_info border border-white rounded py-3 px-1">
                    <div class="row m-0 gap-2 gap-lg-0">
                        <div class="col-12 col-lg-6">
                            <div class="d-flex gap-2">
                                <img src="/static/img/icons/tinkoff.png" width="20" height="20">
                                <div class="d-flex flex-column fz-14 gap-1">
                                    <span>Тинькоф</span>
                                    <span class="fz-16">999 RUB</span>
                                    <span>Ивано Евгений Иванович</span>
                                    <span>4577765483899987</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="d-flex gap-2 position-relative">
                                <img class="arrow d-none d-lg-block" src="/static/img/icons/arrow.svg">
                                <img src="/static/img/icons/tinkoff.png" width="20" height="20">
                                <div class="d-flex flex-column fz-14 gap-1">
                                    <span>American</span>
                                    <span class="fz-16">999 USD</span>
                                    <span>ccdsncsdnj3jec3njcjdksksdjncdsjsdc</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0 justify-content-between gap-2">
                <button type="button" class="myButton text-nowrap">Перейти к оплате</button>
              <button type="button" class="myButton border_green bg-transparent" data-bs-dismiss="modal">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped>
    #confModal .modal-content {
        background-color: #35634F;
        padding: 20px 45px;
    }
    .payment_info {
        word-break: break-all;
    }
    .arrow {
        position: absolute;
        left: -35px;
        top: 10px;
    }
    @media(max-width: 992px) {
        .myButton {
            max-width: unset;
        }

        #confModal .modal-content {
            padding: 0;
        }
    }
</style>