if (localStorage.getItem("token")){
  localStorage.clear()
}

$( "#register" ).click(function( event ) {
  $('.register').show()
  $('.home').hide()
  $('.login').hide()
  $("#notification1").empty()
})   

$( "#register-form" ).submit(function( event ) {
  event.preventDefault()
  const name = $("#nameR").val()
  const email = $("#emailR").val()
  const password = $("#passwordR").val()
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/user/register`,
    data: {
      name: name,
      email: email,
      password: password,
    },
    dataType: "json"
  })
  .done(function( data ) {
    $("#notification1").empty()
    $("#notification1").append(`
    <div class="alert alert-success" role="alert">
      Registration Success!
    </div>
    `)
  })
  .fail(function(err) {
    $("#notification1").empty()
    $("#notification1").append(`
    <div class="alert alert-warning" role="alert">
      ${Object.values(err.responseJSON.message)}
    </div>
    `)
  })
})

$( "#login" ).click(function( event ) {
  $('.login').show()
  $('.home').hide()
  $('.register').hide()
  $("#notification2").empty()
}) 

$( "#login-form" ).submit(function( event ) {
  event.preventDefault()
  const email = $("#emailL").val()
  const password = $("#passwordL").val()
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/user/login`,
    data: {
      email: email,
      password: password,
    },
    dataType: "json"
  })
  .done(function( data ) {
    $("#notification2").empty()
    $("#notification3").empty()
    $("#notification2").append(`
    <div class="alert alert-success" role="alert">
      Registration Success!
    </div>
    `)
    localStorage.setItem("token", data.token)
    $("#user").append(data.name)
    $(".logged-out").hide()
    $(".logged-in").attr( "style", "display: inline-block;" )
    $(".logged-in").show()
    $('.login').hide()
    $('.home').show()
    $.ajax({
      method: "GET",
      url: `http://localhost:3000/recipe/list`,
      headers: {token: localStorage.getItem("token")}
    })
    .done(function(data) {
      for (let i = 0; i < data.length; i++){
        $("#fav-recipe").append(`
        <div class="card" style="width: 100%;">
          <img class="card-img-top" src="${data[i].image}">
          <div class="card-body text-center">
            <h5 class="card-title">${data[i].name}</h5>
            <h6 class="card-title">${data[i].source}</h6>
            <div class="row justify-content-center">
            <a href="#" class="btn btn-primary detail" id="${data[i].uri}" data-toggle="modal" data-target="#modal">Detail</a>
            </div>
            <div class="row justify-content-center">
            <a href="#" class="btn btn-primary remove mt" id="${data[i]._id}">Remove from Favorite</a>
            </div>
          </div>
        </div>
      `)
      }
    })
    $.ajax({
      method: "GET",
      url: `http://localhost:3000/restaurants/favorite`,
      headers: {token: localStorage.getItem("token")}
    })
    .done(function(data) {
      for (let i = 0; i < data.length; i++){
        $("#fav-restaurant").append(`
          <div class="card" style="width: 100%;">
            <img class="card-img-top" src="${data[i].image}">
            <div class="card-body text-center">
              <h5 class="card-title">${data[i].name}</h5>
              <a href="#" class="btn btn-primary detail" id="${data[i].resId}" data-toggle="modal" data-target="#modal">Detail</a>
              <a href="#" class="btn btn-primary remove mt" id="${data[i]._id}">Remove from Favorite</a>
            </div>
          </div>
        `)
      }
    })
  })
  .fail(function(err) {
    $("#notification2").empty()
    $("#notification2").append(`
    <div class="alert alert-warning" role="alert">
      ${err.responseJSON.message}
    </div>
    `)
  })
})

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  axios
    .post (`http://localhost:3000/user/signingoogle`, {
      token: id_token
    })
    .then(function( {data} ) {
      $("#notification2").empty()
      $("#notification2").append(`
      <div class="alert alert-success" role="alert">
        Login Success!
      </div>
      `)
      localStorage.setItem("token", data.token)
      $("#user").append(data.name)
      $(".logged-out").hide()
      $(".logged-in").attr( "style", "display: inline-block;" )
      $(".logged-in").show()
      $('.login').hide()
      $('.home').show()
      $("#notification2").empty()
      $("#fav-recipe").empty()
      $.ajax({
        method: "GET",
        url: `http://localhost:3000/recipe/list`,
        headers: {token: localStorage.getItem("token")}
      })
      .done(function(data) {
        for (let i = 0; i < data.length; i++){
          $("#fav-recipe").append(`
          <div class="card" style="width: 100%;">
            <img class="card-img-top" src="${data[i].image}">
            <div class="card-body text-center">
              <h5 class="card-title">${data[i].name}</h5>
              <h6 class="card-title">${data[i].source}</h6>
              <div class="row justify-content-center">
              <a href="#" class="btn btn-primary detail" id="${data[i].uri}" data-toggle="modal" data-target="#modal">Detail</a>
              </div>
              <div class="row justify-content-center">
              <a href="#" class="btn btn-primary remove mt" id="${data[i]._id}">Remove from Favorite</a>
              </div>
            </div>
          </div>
        `)
        }
      })
      $.ajax({
        method: "GET",
        url: `http://localhost:3000/restaurants/favorite`,
        headers: {token: localStorage.getItem("token")}
      })
      .done(function(data) {
        for (let i = 0; i < data.length; i++){
          $("#fav-restaurant").append(`
            <div class="card" style="width: 100%;">
              <img class="card-img-top" src="${data[i].image}">
              <div class="card-body text-center">
                <h5 class="card-title">${data[i].name}</h5>
                <a href="#" class="btn btn-primary detail" id="${data[i].resId}" data-toggle="modal" data-target="#modal">Detail</a>
                <a href="#" class="btn btn-primary remove mt" id="${data[i]._id}">Remove from Favorite</a>
              </div>
            </div>
          `)
        }
      })
    })
    .catch(function(err) {
      $("#notification2").empty()
      $("#notification2").append(`
      <div class="alert alert-warning" role="alert">
        ${err.message}
      </div>
      `)
    })
}

