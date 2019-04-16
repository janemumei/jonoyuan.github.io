$(document).ready(function() {

$('a').on("touchstart", function (e) {
  'use strict';
  var link = $(this);
  if (link.hasClass('hover')) {
      return true;
   }
  else {
     link.addClass('hover');
     $('ul > li').not(this).removeClass('hover');
     e.preventDefault();
     return false; //extra, and to make sure the function has consistent return points
    }
});

const sections = [{

  "section" : "Government Administration",

  "cards"   : [{
    "title" : "The Vision Zero Toolbox",
    "text"  : "Administrative and engineering strategies to save lives on Philadelphia streets.",
    "image" : "src/visionzero.jpg",
    "tools" : ["policy","opendata"],
    "links" : [{
      "name" : "Excerpt",
      "type" : "PDF 2.0 MB",
      "href" : "projects/visionzero_excerpt.pdf"
    }, {
      "name" : "Slides",
      "type" : "Large PDF 24.0 MB",
      "href" : "projects/visionzero.pdf"
    }]
  }, {
    "title" : "Building Code Violations (WIP)",
    "text"  : "Machine learning models target high-risk properties at the Department of Code Violations in Syracuse, NY.",
    "image" : "src/syracuse.png",
    "tools" : ["GIS","R","ML"],
    "links" : [{
      "name" : "Report",
      "type" : "Web 1.4 MB",
      "href" : "projects/syracuse.html"
    }]
  }]
}, {

  "section" : "Data Analytics",

  "cards"   : [{
    "title" : "Rebalancing Citi Bike",
    "text"  : "Mobile app concept powered by poisson regression and predicted demand for NYC bike share.",
    "image" : "src/newyork.png",
    "tools" : ["GIS","R","stats"],
    "links" : [{
      "name" : "Slides",
      "type" : "PDF 4.0 MB",
      "href" : "projects/newyork.pdf"
    }, {
      "name" : "Report",
      "type" : "Web 6.8 MB",
      "href" : "projects/newyork.html"
    }]
  }, {
    "title" : "Maximizing Vehicle Efficiency",
    "text"  : "Intersection improvements in Philadephia's University City using four-step modelling and signal timing optimization.",
    "image" : "src/walnut34.png",
    "tools" : ["VISSIM","TDM"],
    "links" : [{
      "name" : "Slides",
      "type" : "PDF 6.4 MB",
      "href" : "projects/walnut34.pdf"
    }]
  }, {
    "title" : "Hedonic Home Price Prediction",
    "text"  : "Imputation of Nashville home prices based on Zillow sales data.",
    "image" : "src/nashville.png",
    "tools" : ["GIS","R","stats"],
    "links" : [{
      "name" : "Report",
      "type" : "Web 1.4 MB",
      "href" : "projects/nashville.html"
    }]
  }]
}];

for (let i = 0; i < sections.length; i++) {

  let s = sections[i]

  $('.item-container').append(`
    <div class="section s${i} row justify-content-start" style="margin: 1rem -0.5rem 0;">
      <div class="section-title s${i} w-100" style="margin:0 0.5rem;">${s.section}</div>
    </div>
  `)
  console.log(`s${i}`)

  let items = s.cards;

  for (let j = 0; j < items.length; j++) {
    let item = items[j]

    let tools = "";
    item.tools.forEach(function(t) {
      tools += `<span class="tool">#${t}</span>`;
    });

    let links = "";
    item.links.forEach(function(l) {
      links += `
        <a href="/${l.href}" target="_blank" class="link">
          View ${l.name}<br>
          <span style="font-size:0.75rem">(${l.type})</span>
        </a>
      `;
    })

    $(`.section.s${i}`).append(`
      <style type="text/css">
        .s${i}.i${j}::after {background-image:url(/${item.image})}
      </style>
      <div class="item s${i} i${j}">
        <div class="item-left">
          <div class="item-title">${item.title}</div>
          <div class="item-tools">${tools}</div>
        </div>
        <div class="item-right">
          <div class="item-links">
            ${links}
          </div>
          <div class="item-text lh-sm">${item.text}</div>
        </div>
      </div>
    `)
    console.log(`s${i} i${j}`)
  }

}






});
