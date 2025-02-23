// script.js
console.log("Knowledge Graph Web App");

document.addEventListener('DOMContentLoaded', function() {
    var cy = cytoscape({
        container: document.getElementById('graph'),

        elements: [],

        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#9e7a68', /* Mocha Mousse */
                    'label': 'data(id)',
                    'color': 'white',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'width': '50px',
                    'height': '50px',
                    'border-width': 2,
                    'border-color': '#333',
                    'font-size': '12px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#9e7a68', /* Mocha Mousse */
                    'target-arrow-color': '#9e7a68', /* Mocha Mousse */
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                    'arrow-scale': 1.5
                }
            }
        ],

        layout: {
            name: 'cose',
            animate: true,
            animationDuration: 500,
            refresh: 20,
            fit: true,
            padding: 30
        }
    });

    window.addNode = function() {
        var nodeId = document.getElementById('nodeId').value.trim();
        if (!nodeId) {
            alert('Please enter a node ID');
            return;
        }
        if (cy.getElementById(nodeId).length > 0) {
            alert('Node already exists');
            return;
        }
        cy.add({
            data: { id: nodeId }
        });
        document.getElementById('nodeId').value = '';
        runLayout();
    };

    window.addEdge = function() {
        var sourceNode = document.getElementById('sourceNode').value.trim();
        var targetNode = document.getElementById('targetNode').value.trim();
        
        if (!sourceNode || !targetNode) {
            alert('Please enter both source and target nodes');
            return;
        }

        if (cy.getElementById(sourceNode).length === 0) {
            alert('Source node does not exist');
            return;
        }

        if (cy.getElementById(targetNode).length === 0) {
            alert('Target node does not exist');
            return;
        }

        var edgeId = sourceNode + '->' + targetNode;
        if (cy.getElementById(edgeId).length > 0) {
            alert('Edge already exists');
            return;
        }

        cy.add({
            data: { 
                id: edgeId,
                source: sourceNode,
                target: targetNode
            }
        });
        document.getElementById('sourceNode').value = '';
        document.getElementById('targetNode').value = '';
        runLayout();
    };

    window.saveGraph = function() {
        var graphData = cy.json();
        localStorage.setItem('graphData', JSON.stringify(graphData));
        alert('Graph saved!');
    };

    window.loadGraph = function() {
        var graphData = localStorage.getItem('graphData');
        if (graphData) {
            cy.json(JSON.parse(graphData));
            runLayout();
            alert('Graph loaded!');
        } else {
            alert('No graph data found!');
        }
    };

    window.toggleTheme = function() {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            cy.style()
                .selector('node')
                .style({
                    'background-color': '#f0e6d2',
                    'color': '#333',
                    'border-color': '#dddddd'
                })
                .selector('edge')
                .style({
                    'line-color': '#f0e6d2',
                    'target-arrow-color': '#f0e6d2'
                })
                .update();
        } else {
            cy.style()
                .selector('node')
                .style({
                    'background-color': '#9e7a68',
                    'color': 'white',
                    'border-color': '#333'
                })
                .selector('edge')
                .style({
                    'line-color': '#9e7a68',
                    'target-arrow-color': '#9e7a68'
                })
                .update();
        }
    };

    function runLayout() {
        var layout = cy.layout({
            name: 'cose',
            animate: true,
            animationDuration: 500,
            refresh: 20,
            fit: true,
            padding: 30
        });
        layout.run();
    }

    const toggleControlsButton = document.getElementById('toggle-controls');
    const controlsPanel = document.getElementById('controls-panel');

    toggleControlsButton.addEventListener('click', function() {
        controlsPanel.classList.toggle('open');
    });

    // Cookie banner logic
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccepted = localStorage.getItem('cookieAccepted');

    if (!cookieAccepted) {
        cookieBanner.style.display = 'flex';
    }

    window.acceptCookies = function() {
        localStorage.setItem('cookieAccepted', 'true');
        cookieBanner.style.display = 'none';
    };

    window.rejectCookies = function() {
        localStorage.setItem('cookieAccepted', 'false');
        cookieBanner.style.display = 'none';
    };
});
