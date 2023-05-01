
const maxProfit = (prices) => {
   prices = [7,1,5,3,6,4]
   let Buy = 0; 
   let sell = 1; 
   let profit = 0;

   while (sell < prices.length) {
     if (prices[Buy] < prices[sell]) {
       let profit = prices[sell] - prices[Buy]; 
       profit = Math.max(profit, profit);
     } 
   }
   return profit;
 };

 console.log(maxProfit());