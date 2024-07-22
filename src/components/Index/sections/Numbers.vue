<template>
    <section class="numbers_section">
        <div class="container">
            <div class="row mobile_margin">
                <div class="col-12 col-lg-5">
                    <div class="d-flex flex-column align-items-start">
                        <span class="number">10 434+</span>
                        <span class="bg_green rounded py-1 px-2 text-black">Сделок в день</span>
                    </div>
                </div>
            </div>
            <div class="row mb_custom mt_negative mobile_margin">
                <div class="col col-lg-5 d-none d-lg-block"></div>
                <div class="col-12 col-lg-7 ps-3 ps-lg-5">
                    <div class="d-flex flex-column align-items-start">
                        <span class="number">3 минуты</span>
                        <span class="bg_green rounded py-1 px-2 text-black">Среднее время обработки заявки</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col col-lg-4 d-none d-lg-block"></div>
                <div class="col-12 col-lg-4 mobile_margin">
                    <div class="d-flex flex-column align-items-start">
                        <span class="number">30</span>
                        <span class="bg_green rounded py-1 px-2 text-black">Сотрудников в компании</span>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="d-flex flex-column align-items-start align-items-lg-end">
                        <span class="number">50+</span>
                        <span class="bg_green rounded py-1 px-2 text-black">Направлений обмена</span>
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
    .numbers_section {
        padding: 35px 0;
    }
    .number {
        color: #4AA485;
        font-size: 100px;
        font-weight: 600;
    }
    .mb_custom {
        margin-bottom: 38px;
    }
    .mt_negative {
        margin-top: -60px;
    }

    @media (max-width: 992px) {
        .numbers_section {
            padding: 50px 26px;
        }
        .number {
            font-size: 61px;
        }
        .mb_custom {
            margin-bottom: unset;
        }
        .mt_negative {
            margin-top: unset;
        }

        .mobile_margin {
            margin-bottom: 20px;
        }
    }
</style>