function signOut() {
  $('.logged-out').show()
  $("#user").empty()
  $("#restaurant").empty()
  $("#fav-restaurant").empty()
  $("#recipe").empty()
  $("#fav-recipe").empty()
  $('.logged-in').hide()
  $('.home').hide()
  $('.login').show()
  localStorage.token = ""

  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

$( "#filter" ).submit(function( event ) {
  event.preventDefault()
  const food = $("#food").val()
  $("#restaurant").empty()
  $("#recipe").empty()
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/restaurants/${food}`
  })
  .done(function( data ) {
    let resto = data.restaurants
    for (let i = 0; i < resto.length; i++){
      $("#restaurant").append(`
      <div class="card" style="width: 100%;">
        <img class="card-img-top" src="${resto[i].restaurant.thumb}">
        <div class="card-body text-center">
          <h5 class="card-title">${resto[i].restaurant.name}</h5>
          <a href="#" class="btn btn-primary detail" id="${resto[i].restaurant.id}" data-toggle="modal" data-target="#modal">Detail</a>
          <a href="#" class="btn btn-primary" id="${resto[i].restaurant.id}" onclick="addFavResto('${resto[i].restaurant.id}', '${resto[i].restaurant.name}', '${resto[i].restaurant.location.address}', '${resto[i].restaurant.user_rating.aggregate_rating}', '${resto[i].restaurant.thumb}')">Add To Favorites</a>
        </div>
      </div>
      `)
    }
  })
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/recipe/search?name=${food}`
  })
  .done(function( {data} ) {
    for (let i = 0; i < data.length; i++){
      $("#recipe").append(`
      <div class="card" style="width: 100%;">
        <img class="card-img-top" src="${data[i].recipe.image}">
        <div class="card-body text-center">
          <h5 class="card-title">${data[i].recipe.label}</h5>
          <h6 class="card-title">${data[i].recipe.source}</h6>
          <a href="#" class="btn btn-primary detail" id="${data[i].recipe.uri}" data-toggle="modal" data-target="#modal">Detail</a>
          <a href="#" class="btn btn-primary" id="${data[i].recipe.uri}" onclick="addFavRecipe('${data[i].recipe.uri}', '${data[i].recipe.label}', '${data[i].recipe.image}', '${data[i].recipe.source}', '${data[i].recipe.url}')">Add To Favorites</a>
        </div>
      </div>
      `)
    }
  })
})

