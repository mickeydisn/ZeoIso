var klay;
(function (klay) {
  klay.d3adapter = function() {
    return init("adapter");
  };
  function init(type) {
    var mthis = this;
    var d3klay = {},
    // dispatch = d3.dispatch("finish"),
    // containers
    nodes = [],
    links = [],
    graph = {}, // internal (hierarchical graph)
    ports = function(n) {
      // by default the 'ports' field
      return n.ports || [];
    },
    labels = function(n) {
      return n.labels || [];
    },
    options = {},
    // dimensions
    width = 0,
    height = 0,
    defaultNodeSize = [10, 10],
    defaultPortSize = [4, 4],
    transformGroup,
    // kgraph properties that shall be copied
    kgraphKeys = [
      'x', 'y',
      'width', 'height',
      'sourcePoint', 'targetPoint',
      'properties'
    ].reduce(function(p, c) {p[c] = 1; return p;}, {}),
    // a function applied after each layout run
    applyLayout = function() {},
    // location of the klay.js script
    layouterScript = function() {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].src.indexOf("klay.js") > -1) {
          return scripts[i].src;
        }
      }
      throw "klay.js library wasn't loaded!";
    },
    // the layouter instance
    layouter;
    
    // try to use a worker?
    if ('true' === 'true' && typeof(Worker) !== 'undefined') {
      var worker = new Worker(layouterScript());
      layouter = {
        layout: function(data) {
          worker.postMessage({
            graph: data.graph,
            options: data.options
          });
        }
      };
      worker.addEventListener('message', function (e) {
        graph = e.data;
        applyLayout(d3klay, graph);
      }, false);
    } 

    /**
     * Setting the available area, the
     * positions of the layouted graph
     * are currently scaled down.
     */
    d3klay.size = function(size) {
      if (!arguments.length) return [width, height];
      width = size[0];
      height = size[1];
      return d3klay;
    };
    /**
     * Sets the group used to perform 'zoomToFit'.
     */
    d3klay.transformGroup = function(g) {
      if (!arguments.length) return transformGroup;
      transformGroup = g;
      return d3klay;
    };
    d3klay.options = function(opts) {
      if (!arguments.length) return options;
      options = opts;
      return d3klay;
    };
    /**
     * D3 Adaptor
     * Allows to use d3 in its known fashion.
     *   Ids are assigned to the specified
     *   nodes and links and a top level node
     *   is constructed.
     */
    if (type === "adapter") {
      /**
       * The nodes of the graph.
       */
      d3klay.nodes = function(ns) {
        if (!arguments.length) return nodes;
        nodes = ns;
        return d3klay;
      };
      /**
       * Accessor function to a node's ports.
       */
      d3klay.ports = function(ps) {
        if (!arguments.length) return ports;
        ports = ps;
        return d3klay;
      };
      /**
       * The links of the graph.
       */
      d3klay.links = function(es) {
        if (!arguments.length) return links;
        links = es;
        return d3klay;
      };
      d3klay.defaultNodeSize = function(dns) {
        if (!arguments.length) return defaultNodeSize;
        defaultNodeSize = dns;
        return d3klay;
      };
      d3klay.defaultPortSize = function(dps) {
        if (!arguments.length) return defaultPortSize;
        defaultPortSize = dps;
        return d3klay;
      };
      /**
       * Start the layout process.
       */
      d3klay.start = function() {
        // klay expects string identifiers
        nodes.forEach(function(n, i) {
          n.width = n.width || defaultNodeSize[0];
          n.height = n.height || defaultNodeSize[1];
          n.id = "" + (n.id || i);
          // ports
          n.ports = ports(n);
          n.ports.forEach(function(p) {
            p.width = p.width || defaultPortSize[0];
            p.height = p.height || defaultPortSize[1];
          });
          n.labels = labels(n);
        });
        links.forEach(function(l, i) {
          l.id = "" + (l.id || (i + nodes.length));
          l.source = "" + l.source;
          l.target = "" + l.target;
        });
        // alias applyLayout method
        applyLayout = d3_applyLayout;
        // start the layouter
        layouter.layout({
          "graph": {
            id: "root",
            children: nodes,
            edges: links
          },
          "options": options,
          "success": function(kgraph) {
            graph = kgraph;
            applyLayout(kgraph);
          },
          "error": function(e) {
            console.error(e);
          }
        });
        return d3klay;
      };
      /**
       * Apply layout for d3 style.
       * Copies properties of the layouted graph
       * back to the original nodes and links.
       */
      var d3_applyLayout = function(obj, kgraph) {
        if (kgraph) {
          zoomToFit(kgraph);
          // assign coordinates to nodes
          kgraph.children.forEach(function(n) {
            var d3node = nodes[parseInt(n.id)];
            copyProps(n, d3node);
            (n.ports || []).forEach(function(p, i) {
              copyProps(p, d3node.ports[i]);
            });
            (n.labels || []).forEach(function(l, i) {
              copyProps(l, d3node.labels[i]);
            });
          });
          // edges
          kgraph.edges.forEach(function(e) {
            var l = links[parseInt(e.id) - nodes.length];
            copyProps(e, l);
            copyProps(e.source, l.source);
  	        copyProps(e.target, l.target);
            // make sure the bendpoint array is valid
            l.bendPoints = e.bendPoints || [];
          });
        }
        function copyProps(src, tgt, copyKeys) {
          var keys = kgraphKeys;
          if (copyKeys) {
            keys = copyKeys.reduce(function (p, c) {p[c] = 1; return p;}, {});
          }
          for (var k in src) {
            if (keys[k]) {
              tgt[k] = src[k];
            }
          }
        }
        // invoke the 'finish' event
        obj.finish({graph: kgraph});
        // dispatch.finish({graph: kgraph});
      };
    }
    /**
     * If a top level transform group is specified,
     * we set the scale such that the available
     * space is used to its maximum.
     */
    function zoomToFit(kgraph) {
      // scale everything so that it fits the specified size
      var scale = width / kgraph.width || 1;
      var sh = height / kgraph.height || 1;
      if (sh < scale) {
        scale = sh;
      }
      // if a transformation group was specified we
      // perform a 'zoomToFit'
      if (transformGroup) {
        transformGroup.attr("transform", "scale(" + scale + ")");
      }
    }
    // return the layouter object
    // return d3.rebind(d3klay, dispatch, "on");
    return d3klay;
  }
  if (typeof module === "object" && module.exports) {
    module.exports = klay;
  }
  return klay;
})(klay || (klay = {}));