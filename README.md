##readjustment-calculation
function that calculates the rent readjustmente for a given value and date
-----------------------------------------------------------------
#Installation:
You can install using npm with the following command:
- npm i calculatorreadjustment
-----------------------------------------------------------------
#Using the function:
First you have to open the package.json file from your project and set:
- "type": "modules"

Then crate a .env file and paste:
- ˋNEXT_PUBLIC_BEARER_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzE4ODQ3NDgsImlzcyI6IkJBQ0tFTkQiLCJqdGkiOiJiMWQzMzU5My1kNjJhLTQwZGUtOTc4Ny1hNGEzNjMwNTI2NTIiLCJzY29wZSI6ImFwaSIsInN1YiI6IiJ9.dfKy81DRhhq1nNhsOIXnxXvHm7q6ykUX8qbDtOtNRYcˋ

After, you'll have to import the function:
- ˋimport { Calculation } from "calculatorreadjustment/calculation.js";ˋ 

Now you're able to call Calculation in your code, the argument is an object containing:
- index (IGPM or IPCA)
- baseDate (the date from the start of the calculation)
- baseValue (the rent that use to be charged on the baseDate)



-----------------------------------------------------------------
#Examples
ˋˋˋ
(async (calculation) => {
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
})(Calculation)
ˋˋˋ
-----------------------------------------------------------------

-----------------------------------------------------------------
dependencies: 
- axios
-----------------------------------------------------------------