import Dialog from "./components/ActionOnVideoDialog.vue"
import i18n from '@/plugins/i18n/i18n.js'
import router from '@/router'
import store from '@/plugins/store/store.js'

export default {
    install(Vue, options){
        Vue.prototype.$actionOnVideoDialog = show

        function show(props){
            return new Promise((resolve) => {
                let ComponentClass = Vue.extend(Dialog)
                let instance = new ComponentClass({
                    i18n,
                    store,
                    router,
                    propsData: props,
                    destroyed: function(){
                        document.body.removeChild(this.$el)
                        resolve({action: this.action})
                    }
                })
                instance.$mount()
                document.body.appendChild(instance.$el)
            })
            
        }
    }
}