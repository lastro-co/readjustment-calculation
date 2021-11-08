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
    var rentFinal = parseFloat(baseValue);
    //requisição
    var readjusmentData = await getIndex(url);
    //adequa entrada em hifen para modelo com / que vem na requisição
    const initialDate = fixHyphenDate(baseDate)
    //seta o começo dos dados como a baseDate
    const indicePrimeiro = readjusmentData.map(function (e) { return e.data; }).indexOf(initialDate);
    calcDataStart.push(readjusmentData.slice(indicePrimeiro));
    //se mes da basedate >= ultimo indice+1 -> pega 2020 por ultimo e avisa dados indisp 
    if (initialDate.split('/')[1] > calcDataStart[0][(calcDataStart[0].length - 1)].data.split('/')[1]) {
        const dateReajust = `${initialDate.slice(0, 6)}${year - 1}`;

        const indiceUlitmo = calcDataStart[0].map(function (e) { return e.data; }).indexOf(dateReajust);
        calcDataFinal.push(calcDataStart[0].slice(0, indiceUlitmo));


        // se mesbase menor q mes ultimo indice, pega ate 2021
    } else {
        const dateReajust = `${initialDate.slice(0, 6)}${year}`;

        const indiceUlitmo = calcDataStart[0].map(function (e) { return e.data; }).indexOf(dateReajust);
        calcDataFinal.push(calcDataStart[0].slice(0, indiceUlitmo));
    }
    //multiplica o acumulador por 1+ porcentagem e salva memória de calculo anual
    for (item in calcDataFinal[0]) {
        var percentage = calcDataFinal[0][item].valor / 100
        var rentFinal = rentFinal + (rentFinal * percentage)
        //salva a memoria de calculo anual
        if (item % 12 == 11) {
            calcMemory.push(` valor atualizado: ${rentFinal.toFixed(2)} reajuste em: ${calcDataFinal[0][item].data.slice(6)}-${initialDate.slice(3, 5)}`)
        }
    }
    // lida com datas inferiores a um ano ou de antes do primeiro indice
    if (!calcDataFinal[0][0]) {
        calcMemory.push(`Faltam informações de índice para fazer esse cálculo.`)
    }
    // nos casos da condicional que pega ate year-1, adiciona comentario da memória de calc de year
    if (calcMemory[calcMemory.length - 1].slice(39, 43) == `${year - 1}`) {
        calcMemory.push(`Faltam informações de índice para fazer o cálculo em ${year}-${month + 1}. `)
    }
    return { value: rentFinal.toFixed(2), memory: calcMemory };
}

// cénario de uso
/**
(async (calculation) => {
    // IIFE
    try {
        const resultIGPM = await calculation({
            index: 'IGPM',
            baseDate: '2019-11-01',
            baseValue: '300.33',
        })
        console.log(resultIGPM) // { value: 330.30, memory: []

        const resultIPCA = await calculation({
            index: 'IPCA',
            baseDate: '2019-12-01',
            baseValue: 300.33,
        })
        console.log(resultIPCA) // { value: 330.30, memory: [] }

    } catch (error) {
        console.error(error) // new Error();
    }
})(Calculation)

*/
exports.Calculation = Calculation;