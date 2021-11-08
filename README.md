# readjustment-calculation
function that calculates the rent readjustmente for a given value and date
-----------------------------------------------------------------
**Installation:
You can install using npm with the fallowing command:
- npm i calculatorreadjustment
-----------------------------------------------------------------
**Using the function:
First you have to open the package.json file from your project and set:
- "type": "modules"

After, you'll have to import the function:
- import { Calculation } from "calculatorreadjustment/calculation.js"; 

Now you're able to call Calculation in your code, the argument is an object containing:
- index (IGPM or IPCA)
- baseDate (the date from the start of the calculation)
- baseValue (the rent that use to be charged on the baseDate)



-----------------------------------------------------------------
Here are some examples

(async (calculation) => {
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


-----------------------------------------------------------------
dependencies: 
- axios
-----------------------------------------------------------------