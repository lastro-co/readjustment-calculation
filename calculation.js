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
async function getIndex(url) {
    const { data } = await axios.get(url);
    // TODO: Guardar indices em um arquivo json dentro do projeto (atualizar mensalmente)
    return data;
}
function fixHyphenDate(time) {
    if (time.includes('-')) {
        const newDate = `${time.split('-')[2]}/${time.split('-')[1]}/${time.split('-')[0]}`
        return newDate
    }
}
function returnHyphenDate(time) {
    if (time.includes('/')) {
        const newDate = `${time.split('/')[2]}-${time.split('/')[1]}-${time.split('/')[0]}`
        return newDate
    }
}
async function Calculation({ index, baseDate, baseValue }) {
    //decide o índice pelo código da url requisitada
    const pageIndex = (index == "IPCA") ? 433 : 189;
    var url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${pageIndex}/dados?formato=json`;
    //aux
    var calcDataStart = [];
    var calcDataFinal = [];
    var calcMemory = [];
}