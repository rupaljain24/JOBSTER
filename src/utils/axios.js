//customInstance


import axios from 'axios'

const rootUrl=axios.create({
    baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit'
})

export default rootUrl;