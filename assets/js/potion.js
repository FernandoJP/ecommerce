window.onload = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/potions.json', true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      var potions = xhr.response.potions;
      window.dataLayer = potions;
      for (var i = 1; i <= Object.keys(potions).length; i++) {
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
  var domString = '<div class="potion" data-id="' + potion.id + '"><img src="products/' + potion.image + '">'
    + '<div class="potion-details"><span class="potion-name">' + potion.name + '</span> - <span class="potion-price">$' + potion.price + '</span></div></div>';
  el.innerHTML = domString;

  //modal
  el.firstChild.addEventListener("click", openModal);

  document.querySelector('.l-potions>div').appendChild(el.firstChild);

  function openModal(e) {
    var modalWrapper = document.querySelector('.modal-wrapper');
    var modal = document.querySelector('.modal');

    modalWrapper.classList.toggle('visible');

    var ingredients = "";
    for(var i = 0; i < potion.ingredients.length; i++){
      ingredients += potion.ingredients[i]+"<br />";
    }
    var el = document.createElement('div');
    var domString = '<div class="potion-details flex-container"><img class="potion-details-img" src="products/' + potion.image + '">'
      + '<div class="potion-details-text"><h3>' + potion.name + '</h3>'
      + '<h4>Cause/Effect:</h4><p>' + potion.effect + '</p>'
      + '<h4>Ingredients:</h4><p>' + ingredients + '</p>'
      + '<h4>Price:</h4><p style="color:red;font-weight:bold;">$' + potion.price + '</p>'
      + '<button type="button">ADD TO CART</button>'
      + '</div></div>'
    el.innerHTML = domString;
    modal.appendChild(el.firstChild);

    modalWrapper.addEventListener("click", closeModal);
  }

  function closeModal(e) {
    e.preventDefault();
    var modal = e.target.parentElement;
    if (Array.prototype.every.call(e.target.className, function (v) {
      return modal.classList.contains(v);
    })
    ) {
      modal.classList.toggle('visible');
  var divs = document.querySelectorAll('.modal-wrapper.visible'), i;

  for (i = 0; i < divs.length; ++i) {
    divs[i].classList.remove('visible');
  }

      document.querySelector('.modal .potion-details').remove();
    }
  }
}

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}