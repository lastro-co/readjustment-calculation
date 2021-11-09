const Calculation = require('./calculation');
test('igpm value: 363.17 ipca value: 370.25', () => {
    expect((typeof (async (calculation) => {
        // IIFE
        try {
            const resultIGPM = await calculation({
                index: 'IGPM',
                baseDate: '2019-11-01',
                baseValue: '300.33',
            })
            console.log(resultIGPM) // { value: 363.17, memory: []

            const resultIPCA = await calculation({
                index: 'IPCA',
                baseDate: '2015-12-01',
                baseValue: 300.33,
            })
            console.log(resultIPCA) // { value: 370.25, memory: [] }

        } catch (error) {
            console.error(error) // new Error();
        }
    })(Calculation).then)).toBe('function');
});