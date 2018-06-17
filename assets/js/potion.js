window.onload = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/potions.json', true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      var potions = xhr.response.potions;
      console.log("potions", potions);
      for(var i = 1; i <= Object.keys(potions).length; i++){
        addPotion(potions[i]);
      }
    } else {
      console.log('Error getting local JSON file. Make sure this application is running in a server.');
    }
  };
  xhr.send();
}

function addPotion(potion) {
  var el = document.createElement('div');
  var domString = '<div class="potion"><img src="products/'+potion.image+'">'
  +'<div class="potion-details"><span class="potion-name">' + potion.name + '</span> - <span class="potion-price">$' + potion.price + '</span></div></div>';
  el.innerHTML = domString;
  document.querySelector('.l-potions>div').appendChild(el.firstChild);
}