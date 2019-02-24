/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

/* LOAD MAP */
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* MORE SETTINGS PANEL */
var open_panel = function(clicked,panel) {
  panel.css('display','block');
  clicked.text('less settings');
}
$('.more-button').click(function(){
  let panel = $('#more');
  if (panel.css('display') == "none") {
    open_panel($(this),panel);
  } else {
    panel.css('display','none');
    $(this).text('more settings');
  }
});
$('#auto').change(function() {
  if ($('#auto').prop("checked")) {
    $('.auto').prop('selected','true');
  }
});
$('.coord').click(function() {
  let xy = [];
  $('.coord option:selected').each(function() {
    xy.push($(this).val() === "");
  });
  if (xy.includes(false)) {
    $('#auto').prop('checked',false);
  }
});

/* GET URL INPUT */

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

var startJSON = function() {
  let obj = {};
  obj['url'] = $('#JSON').val();
  if (isURL(obj['url'])) {
    $.ajax({
      url     : obj['url'],
      dataType: 'json',
      success : function(data,textStatus,jqXHR) {
        window.success = true;
        window.data = data; // not kosher, but too lazy to wrap everything out of reach
        successJSON(window.data);
      },
      error   : function(jqXHR,textStatus,errorThrown) {
        errorJSON();
      }
    });
  } else {
    errorJSON();
  }
};

var successJSON = function(data) {

// populate labels drop-downs
  let labels = [];
  data.forEach(function(row) {
    labels = labels.concat(Object.keys(row));
  });
  labels = Array.from(new Set(labels)).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  if (JSON.stringify(window.wl) != JSON.stringify(labels)) {
    window.wl = labels;
    $('.coord option').not('.auto').remove();
    labels.forEach(function(l) {
      $('.coord').append(`
        <option value="${l}">${l}</option>
      `)
    });
  }

// choose the right labels
  let obj = {y:$('#coord-y').val(),x:$('#coord-x').val()};
  let coord = obj;

  if (obj.y == null) {
    let cy = ["y","lat","latitude"];
    for (let c in cy) {
      let i = labels.map(l => l.toLowerCase()).indexOf(cy[c]);
      if (i > -1) {coord['y'] = labels[i]; break;}
      else {coord['y'] = undefined;}
    }
  }

  if (obj.x == null) {
    let cx = ["x","lng","lon","longitude"];
    for (let c in cx) {
      let i = labels.map(l => l.toLowerCase()).indexOf(cx[c]);
      if (i > -1) {coord['x'] = labels[i]; break;}
      else {coord['x'] = undefined;}
    }
  }

// plot
  if (coord.x && coord.y) {

    map.eachLayer(function(layer) {
      if (layer != Stamen_TonerLite) {map.removeLayer(layer);}
    })

    try {
      let markers = [];

      data.forEach(function(pt) {
        markers.push(
          L.circle(
            [pt[coord.y],pt[coord.x]],
            radius = 1
          )
        );
      });

      let group = L.featureGroup(markers).addTo(map);
      map.fitBounds(group.getBounds());

      $('.message').prop('class','message');
      $('.message').text(`Successfully displayed ${markers.length} points.`);
    } catch(err) {errorJSON(type = 'coord');}
  } else {
    errorJSON(type = 'coord');
  }
};
var errorJSON = function(type = 'json') {
  if (type == 'coord') {
    $('.message').prop('class','message error');
    $('.message').text('Selected coordinate data is not numeric.')

    let panel = $('#more');
    if (panel.css('display') == "none") {
      open_panel($(this),panel);
    }
  } else {
    $('.message').prop('class','message error');
    $('.message').text('Enter a URL leading to valid spatial data.')
  }
};

/* on input change, try plotting */
$('#JSON').keydown(function(e) {
  if (e.keyCode == 13) {startJSON();}
});
$('#JSON').bind('input change', function(event){
  startJSON();
  $('#auto').prop('checked',true);
});
$('.coord').each(function() {
  let elem = $(this);
  let old = elem.val();
  elem.bind('change', function(event){
    if (elem.val() !== old && window.success) {
      successJSON(window.data);
    }
  });
})
$('#auto').bind('change',function(event){
  if (window.success) {
    successJSON(window.data);
  }
});


/*
https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-bike-crashes-snippet.json
*/
