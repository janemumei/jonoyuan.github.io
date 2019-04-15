$(document).ready(function() {

const items = [{
  "title" : "Rebalancing Citi Bike",
  "text"  : "Mobile app concept powered by poisson regressions and predicted demand and supply of NYC bike share.",
  "image" : "/src/download.png",
  "href"  : "#"
},  {
  "title" : "",
  "text"  : "",
  "image" : "",
  "href"  : ""
},  {
  "title" : "",
  "text"  : "",
  "image" : "",
  "href"  : ""
}];

for (let i = 0; i < items.length; i++) {
  let item = items[i]
  $('.item-container').append(`
    <style type="text/css">.i${i}::after {background-image:url(${item.image})}</style>
    <a class="item i${i}" href="${item.href}">
      <div class="item-title">${item.title}</div>
      <div class="item-text">${item.text}</div>
    </a>
  `)
}

});
