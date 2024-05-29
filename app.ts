#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import list from './currencyList.js';

//import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
//inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);



// **************________SEARCH FUNCTION_____************************

function search(myarray:string[],criteria:string):string[]
 { return (myarray.filter((item:string) => item.includes(criteria)));
}

// **************________SEARCH FUNCTION_____************************



//****************Start of Inquirer Prompt ********************************//
const search_from_letter  = await inquirer.prompt([
  {
    name:'letter',
    message:"Please Enter Your 'From Currency' First letters",
    type:'input',
  
  }
]) 

const search_criteria = search_from_letter.letter.toUpperCase();
const myarray :string[]= list;
const sorted :string[] = search(myarray,search_criteria);


const ANS = await inquirer.prompt([ 
{
  name:'From',
  message:'Please Select Your From Currency',
  type:'list',
  choices:sorted,
}]);

const search_to_letter  = await inquirer.prompt([
{
  name:'letter_to',
  message:"Please Enter Your 'To Currency' First letters",
  type: 'input',
  

}]);

const search_criteria_to = search_to_letter.letter_to.toUpperCase();
const sorted2 :string[] = search(myarray,search_criteria_to);


const ANS_to = await inquirer.prompt([ 
{
  name:'To',
  message:'Please Select Your To Currency',
  type:'list',
  choices:sorted2,
},
{
  name:'amount',
  message:'Please Enter Your Amount for Conversion',
  type:'number',
  
}
])
 

//****************End of inquirer prompt ********************************//


     //'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=YOUR_APIKEY&symbols=PKR,GBP,EUR,USD'
   let Base_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7f909bef685b4a4a868f69d7ce476562'
   let symbol='&symbols='
   let from  = `${ANS.From}`
   let to = `${ANS_to.To}`
   let Full_URL = `${Base_URL}${symbol}${from},${to}`
   

async function getrate()
{  let response = await fetch(Full_URL)
  let data = await response.json()
let rate = data.rates  
   let keys=Object.keys(rate)
   let val=Object.values(rate)
   //console.log(rate)
   //console.log(keys)
  let Pkr_Rate :any  = data.rates[`${from}`]
   let Other_Rate :any  = data.rates[`${ANS_to.To}`]
   
   //console.log(Other_Rate)

       
if(ANS_to.To === 'USD'){
       let a : any = (ANS_to.amount/Pkr_Rate)
       console.log(chalk.cyan.bold(`You Will get ${a} ${ANS_to.To}`));
    }
    else if (ANS_to.To !== 'USD'){
              let a : any = ((ANS_to.amount/Pkr_Rate)*Other_Rate).toFixed(4);
              console.log(chalk.cyan.bold(`You Will get ${a} ${ANS_to.To}`));
    }
    console.log(rate);
  }

 getrate(); 


 
  