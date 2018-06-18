// ==UserScript==
// @name         BNB evaluator
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  将币安网页的BTC估值改为BNB估值
// @author       You
// @match        https://www.binance.com/userCenter/balances.html
// @grant        none
// ==/UserScript==

var global_bnbprice;
var global_button;
function toggleBNBBTC()
{
    var allev = document.getElementsByClassName('equalValue');
    if(allev[0].innerText.indexOf('BTC')!=-1)
    {//说明当前是以BTC估值的

        global_button.setAttribute('value','点击切换为BTC估值');
        allev[0].innerText=allev[0].innerText.replace('BTC','BNB');
        for (var i = 1; i < allev.length; i++) {
            thisElement = allev[i];
            thisElement.innerText = thisElement.innerText/global_bnbprice;
        }
    }
    else
    {//说明当前是以BNB估值的
        global_button.setAttribute('value','点击切换为BNB估值');
        allev[0].innerText=allev[0].innerText.replace('BNB','BTC');
        for (var j = 1; j < allev.length; j++) {
            thisElement = allev[j];
            thisElement.innerText = thisElement.innerText*global_bnbprice;
        }
    }
}
(function() {
    'use strict';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //get price
            var json = JSON.parse(this.responseText);
            global_bnbprice = json.price;
        }
    };
    xhttp.open("GET", "https://www.binance.com/api/v1/ticker/price?symbol=BNBBTC", true);//获取目标币种与BTC的价格，利用了币安api用www域名也可获得的bugture
    xhttp.send();

    global_button = document.createElement('input');
    global_button.setAttribute('type','button');
    global_button.setAttribute('value','点击切换为BNB估值');
    global_button.addEventListener("click", toggleBNBBTC);
    var bartitledivs = document.getElementsByClassName('chargeWithdraw-title');
    bartitledivs[0].appendChild(global_button);
})();
