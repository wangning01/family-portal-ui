import Dialog from "./components/CreateNewPlaylist.vue"
import i18n from '@/plugins/i18n/i18n.js'
import router from '@/router'


export default {
    install(Vue, options){
        Vue.prototype.$createNewPlaylist = show

        function show(){
            return new Promise((resolve) => {
                let ComponentClass = Vue.extend(Dialog)
                let instance = new ComponentClass({
                    i18n,
                    router,
                    destroyed: function(){
                        document.body.removeChild(this.$el)
                        resolve({result: this.newPlayList})
                    }
                })
                instance.$mount()
                document.body.appendChild(instance.$el)
            })
            
        }
    }
}