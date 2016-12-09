// var name = "testNode1";
// var currDate = new Date().toLocaleString();
// var src = "http://www.bigbiz.com/bigbiz/icons/ultimate/Comic/Comic114.gif";
// var parents = ["58368d42e74e7000d4692438"];
// var sourceTree = "58368d42e74e7000d4692439";
// $.ajax({
//   method: "POST",
//   url: "/api/node",
//   data: { name: name, date: currDate, src: src, parents: parents, sourceTree: sourceTree }
// })
//   .done(function( msg ) {
//     console.log("saved success" + msg);
//     alert( "Data Saved: " + msg );
//   })
//   .fail(function(e) {
//     console.log(e);
//   });

// $.ajax({
//       type: 'POST',
//       data: { name: name, date: currDate, src: src },
//       //contentType: 'text',
//       url: '/api/tree',
//       success: function(data) {
//          console.log("saved success" + data);
//       }
//     });

// var request = new XMLHttpRequest();
// request.open('POST', '/api/tree', true);
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// request.send(data);

//
// var name = "firstParent";
// var currDate = new Date().toLocaleString();
// var src = "http://www.bigbiz.com/bigbiz/icons/ultimate/Comic/Comic122.gif";
//
// $.ajax({
//   method: "POST",
//   url: "/api/tree",
//   data: { name: name, date: currDate, src: src }
// })
//   .done(function( msg ) {
//     console.log("saved success" + msg);
//     alert( "Data Saved: " + msg );
//   })
//   .fail(function(e) {
//     console.log(e);
//   });

// $.ajax({
//  method: "GET",
//  url: "/api/node",
//  data: { id: "583ecc4102820607fc02f8fb" }
// })
//  .done(function( msg ) {
//    console.log("node retrieved" + msg);
//    console.log(JSON.stringify(msg));
//  })
//  .fail(function(e) {
//    console.log(e);
//  });

//on load, get the default tree
var treeData = [];
$.ajax({
 method: "GET",
 url: "/api/tree",
 data: { id: "58368d42e74e7000d4692439" }
})
 .done(function( msg ) {
   console.log("data retrieved" + msg);
   console.log(JSON.stringify(msg));
   treeData = msg;

   root = treeData[0];
   root.x0 = height / 2;
   root.y0 = 0;

   update(root);

   d3.select(self.frameElement).style("height", "500px");

 })
 .fail(function(e) {
   console.log(e);
 });


// treeData = [
//   {
//     "name": "Top Parent",
//     "parent": "null",
//     "children": [
//       {
//         "name": "Level 2: A",
//         "parent": "Top Parent",
//         "children": [
//           {
//             "name": "Son of A",
//             "parent": "Level 2: A",
//             "children": [
//               {
//                 "name": "Son of A1",
//                 //"parent": "Son of A"
//               },
//               {
//                 "name": "Daughter of A1",
//                 //"parent": "Son of A",
//                 "icon": "http://www.bigbiz.com/bigbiz/icons/ultimate/Comic/Comic122.gif"
//               }
//             ]
//           },
//           {
//             "name": "Daughter of A",
//             "parent": "Level 2: A",
//             "icon": "http://www.bigbiz.com/bigbiz/icons/ultimate/Comic/Comic122.gif"
//           }
//         ]
//       },
//       {
//         "name": "Level 2: B",
//         "parent": "Top Level",
//         "icon": "http://www.bigbiz.com/bigbiz/icons/ultimate/Comic/Comic114.gif"
//       }
//     ]
//   }
// ];



// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click)														//added mouseover function
    .on("mouseover", function(d) {
          var g = d3.select(this); // The node
          // The class is used to remove the additional text later
          var info = g.append('text')
             .classed('info', true)
             .attr('x', 20)
             .attr('y', 10)
             .text('More info');
      })
      .on("mouseout", function() {
          // Remove the info text on mouse out.
          d3.select(this).select('text.info').remove()
        });
    ;

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("image")
      .attr("xlink:href", function(d) { return d.icon; })
      .attr("x", "10px")
      .attr("y", "10px")
      .attr("width", "50px")
      .attr("height", "50px");

  // enable/disable name printing
  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {

  document.getElementById('selectedNode').innerHTML = d.name;

  d3.selectAll(".selected")
    .classed('selected',false)
    .attr("fill", "black");

 d3.select(this)
    .classed('selected',true)
    .attr("fill", "red");

  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}
