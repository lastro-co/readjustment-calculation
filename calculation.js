/** 
interface Initialvalues {
    index: string;
    baseDate: Date;
    baseValue: number;
}
*/
//TODO: passar pra typescript
// package.json: npm init



var currentTime = new Date();
var year = currentTime.getFullYear();
var month = currentTime.getMonth();
const axios = require('axios');
const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
axios.defaults.headers.common = { 'Authorization': `bearer ${token}` };
