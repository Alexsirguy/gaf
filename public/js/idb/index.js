let dbPromise = idb.open('cur_db', 1, db => {
  let keyValStore = db.createObjectStore('currency',{
    keyPath: 'id'
  });
  keyValStore.createIndex('id','id');

  let keyValStore2 = db.createObjectStore('converter');
  keyValStore2.createIndex('id','id');
});

let option = "";
const currencyVal = (datas) => datas.forEach(data=>{
  option +=`<option>`+data.id+`</option>`;
  $("#to").empty();
  $("#from").empty();
  $("#to").html(option);
  $("#from").html(option);
});

fetch('https://free.currencyconverterapi.com/api/v5/currencies')
.then(response=>{
  response.json().then(results=>{
    for (const result in results){
      for(const id in results[result]){
      dbPromise.then(db =>{
        if(!db) return;
        let tx = db.transaction('currency', 'readwrite');
        let store = tx.objectStore('currency');
      store.put(results[result][id]);
      //option +=`<option>`+results[result][id]['id']+`</option>`;
      $("#to").append(`<option>`+results[result][id]['id']+`</option>`);
      $("#from").append(`<option>`+results[result][id]['id']+`</option>`);
     });
     }
    }

  })
}).catch(err =>{
  console.log(err);
});

dbPromise.then(db => {
  let tx = db.transaction('currency')
  .objectStore('currency').index('id');
  return tx.getAll().then(data =>{
    currencyVal(data);
  });
});
