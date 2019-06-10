$(document).ready(function() {

const sections = [{

  "section" : "City Government",

  "cards"   : [{
    "title" : "The Vision Zero Toolbox",
    "text"  : "Administrative and engineering strategies to save lives on Philadelphia streets.",
    "image" : "src/visionzero.jpg",
    "tools" : ["policy","opendata"],
    "links" : [{
      "name" : "Full Report",
      "type" : "Google Drive 84 pgs",
      "href" : "//drive.google.com/file/d/1-1XRjPYyo4Jzn-Htc_egRw9ve9EXg-FE/view"
    }, {
      "name" : "Slides",
      "type" : "Large PDF 24.0 MB",
      "href" : "projects/visionzero.pdf"
    }]
  }, {
    "title" : "EV Charging in Parking Garages",
    "text"  : "Suitability analysis to prioritize the installation of EV charging infrastructure in SFMTA garages.",
    "image" : "src/sanfrancisco.jpg",
    "tools" : ["policy","parking"],
    "links" : [{
      "name" : "Report",
      "type" : "PDF 880 KB",
      "href" : "projects/sanfrancisco.pdf"
    }, {
      "name" : "Slides",
      "type" : "PDF 500 KB",
      "href" : "projects/sanfrancisco_slides.pdf"
    }]
  }, {
    "title" : "Building Code Violations",
    "text"  : "Machine learning models target high-risk properties at the Department of Code Violations in Syracuse, NY.",
    "image" : "src/syracuse.png",
    "tools" : ["GIS","Python","ML"],
    "links" : [{
      "name" : "App",
      "type" : "Web",
      "href" : "//musacuse.github.io/app"
    },{
      "name" : "Report",
      "type" : "Web 21.8 MB",
      "href" : "//musacuse.github.io"
    }]
  }]
}, {

  "section" : "Transportation Planning",

  "cards"   : [{
    "title" : "Maximizing Vehicle Efficiency",
    "text"  : "Intersection improvements in Philadephia's University City using four-step modelling and signal timing optimization.",
    "image" : "src/walnut34.png",
    "tools" : ["VISSIM","TDM"],
    "links" : [{
      "name" : "Slides",
      "type" : "PDF 6.4 MB",
      "href" : "projects/walnut34_slides.pdf"
    },{
      "name" : "Report",
      "type" : "PDF 2.3 MB",
      "href" : "projects/walnut34_report.pdf"
    }]
  },{
    "title" : "Transit Corridor Capacity",
    "text"  : "Capacity analysis of existing and hypothetical transit corridors in San Francisco, including Muni and BART.",
    "image" : "src/muni.jpg",
    "tools" : ["transit","InDesign","Illustrator"],
    "links" : [{
      "name" : "Report",
      "type" : "PDF 8.1 MB",
      "href" : "projects/muni.pdf"
    }]
  },{
    "title" : "Parking in Chinatown",
    "text"  : "Policy recommendations for parking in Philadelphia Chinatown.",
    "image" : "src/chinatown.jpg",
    "tools" : ["parking","Leaflet"],
    "links" : [{
      "name" : "Slides",
      "type" : "PDF 790KB",
      "href" : "projects/chinatown.pdf"
    },{
      "name" : "Storymap",
      "type" : "Web 4.1MB",
      "href" : "//jonoyuan.github.io/chinatown"
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
      "name" : "Video",
      "type" : "Youtube",
      "href" : "//www.youtube.com/watch?v=UQyTiw3YExM"
    }, {
      "name" : "Report",
      "type" : "Web 6.8 MB",
      "href" : "projects/newyork.html"
    }]
  }, {
    "title" : "Hedonic Home Price Prediction",
    "text"  : "Imputation of Nashville home prices based on county sales data.",
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
    <div class="section s${i} row justify-content-start" style="margin: 2rem -0.5rem 0;">
      <div class="section-title s${i} w-100" style="margin:0 0.5rem;">${s.section}</div>
    </div>
  `)

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
  }

}

if(window.location.hash) {
  let hash = window.location.hash.substr(1);
  $(hash).addClass('highlight');
  $([document.documentElement, document.body]).animate({
      scrollTop: $(".highlight").offset().top
  }, 200);
  $(hash).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(document).click(function(){
  $('.highlight').removeClass('highlight');
})



});
