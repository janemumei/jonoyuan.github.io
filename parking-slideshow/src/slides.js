chinatown.style = `(function(){
  let clr;
  switch (l.feature.properties.Name) {
    case "Chinatown North": clr = '#967272'; break;
    case "Chinatown":       clr = '#967272'; break;
    case "Commercial Core": clr = '#960000'; break;
    default:                clr = '#000000'
  }
  return({color: clr})
})()`;
chinatown.popup = '`<strong>${l.feature.properties.Name}</strong>`';
zoning.style = `(function(){
  let clr;
  switch (l.feature.properties.SHORT_CODE) {
    case "RSD" : clr = '#FFF5C4'; break;
    case "RSA" : clr = '#F8EE68'; break;
    case "RTA" : clr = '#CDB650'; break;
    case "RM"  : clr = '#FCB951'; break;
    case "RMX" : clr = '#E58425'; break;
    case "IRMX": clr = '#D4A579'; break;
    case "ICMX": clr = '#DCBDDC'; break;
    case "I"   : clr = '#894B9E'; break;
    case "SP"  : clr = '#008E46'; break;
    default: clr = '#000000'
  }
  switch (l.feature.properties.LONG_CODE) {
    case "CMX-1": case "CMX-2": case "CMX-2.5": clr = '#F16767'; break;
    case "CMX-3": case "CMX-4": case "CMX-5"  : clr = '#ED2124'; break;
  }
  return({color: clr});
})()`;
zoning.popup = '`<strong>${l.feature.properties.LONG_CODE}</strong>`';
offstreet.style = `((function(){
  let clr;
  switch (l.feature.properties.offstreet) {
    case "garage" : clr = '#654321'; break;
    default: clr = '#000000';
  }
  return({color: clr});
})())`;
offstreet.popup = '`${l.feature.properties.offstreet}`'
recs.popup = `(function(){
  let pop;
  switch (l.feature.properties.name) {
    case "race": pop = '<h2>Remove contractor parking on some blocks.</h2><p>Vehicles with a contractor placard can park all day on the entirety of Race Street</p>'; break;
    case "ppa" : pop = '<h2>Create a voucher program for Chinatown visitors.</h2><p>Like the program at Reading Terminal Market, parking at a PPA garage can be subsidized to avoid crowding of street parking.</p>'; break;
    case "10th": pop = '<h2>Increase street parking meter prices.</h2><p>More expensive street parking encourages turnover.</p>';break;
    case "9th" : pop = '<h2>Add free, 30 minute loading zones.</h2><p>Free but time-restricted loading zones will ease the burden on local businesses that need to load and unload.</p>';break;
  }
  return(pop);
})()`;
recs.style = "{color:'#FF00FF'}";

const slides = {
  init: {
    header: 'Parking in Chinatown',
    maxBounds:  {sw:[39.950963, -75.163611],ne:[39.962990, -75.148642]},
    minZoom: 15,
    maxZoom: 20,
    layers: {
  	  chinatown: {
  	    popup:chinatown.popup,
  	    style:chinatown.style,
        bounds: 1
  	  }
	  },
    html: `
      <div class="img" style="
        background-image:url(https://assets.visitphilly.com/wp-content/uploads/2017/12/Chinatown_arch2_G.Widman_2200x1237vp.jpg);
      "></div>
      <h2>Parking is increasingly difficult in Philadelphia's Chinatown.</h2>
      <p>In this neighborhood just north of Center City, residents, local businesses, and visitors alike struggle to find the space to park their vehicles.</p>
      <p>Monthly parking is $200, more than twice what most want to pay. Businesses lament that "the PPA writes tickets&mdash;<strong>no mercy on us</strong>." Others report cruising for up to 30 minutes to find street parking.</p>
      <p><strong>Click "Start slideshow" below to find out more.</strong></p>
    `
  },
  leaves: [{
    name: 'chinatown',
  	json: chinatown,
  	type: 'geoJSON'
  },{
    name: 'zoning',
  	json: zoning,
  	type: 'geoJSON'
  },{
    name: 'offstreet',
  	json: offstreet,
  	type: 'geoJSON'
  },{
    name: 'recs',
    json: recs,
    type: 'geoJSON'
  }],
  deck: [{
    id: "Land Use",
    html: `
      <h2>Chinatown's commercial core is one of Philadelphia's top attractions.</h2>
      <p>South of Vine Street, the neighborhood is zoned almost entirely CMX-4 or 5 (Commercial Mixed Use), reserved for the most intense land uses.</p>
      <table class="legend">
        <thead>Zoning Code</thead>
        <tbody>
        <tr><td style="background:#FFF5C4;">RSD</td><td>Residential Single-Family Detached</td></tr>
        <tr><td style="background:#F8EE68;">RSA</td><td> Residential Single-Family Attached</td></tr>
        <tr><td style="background:#CDB650;">RTA</td><td> Residential Two-Family Attached</td></tr>
        <tr><td style="background:#FCB951;">RM</td><td>Residential Multi-Family</td></tr>
        <tr><td style="background:#E58425;">RMX</td><td>Residential Mixed-Use</td></tr>
        <tr><td style="background:#F16767;">CMX<br>(1,2,2.5)</td><td>Neighborhood Commercial Mixed-Use</td></tr>
        <tr><td style="background:#ED2124;">CMX<br>(3,4,5)</td><td>Community and Center City Commercial Mixed-Use</td></tr>
        <tr><td style="background:#D4A579;">IRMX</td><td>Industrial Residential Mixed-Use</td></tr>
        <tr><td style="background:#DCBDDC;">ICMX</td><td>Industrial Commercial Mixed-Use</td></tr>
        <tr><td style="background:#894B9E;">I</td><td>Industrial</td></tr>
        <tr><td style="background:#008E46;">SP</td><td>Special Purpose</td></tr>
        </tbody>
      </table>
    `,
    layers: {
  	  chinatown: {
        bounds:1
  	  },
      zoning: {
        popup:zoning.popup,
        style:zoning.style
      }
  	}
  },{
    id: "Capacity",
    html: `
      <h1>Despite so much off-street parking available, parking in general is difficult.</h1>
      <p>
        Parking garages are often more expensive and considered more troublesome, desite having more flexible time limits.
      </p>
      <p>
        Some garages are managed or owned by the Philadelphia Parking Authority, which has an interest in managing street parking as well. Others are privately-owned and priced competitively.
      </p>
      <table class="legend">
        <thead>Off-street parking</thead>
        <tbody>
        <tr><td style="background:#654321;color:white">Garage</td><td>An underground or multi-story structure.</td></tr>
        <tr><td style="background:#555555;color:white">Surface</td><td>A surface-level parking lot. May not be available to the public.</td></tr>
        </tbody>
      </table>
    `,
    layers: {
  	  chinatown: {
        bounds:1
  	  },
      offstreet: {
        popup:offstreet.popup,
        style:offstreet.style
      }
  	}
  },{
    id: "Policy",
    name: "third slide",
    html: `
      <div class="img" style="
        background-image:url(https://bloximages.newyork1.vip.townnews.com/villanovan.com/content/tncms/assets/v3/editorial/8/c7/8c7dcade-00a8-11e8-ac1a-d7efe8a1cc2f/5a67e764620a5.image.jpg);
      "></div>
      <h2>What are some different strategies that Chinatown can take to manage parking?</h2>
      <p>Click into the map to explore some policy recommendations.</p>
    `,
    layers: {
  	  chinatown: {
  	  },
      recs: {
        popup:recs.popup,
        style:recs.style,
        bounds:1
      }
  	}
  }]
};