function addFavResto (resId, name, address, rating, image) {
  $("#notification3").empty()
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/restaurants/favorite`,
    headers: {token: localStorage.getItem("token")},
    data: {
      resId,
      name,
      address,
      rating,
      image
    },
    dataType: "json"
  })
  .done (function(data) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-success" role="alert">
      Add restaurant to favorite success!
    </div>
    `)
    $("#fav-restaurant").append(`
      <div class="card" style="width: 100%;">
        <img class="card-img-top" src="${data.image}">
        <div class="card-body text-center">
          <h5 class="card-title">${data.name}</h5>
          <a href="#" class="btn btn-primary detail" id="${data.resId}" data-toggle="modal" data-target="#modal">Detail</a>
          <a href="#" class="btn btn-primary remove mt" id="${data._id}">Remove from Favorite</a>
        </div>
      </div>
    `)
  })
  .fail(function(err) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-warning" role="alert">
      ${err.responseJSON.message}
    </div>
    `)
  })
}

function addFavRecipe (uri, name, image, source, url) {
  $("#notification3").empty()
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/recipe/addfav`,
    headers: {token: localStorage.getItem("token")},
    data: {
      name: name,
      uri: uri,
      image: image,
      source: source,
      url: url,
    },
    dataType: "json"
  })
  .done (function(data) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-success" role="alert">
      Add recipe to favorite success!
    </div>
    `)
    $("#fav-recipe").append(`
      <div class="card" style="width: 100%;">
        <img class="card-img-top" src="${data.image}">
        <div class="card-body text-center">
          <h5 class="card-title">${data.name}</h5>
          <h6 class="card-title">${data.source}</h6>
          <a href="#" class="btn btn-primary detail" id="${data.uri}" data-toggle="modal" data-target="#modal">Detail</a>
          <a href="#" class="btn btn-primary remove mt" id="${data._id}">Remove from Favorite</a>
        </div>
      </div>
    `)
  })
  .fail(function(err) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-warning" role="alert">
      ${err.responseJSON.message}
    </div>
    `)
  })
}

$("#fav-restaurant").on("click", ".remove", function(event) {
  let id = $("a").prevObject[0].activeElement.id
  let card = $(this)
  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/restaurants/favorite/${id}`,
    headers: {token: localStorage.getItem("token")}
  })
  .done (function(data) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-success" role="alert">
      Restaurant removed from favorite!
    </div>
    `)
    card.closest('.card').remove()
  })
  .fail(function(err) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-warning" role="alert">
      ${err.responseJSON.message}
    </div>
    `)
  })
})

$("#fav-recipe").on("click", ".remove", function(event) {
  let id = $("a").prevObject[0].activeElement.id
  let card = $(this)
  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/recipe/deletefav/${id}`,
    headers: {token: localStorage.getItem("token")}
  })
  .done (function(data) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-success" role="alert">
      Recipe removed from favorite!
    </div>
    `)
    card.closest('.card').remove()
  })
  .fail(function(err) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-warning" role="alert">
      ${err.responseJSON.message}
    </div>
    `)
  })
})

$(".restaurant").on("click", ".detail", function(event) {
  let id = $("a").prevObject[0].activeElement.id
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/restaurants/detail/${id}`,
    headers: {token: localStorage.getItem("token")}
  })
  .done (function(data) {
    $("#notification3").empty()
    $(".modal-title").empty()
    $(".modal-title").append(`${data.name}`)
    $(".modal-body").empty()
    $(".modal-body").append(`
    <div class="row">
      <div class="col"> 
        isi map
      </div>
      <div class="col"> 
        <img class="card-img-top" src="${data.thumb}">
      </div>
    </div>
    <h3>Location: ${data.location.address}</h3>
    <h3>Rating: ${data.user_rating.aggregate_rating}</h3>
    `)
  })
  .fail(function(err) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-warning" role="alert">
      ${err.message}
    </div>
    `)
  })
})

$(".recipe").on("click", ".detail", function(event) {
  let uri = $("a").prevObject[0].activeElement.id
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/recipe?uri=${encodeURIComponent(uri)}`,
    headers: {
      token: localStorage.getItem("token")
  }
  })
  .done (function({data}) {
    $("#notification3").empty()
    $(".modal-title").empty()
    $(".modal-title").append(`${data.label}`)
    $(".modal-body").empty()
    $(".modal-body").append(`
    <div class="row">
      <div class="col"> 
        <ol id="ing">

        </ol>
        <h3>${data.source}</h3>
        <a href="${data.url}" target="_blank">See full recipe here!</a>
      </div>
      <div class="col"> 
        <img class="card-img-top" src="${data.image}">
      </div>
    </div>
    `)
    for (let i = 0; i < data.ingredientLines.length; i++){
      $("#ing").append(`
      <li>
      <h5>${data.ingredientLines[i]}</h5>
      </li>
      `)
    }
  })
  .fail(function(err) {
    $("#notification3").empty()
    $("#notification3").append(`
    <div class="alert alert-warning" role="alert">
      ${err.message}
    </div>
    `)
  })
})