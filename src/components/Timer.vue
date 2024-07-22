<template>
    <img src="/static/img/access_time2.svg">
    <span class="small">{{ minutes }} мин</span>
</template>

<script>
export default {
    data: () => ({
        minutes: 60,
        interval: null
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
        }
    },
    created() {
        this.loadTimer();
        this.counter();
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
