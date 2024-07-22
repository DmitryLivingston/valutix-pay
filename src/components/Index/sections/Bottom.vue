<template>
    <section class="bottom_section">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-7 z-1">
                    <h2>Криптобанк Valutix <br> <span class="text-green">Обрети финансовую свободу</span></h2>
                    <div class="text mb_custom">
                        <p>Мы гарантируем полноценную анонимность, сохранность Ваших активов и данных. Наш сервис разработан на основе многолетнего опыта командой высококлассных специалистов. В штате компании трудятся 30 специалистов.</p>
                        
                        <p>Наш сервис предоставляет возможность купить, продать, положить и вывести криптовалюту. Вы также можете получить наличные в обмен на Вашу криптовалюту или наоборот - купить USDT за наличные по всему миру.</p>
                        
                        <p>В криптобанке Noros Вы можете приобрести анонимные pre-paid карты, привязать их к Apple или Google pay чтобы расплачиваться ими по всему миру или оплачивать любые покупки.</p>
                        
                        <p>Также, мы разработали уникальный сервис по работе с инвойсами для приема оплаты от контрагентов по всему миру, картами банков многих стран, с зачислением USDT на Ваш баланс.</p>
                        
                        <p>Вы можете быть уверены, что Ваши активы останутся с Вами. Круглосуточная поддержка поможет решить любой вопрос. Все балансы всегда обеспечены резервами нашего криптобанка. Регистрируйтесь и начинайте работу с криптовалютой.</p>
                    </div>
                    <button class="myButton">Регистрация</button>
                </div>
                <div class="col-12 col-lg-5 d-flex justify-content-end d-lg-block">
                    <picture>
                        <source srcset="/static/img/bottom-mobile-img.png" media="(max-width: 992px)">
                        <img src="/static/img/bottom-img.png" class="bottom_img mt_negative z-0">
                    </picture>
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
    .bottom_section {
        padding: 120px 0;
    }
    .mb_custom {
        margin-bottom: 30px;
    }
    /* .bottom_img {
        position: absolute;
        max-height: 762px;
        max-width: 745px;
    } */
    @media (max-width: 500px) {
        .mt_negative {
            margin-top: -50px;
        }

        .bottom_section {
            padding: 50px 26px;
        }

        /* .bottom_img {
            position: unset;
            max-height: unset;
            max-width: unset;
        } */
    }

</style>