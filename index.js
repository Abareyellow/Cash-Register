let cashRegister = {
  "PENNY": 0,
  "NICKEL": 0,
  "DIME": 0,
  "QUARTER": 0,
  "ONE": 0,
  "FIVE": 0,
  "TEN": 0,
  "TWENTY": 0,
  "ONE HUNDRED": 0,
  sum() {
    let sum = (this["PENNY"] * 0.01) + (this["NICKEL"] * 0.05) + (this["DIME"] * 0.10) +
      (this["QUARTER"] * 0.25) + (this["ONE"] * 1) + (this["FIVE"] * 5) + (this["TEN"] * 10) + (this["TWENTY"] * 20) + (this["ONE HUNDRED"] * 100);
    return sum;
  }
}

function setRegister(cid) {
  cashRegister["ONE HUNDRED"] = cid[8][1];
  cashRegister["TWENTY"] = cid[7][1];
   cashRegister["TEN"] = cid[6][1];
  cashRegister["FIVE"] = cid[5][1];
  cashRegister["ONE"] = cid[4][1];
  cashRegister["QUARTER"] = cid[3][1];
  cashRegister["DIME"] = cid[2][1];
  cashRegister["NICKEL"] = cid[1][1];
  cashRegister["PENNY"] = cid[0][1];

  return cashRegister;
}

function funds(change, cid) {
  //console.log(change)

  if (change == 0) {
    return cid
  } else if(cid.sum() < change) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  } else if(cid.sum() == change) {
    return "CLOSED";
  } else if((change - 100) >= 0 && cid["ONE HUNDRED"] != 0) {
    change -= 100;
    cid["ONE HUNDRED"] -= 100;
    funds(change, cid);
  } else if((change - 20) >= 0 && cid["TWENTY"] != 0) {
    change -= 20;
    cid["TWENTY"] = cid["TWENTY"] - 20;
    funds(change, cid);
  } else if((change - 10) >= 0 && cid["TEN"] != 0) {
    change -= 10;
    cid["TEN"] = cid["TEN"] - 10;
    funds(change, cid);
  } else if((change - 5) >= 0 && cid["FIVE"] != 0) {
    change -= 5;
    cid["FIVE"] = cid["FIVE"] - 5;
    funds(change, cid);
  } else if((change - 1) >= 0 && cid["ONE"] != 0) {
    change -= 1;
    cid["ONE"] = cid["ONE"] - 1;
    funds(change, cid);
  } else if((change - 0.25) >= 0 && cid["QUARTER"] != 0) {
    change -= .25;
    cid["QUARTER"] = cid["QUARTER"] - 0.25;
    funds(change, cid);
  } else if((change - 0.1) >= 0 && cid["DIME"] != 0) {
    change -= .10;
    cid["DIME"] = cid["DIME"] - 0.1;
    funds(change, cid);
  } else if((change - 0.05) >= 0 && cid["NICKEL"] != 0) {
    change -= 0.05;
    cid["NICKEL"] = cid["NICKEL"] - 0.05;
    funds(change, cid);
  } else if((change - 0.01) >= 0 && cid["PENNY"] != 0) {
    change -= 0.01;
    cid["PENNY"] = cid["PENNY"] - 0.01;
    funds(change, cid);
  }

  return cid;
}

function checkCashRegister(price, cash, cid) {
  let change = cash - price ;
  let cr = setRegister(cid);
  //console.log(cr)
  let coins = funds(change, cr);
  //console.log(coins);

  if (coins == {status: "INSUFFICIENT_FUNDS", change: []}) {
    return coins;
  } else if (coins == "CLOSED") {
    return {status: coins, change: cid}
  } else {
    let finalAnswer = [];
    for (let i = (cid.length - 1); i >= 0; i--) {
      console.log(cid[i][0])
      console.log(coins[cid[i][0]])
      
      if (cid[i][1] != coins[cid[i][0]]) {
        let coin = cid[i][1] - coins[cid[i][0]];
        finalAnswer.push([cid[i][0], coin]);
      }
    }

    return {status: "OPEN", change: finalAnswer}
  }
  return change;
}





console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));