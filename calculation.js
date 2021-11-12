/**
interface Initialvalues {
    index: string;
    baseDate: Date;
    baseValue: number;
}
*/
//TODO: passar pra typescript
// package.json: npm init



let currentTime = new Date();
let year = currentTime.getFullYear();
const axios = require('axios');
async function getIndex(url) {
    const { data } = await axios.get(url, { 'headers': { 'Content-Type': 'application/json' } });
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
    let url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${pageIndex}/dados?formato=json`;
    //aux

    let calcDataStart = [];
    let calcDataFinal = [];
    let calcMemory = [];
    let dateReajustment = [];
    let acc = 1
    initialDateTrada = baseValue.split(' ')[1].replaceAll('.', '')
    console.log(initialDateTrada)
    let rentFinal = parseFloat(initialDateTrada.replace(',', '.'));
    console.log(rentFinal)
    //requisição
    let readjusmentData = await getIndex(url);

    //adequa entrada em hifen para modelo com / que vem na requisição
    const initialDate = `01${fixHyphenDate(baseDate).slice(2)}`
    //seta o começo dos dados como a baseDate
    const indicePrimeiro = readjusmentData.map(function (e) { return e.data; }).indexOf(initialDate);
    calcDataStart.push(readjusmentData.slice(indicePrimeiro));



    //se mes da basedate >= ultimo indice+1 -> pega 2020 por ultimo e avisa dados indisp
    if (initialDate.split('/')[1] > calcDataStart[0][(calcDataStart[0].length - 1)].data.split('/')[1]) {
        const dateReajust = `01${initialDate.slice(2, 6)}${year - 1}`;
        const indiceUlitmo = calcDataStart[0].map(function (e) { return e.data; }).indexOf(dateReajust);
        calcDataFinal.push(calcDataStart[0].slice(0, indiceUlitmo));
        dateReajustment.push(returnHyphenDate(dateReajust))
        // se mesbase menor q mes ultimo indice, pega ate 2021
    } else {
        const dateReajust = `01${initialDate.slice(2, 6)}${year}`;
        const indiceUlitmo = calcDataStart[0].map(function (e) { return e.data; }).indexOf(dateReajust);
        calcDataFinal.push(calcDataStart[0].slice(0, indiceUlitmo));
        dateReajustment.push(returnHyphenDate(dateReajust))

    }
    //multiplica o acumulador por 1+ porcentagem e salva memória de calculo anual
    for (item in calcDataFinal[0]) {
        var percentage = calcDataFinal[0][item].valor / 100
        rentFinal = rentFinal * (1 + percentage)
        acc = acc + acc * percentage
        //salva a memoria de calculo anual
        if (item % 12 == 11) {
            calcMemory.push({
                date: (`${calcDataFinal[0][item].data.slice(6)}-${initialDate.slice(3, 5)}`),
                value: rentFinal.toFixed(2).replace('.', ','),
                rate: `${((acc - 1) * 100).toFixed(2).replace('.', ',')}`,
            })
            acc = 1
        }
    }
    const dataRetorno = dateReajustment[0].slice(0, 7)
    // lida com datas inferiores a um ano ou de antes do primeiro indice
    if (!calcDataFinal[0][0]) {
        calcMemory.push(`Faltam informações de índice para fazer esse cálculo.`)
    }
    // nos casos da condicional que pega ate year-1, adiciona comentario da memória de calc de year
    /**
    if (calcMemory[calcMemory.length - 1].date.slice(0, 4) == `${year - 1}`) {
      calcMemory.push(`Faltam informações de índice para fazer o cálculo em ${year}-${month + 1}. `)
    }
     */
    return { value: rentFinal.toFixed(2).replace('.', ','), memory: calcMemory, date: dataRetorno, rate: calcMemory[calcMemory.length - 1].rate };
}

// cénario de uso
/** 
(async (calculation) => {
    // IIFE
    try {
        const resultIGPM = await calculation({
            index: 'IGPM',
            baseDate: '2019-07-01',
            baseValue: 'R$ 300.000,33',
        })
        console.log(resultIGPM) // { value: 363.17, memory: []

        const resultIPCA = await calculation({
            index: 'IPCA',
            baseDate: '2015-12-01',
            baseValue: 'R$ 1.000.000,33',
        })
        console.log(resultIPCA) // { value: 370.25, memory: [] }

    } catch (error) {
        console.error(error) // new Error();
    }
})(Calculation)
*/

exports.Calculation = Calculation;
