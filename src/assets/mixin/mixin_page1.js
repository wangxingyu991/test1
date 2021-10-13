export  const myMixin = {
      data(){
            return{
                  frame_width: 0, 
                  nav_width :0,
            }
      },
      computed: {
            //vuex参数监听获取页面高度
            frameWidth() {
                  return this.$storage.state.frameProp.width
            },
            frameNavWidth() {
                  return this.$storage.state.frameSize.width
            }
      },
      //vuex参数监听
      watch: {
            frameWidth: {
                  immediate: true,
                  handler: function (newval) {
                        this.frame_width = newval;
                        console.log("frameProp.width =")
                        console.log(newval);
                  }
            },
            frameNavWidth: {
                  immediate: true,
                  handler: function (newval) {
                        this.nav_width = newval
                        console.log("frameSize.width =")
                        console.log(newval)
                  }
            }
      },
      mounted() {
            console.log("mixin_page1.js");
            //this.frameProps();
      },
      methods:{
            //element公共方法
            fn_frame(){
                  console.log("sadfasfsa");
            }
      }
}