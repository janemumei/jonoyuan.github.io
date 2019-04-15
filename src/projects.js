$(document).ready(function() {

const items = [{
  "title" : "The Vision Zero Toolbox",
  "text"  : "Administrative and engineering strategies for saving lives on Philadelphia streets.",
  "image" : "src/visionzero.jpg",
  "tools" : ["gvt","policy","opendata"],
  "links" : [{
    "name" : "Excerpt",
    "type" : "PDF 2.0 MB",
    "href" : "projects/visionzero_excerpt.pdf"
  },{
    "name" : "Slides",
    "type" : "Large PDF 24.0 MB",
    "href" : "projects/visionzero.pdf"
  }]
}, {
  "title" : "Rebalancing Citi Bike",
  "text"  : "Mobile app concept powered by poisson regression and predicted demand for NYC bike share.",
  "image" : "src/newyork.png",
  "tools" : ["GIS","R","stats","opendata"],
  "links" : [{
    "name" : "Slides",
    "type" : "PDF 4.0 MB",
    "href" : "projects/newyork.pdf"
  },{
    "name" : "Report",
    "type" : "Web 6.8 MB",
    "href" : "projects/newyork.html"
  }]
},  {
  "title" : "Maximizing Vehicle Efficiency",
  "text"  : "Intersection improvements in Philadephia's University City using four-step modelling and signal timing optimization.",
  "image" : "src/walnut34.png",
  "tools" : ["VISSIM","TDM"],
  "links" : [{
    "name" : "Slides",
    "type" : "PDF 6.4 MB",
    "href" : "projects/walnut34.pdf"
  }]
},  {
  "title" : "Hedonic Home Price Prediction",
  "text"  : "Imputation of Nashville home prices based on Zillow sales data.",
  "image" : "src/nashville.png",
  "tools" : ["GIS","R","stats"],
  "links" : [{
    "name" : "Report",
    "type" : "Web 1.4 MB",
    "href" : "projects/nashville.html"
  }]
},  {
  "title" : "Building Code Violations (WIP)",
  "text"  : "Machine learning models target high-risk properties at the Department of Code Violations in Syracuse, NY.",
  "image" : "src/syracuse.png",
  "tools" : ["GIS","R","ML"],
  "links" : [{
    "name" : "Report",
    "type" : "Web 1.4 MB",
    "href" : "projects/syracuse.html"
  }]
}];

for (let i = 0; i < items.length; i++) {
  let item = items[i]

  let tools = "";
  item.tools.forEach(function(t) {
    tools += `<span class="tool">#${t}</span>`;
  });

  let links = "";
  item.links.forEach(function(l) {
    links += `
      <a href="/${l.href}" target="_blank" class="link">
      ${ ''/*<a href="${l.href}" class="link">*/ }
        View ${l.name}<br>
        <span style="font-size:0.75rem">(${l.type})</span>
      </a>
    `;
  })

  $('.item-container').append(`
    <style type="text/css">
      .i${i}::after {background-image:url(/${item.image})}
      ${ ''/*.i${i}::after {background-image:url(${item.image})}*/ }
    </style>
    <div class="item i${i}">
      <div class="item-left">
        <div class="item-title">${item.title}</div>
        <div class="item-tools">${tools}</div>
      </div>
      <div class="item-right">
        <div class="item-links">
          ${links}
        </div>
        <div class="item-text">${item.text}</div>
      </div>
    </div>
  `)
}

});
