(function() {
var mapDraw = function(layers) {

  layers = layers || [];

  if (slideshow.current > -1) {
    let nextlayers = Object.keys(layers);
  } else {nextlayers = []}

  // remove existing map layers
  map.eachLayer(function(leaf) {
    if (leaf != Stamen_TonerLite) {
      map.removeLayer(leaf);
    }
  });

  // add new layers
  let names = Object.keys(layers); // layers is list of layers in each slide
  slideshow.currentlayers = names;

  names.forEach(function(name) {
    let layer = layers[name];
    if (!layer) {return;}

    slideshow.leaves.forEach(function(leave){ // leave.leaf is actual leaflet object
      if (name !== leave.name) {return;}

      leave.leaf.eachLayer(function(l) {
        if (layer.popup) {
          l.bindPopup(eval(layer.popup));
        }
        if (layer.style) {
          l.setStyle(eval("("+layer.style+")"));
        }
      });
      leave.leaf.addTo(map);
      if (layer.bounds) {map.fitBounds(leave.leaf.getBounds());}
    });
  });
};

var slideSetup = function(slides) {
  slideshow = {
    deck   : slides.deck,
    leaves : slides.leaves,
    init   : slides.init,
    current: -1,
    currentlayers : []
  };

  // part A-1: set up basemap
  slideshow.init.latLngBounds =
    L.latLngBounds(
      L.latLng(slideshow.init.maxBounds.sw),
      L.latLng(slideshow.init.maxBounds.ne)
    )
  map.setMaxBounds(slideshow.init.latLngBounds
  ).setMinZoom(slideshow.init.minZoom
  ).setMaxZoom(slideshow.init.maxZoom
  ).fitBounds(slideshow.init.latLngBounds
  );

  // part A-2: set up map layers
  slideshow.leaves.forEach(function(leave) {
    if (leave.type === "geoJSON") {
      leave.leaf = L.geoJSON(leave.json);
    }
  });
  mapDraw(slideshow.init.layers);

  // part B: set up slides
  for (let n = 0; n < slideshow.deck.length; n++) {
    let slide = slideshow.deck[n];

    $('.content').append(`
      <div class="slide n${n}">${slide.html}</div>
    `);
    $('.bar').before(`
      <div class="control n${n} hide">${slide.id}</div>
    `);
  }

  // listener for start slides button
  $('.start').click(function(){
    slideControl();
    $('.loading').addClass('hide');
    $('.control,.slide').not('.loading,.left,.right').removeClass('hide');
  });

  // listeners for controls
  $('.left.control').click(function(){slideControl('left')});
  $('.right.control').click(function(){slideControl('right')});
  for (let n = 0; n < slideshow.deck.length; n++) {
    $('.control.n'+n).click(function(){slideControl(n)});
  }

  // back button, reset display
  $('.back').click(function(){
    $('.sidebar-container *,.loading').removeClass('hide').removeClass('active');
    $('.control,.slide,.back').not('.loading').addClass('hide');
    mapDraw(slideshow.init.layers);
    slideshow.current = -1;
  });

  // change "loading" to start slides button
  $('.loading.slide').html(slideshow.init.html);
  $('.title,title').html(slideshow.init.header);
  $('.start').html('Start slideshow');
  $('.start').addClass('control');
}

var slideControl = function(index) {
  let i = typeof index === 'number',    // e.g. 0, 1, 2
      x = typeof index === 'string';    // e.g. left, next

  // do control action (change current slide)
  let newslide = slideshow.current;
  if (i) {
    newslide = index;
  } else if (x) {
      switch (index.charAt(0)) {
        case 'l': case 'p': case 'b': case '<':
          newslide -= 1;
          break;
        case 'r': case 'n': case 'f': case '>':
          newslide += 1;
          break;
      }
  } else {
    newslide = 0;
  }

  // fix negative or too large indices
  if (newslide < 0) {newslide = 0}
  if (newslide > slideshow.deck.length - 1) {newslide = slideshow.deck.length - 1;}

  // adjust slide and control
  if (slideshow.current !== newslide) {
    $('.slide,.control').removeClass('active');
    $('.n'+newslide).addClass('active');

    $('.control,.back').not('.loading').removeClass('hide');
    switch (newslide) {
      case 0: $('.control.left').addClass('hide'); break;

      case (slideshow.deck.length-1):
        $('.control.right').addClass('hide'); break;
    }

    slideshow.current = newslide;
  }

  // adjust map

  mapDraw(slideshow.deck[slideshow.current].layers);

};

// start!
if (slides) {window.slideshow; slideSetup(slides);}
else {console.log("Slides not valid")}
})();
