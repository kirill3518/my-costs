export default {
    install(Vue) {
        if (this.installed) {
            return
        }

        this.installed = true
        this.caller = null

        Vue.prototype.$context = {

            EventBus: new Vue(),

            show(event, items) {
                const caller = event.target
                if (caller !== this.caller) {
                    this.caller = caller;
                    this.EventBus.$emit('show', items, caller);
                    console.log('show');
                } else {
                    this.close()
                    this.caller = null
                }
            },

            hide() {
                this.EventBus.$emit('hide');
                console.log('hide');
            }
        }

        Vue.prototype.$modal = {

            EventBus: new Vue(),

            show(item, settings) {
                this.EventBus.$emit('show', item, settings);
                console.log('show');
            },

            hide() {
                this.EventBus.$emit('hide');
                console.log('hide');
            }
        }
    }
}
