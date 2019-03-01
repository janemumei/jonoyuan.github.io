(function() {

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

  var success;
  var data;

  var startJSON = function() {
    let obj = {};
    obj['url'] = $('#JSON').val();
    if (isURL(obj['url'])) {
      $.ajax({
        url     : `https://cors-anywhere.herokuapp.com/${obj['url']}`,
        dataType: 'json',
        success : function(data,textStatus,jqXHR) {
          success = true;
          data = data;
          successJSON(data);
        },
        error   : function(jqXHR,textStatus,errorThrown) {
          errorJSON();
        }
      });
    } else {
      errorJSON();
    }
  };

  var old_labels;

  var successJSON = function(data) {

  // parse data
    if (typeof data === "string") {
      try {data = JSON.parse();}
      catch(err) {errorJSON();return;}
    }
    // deal with geojson input by dropping geometry
    if (typeof data === "object" &&
        data[['type']] === "FeatureCollection") {
      data = data[['features']];
      data.forEach(function(row, index, array) {
        array[index] = row[['properties']];
      });
    } else {errorJSON();return;}

  // populate labels drop-downs
    let labels = [];
    data.forEach(function(row) {
      labels = labels.concat(Object.keys(row));
    });
    labels = Array.from(new Set(labels)).sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    if (JSON.stringify(old_labels) != JSON.stringify(labels)) {
      old_labels = labels;
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
      let cy = ["lat","latitude","lattitude","y"];
      for (let c in cy) {
        let i = labels.map(l => l.toLowerCase()).indexOf(cy[c]);
        if (i > -1) {coord['y'] = labels[i]; break;}
        else {coord['y'] = undefined;}
      }
    }

    if (obj.x == null) {
      let cx = ["lng","lon","longitude","x"];
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
      $('.message').text('Input coordinate data is not lat/long.')

      let panel = $('#more');
      if (panel.css('display') == "none") {
        open_panel($(this),panel);
      }
    } else {
      $('.message').prop('class','message error');
      $('.message').text('Input URL does not point to a JSON object.')
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
      if (elem.val() !== old && success) {
        successJSON(data);
      }
    });
  })
  $('#auto').bind('change',function(event){
    if (success) {
      successJSON(data);
    }
  });

} ());
