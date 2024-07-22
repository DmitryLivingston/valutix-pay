<template>
  <section class="benefits_section">
    <div class="container">
        <div class="row">
            <div class="benefits_info col-12 col-lg-5 order-2 order-lg-1 z-1">
                <div class="mb-3"><span class="border border-white rounded px-3 py-1 text-center">Безопасно и конфиденциально</span></div>
                <h2>Операции с наличными</h2>
                <ul class="d-flex flex-column gap-3 mb-4">
                    <li>Доставка средств или получение в офисе. Гарантируем полную конфиденциальность.</li>
                    <li>Выгодный курс, минимальные комиссии и любые объемы.</li>
                    <li>Работаем 24/7, поддержка всегда на связи.</li>
                    <li>Безупречный информационный сервис, удобный интерфейс.</li>
                </ul>
                <button class="myButton">Подробнее</button>
            </div>
            <div class="col-12 col-lg-7 order-1 order-lg-2">
                <div class="map position-relative">
                    <img src="/static/img/map.png" alt="карта с городами присутствия">
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

<style>
    .benefits_section {
        padding: 95px 0;
    }

    ul {
        padding: 0;
        padding-left: 15px;
    }

    .map img {
        width: 100%;
    }

    @media(max-width: 500px) {
        .benefits_section {
            padding: 50px 0;
        }

        .map {
            height: 350px;
            margin-right: -12px;
            margin-left: -12px;
            overflow: hidden;
        }

        .map img {
            position: absolute;
            top: 50px;
            right: -50px;
            transform: scale(1.4);
        }

        .benefits_info {
            max-width: 325px;
            margin: -75px auto auto;
        }
    }

    @media(max-width: 325px) {
        .benefits_info span {
            font-size: 14px;
        }
    }
</style>