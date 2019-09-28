import Dialog from "./components/EditVideoDialog.vue"
import i18n from '@/plugins/i18n/i18n.js'
import router from '@/router'


export default {
    install(Vue, options){
        Vue.prototype.$editVideoDialog = show

        function show(props){
            return new Promise((resolve) => {
                let ComponentClass = Vue.extend(Dialog)
                let instance = new ComponentClass({
                    i18n,
                    router,
                    propsData: props,
                    destroyed: function(){
                        document.body.removeChild(this.$el)
                        resolve({data: this.updatedVideo})
                    }
                })
                instance.$mount()
                document.body.appendChild(instance.$el)
            })
            
        }
    }
}