<template>
  <section class="proposal_section">
    <div class="container">
        <div class="proposal_section--content p_20 bg_img rounded">
            <div class="row">
                <div class="col-12 col-lg-4">
                    <div class="flex flex-column">
                        <h2>Работайте с инвойсами <br> <span class="text-green">Принимайте оплату по всему миру</span></h2>
                        <div class="mb-6"><span class="border border-white rounded px-3 py-1">Комиссия сервиса всего - 0.5%</span></div>
                        <button class="myButton d-none d-lg-flex">Попробовать</button>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div class="text">
                            <p>Нужно получить оплату от клиента или партнера?</p>
                            <p>Выставляйте счет (инвойс) своему контрагенту, он сможет оплатить любым из доступных методов - фиатом разных стран, любой криптовалютой.</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="proposal_img">
                        <img src="/static/img/planshet.png" alt="планшет" height="340">
                    </div>
                    <button class="myButton d-flex d-lg-none mx-auto">Попробовать</button>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
    .proposal_section {
        padding: 120px 0;
    }

    .mb-6 {
        margin-bottom: 65px;
    }

    .proposal_img {
        margin-top: -20%;
        display: flex;
    }
    .text {
        max-width: 314px;
    }
    .bg_img {
        background: center/cover no-repeat url(/public/static/img/Shape.png);
    }

    @media (max-width: 992px) {
        h2 {
            max-width: 240px;
        }
        .proposal_section {
            padding: 50px 0;
        }

        .mb-6 {
            margin-bottom: 35px;
        }

        .proposal_img {
            margin-top: 0;
            margin-bottom: 12px;
            justify-content: end;
        }
        .text {
            max-width: unset;
        }

        /* .bg_img {
            background: #35634F;
        } */
    }

    @media (max-width: 375px) {
        .proposal_section--content span {
            font-size: 14px;
        }
    }

</style>