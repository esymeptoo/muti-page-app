import tpl from './test.ejs'
import demoTpl from './demo.ejs'
import './test.less'
// import $ from 'jQuery'
import axios from 'axios'

// function Test() {
//     return {
//         name: 'haha',
//         tpl: tpl
//     }
// }
export default class Test {
    constructor() {
        this.createDom().bindEvent()
    }
    createDom() {
        //dom初始化
        this.data = {
            name: 'esymeptoo',
            list: [
                {
                    name: 'esy'
                },
                {
                    name: 'meptoo'
                }
            ]
        }
        this.dom = $(tpl(this.data))
        // this.dom.append(this.demoDom)
        return this
    }
    //事件绑定
    bindEvent() {
        var self = this;
        this.dom.find('button').on('click', function() {
            //省去字符串拼接的过程
            this.demoDom = $(demoTpl({
                name: 'demo'
            }))
            this.dom.append(this.demoDom)
            // location.href = './bar.html'
            // axios.get('/users/all')
            // .then( res => {
            //     console.log(res.data)
            //     //mock --> 新增dom节点
            //     // let tmp = $()
                
            // })
            // .catch( e => {
            //     console.log(e)
            // })
        }.bind(this))
        return this
    }
    init() {
        // $('body').empty()
        // this.dom.find('*').off()
        this.dom.appendTo('body')
        return this
    }
}
