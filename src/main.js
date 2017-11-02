import Test from './test/test'
import axios from 'axios'

const App = function () {
    let test = new Test()
    //get TestData
    // axios.get('/ws/district/v1/getchildren?key=WJJBZ-W64HU-472VU-2XGIA-U2LNZ-ENBI7')
    // .then(res => {
    //     console.log(res)
        
    // })
    // .catch( e => {

    // })
    test.init()
}

new App()