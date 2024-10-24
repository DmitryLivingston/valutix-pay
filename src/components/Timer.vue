<template>
    <img src="/static/img/access_time2.svg">
    <span class="small">{{ minutes }} мин</span>
</template>

<script>
import moment from 'moment';

export default {
    data: () => ({
        minutes: 60,
        interval: null,
        created_at: localStorage.getItem('minutes_invoice')
    }),
    methods: {
        counter() {
            this.interval = setInterval(() => {
                if (this.minutes > 0) {
                    this.minutes--;
                    localStorage.setItem('remainingMinutes', this.minutes);
                } else {
                    this.clearTimer();
                    this.emitter.emit('finish_timer');
                }
            }, 60 * 1000);
        },
        loadTimer() {
            const savedTime = localStorage.getItem('remainingMinutes');
            if (savedTime !== null) {
                this.minutes = parseInt(savedTime, 10);
            }
        },
        clearTimer() {
            clearInterval(this.interval);
            localStorage.removeItem('remainingMinutes');
        },
        calculateRemainingMinutes(created_at) {
            const currentTime = moment.utc(); // Текущее время в UTC
            console.log('currentTime', currentTime);
            let dateFrom = moment(created_at).toDate();
            const createdAtTime = moment.utc(dateFrom).local(); // Время из created_at в UTC
            console.log('dateFrom', dateFrom);
            console.log('createdAtTime', createdAtTime);

            // Вычисляем разницу в минутах
            const differenceInMinutes = createdAtTime.diff(currentTime, 'minutes');
            console.log('differenceInMinutes', differenceInMinutes);

            // Устанавливаем оставшееся время в минутах
            this.minutes = 60 + differenceInMinutes;

            // Запускаем таймер, если оставшееся время положительное
            if (this.minutes > 0) {
                this.counter();
            }
        }
    },
    created() {
        this.loadTimer();
        this.calculateRemainingMinutes(this.created_at);
    },
    watch: {
        minutes(newValue, oldValue) {
            if (newValue === 0) {
                this.clearTimer();
                this.emitter.emit('finish_timer');
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>



<style scoped>
    .small {
        width: 60px;
        text-align: center;
    }
</style>
