$(document).ready(()=>{
  $("#converter").click(()=>{
   $("#result").val("Converting...");
    let toCurrency = $("#to").val();
    let fromCurrency = $("#from").val();
    let query = `${fromCurrency}_${toCurrency}`;
    const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
    dbPromise.then(db => {
      let tx = db.transaction('converter');
      let keyValStore = tx.objectStore('converter');
      return keyValStore.get(query);
    }).then(data =>{
        if(data != undefined){
        let result = Math.round(($("#amount").val() * data) * 100 ) / 100;
        $("#result").val(result);
        }
    });
    fetch(url).then(response =>{
    return response.json()
  }).then(data =>{
    let result = Math.round(($("#amount").val() * data[query]) * 100 ) / 100;
    $("#result").val(result);
    dbPromise.then(db =>{
      if(!db) return;
      let tx = db.transaction('converter', 'readwrite');
      let store = tx.objectStore('converter');
    store.put(data[query], query);
   });
  });
  });
});
