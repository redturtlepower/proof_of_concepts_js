(function(){
const template = document.createElement('template');
template.innerHTML = `
<style>
        .map-root{
            border: 1px solid black;
            height: 180px;
            width: 320px;
        }
</style>
<link rel="stylesheet" type="text/css" href="./leaflet.css">
<div id="map" class="map-root"></div>
`;

class CustomLeafletMapWebComponent extends HTMLElement {
    constructor() {
        super(); 
        console.log('CustomLeafletMapWebComponent constructed!');
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadDependencies();
    }

    connectedCallback() {
        console.log('CustomLeafletMapWebComponent connected!');

        const mapRoot = this._shadowRoot.querySelector(".map-root")

        // timeout to avoid error "L is not defined"
        setTimeout(function(){

            // initialize the map
            var map = L.map(mapRoot).setView([42.35, -71.08], 13);

            // load a tile layer
            L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
              {
                attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
                maxZoom: 17,
                minZoom: 9
              }).addTo(map);
        }, 100);
    }

    disconnectedCallback() {
        console.log('CustomLeafletMapWebComponent disconnected!');
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log(`Attribute: ${name} changed!`);
    }

    adoptedCallback() {
        console.log('CustomLeafletMapWebComponent adopted!');
    }
    
    loadCssFile(cssfile){
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssfile
        var head = document.getElementsByTagName("head")[0]
        this._shadowRoot.appendChild(link)
    }
    loadScriptFile(scriptfile){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptfile
        //var head = document.getElementsByTagName("head")[0]
        this._shadowRoot.appendChild(script)
    }
    loadDependencies(){
      this.loadScriptFile("./leaflet.js")
    }
    on(strEvent, callback){
        console.log("saving callback...")
    }

    sayHello(){
        console.log("Hello from webcomponent 'CustomLeafletMapWebComponent'!");
    }
}

// Must call "window.customElements.define" for a HTMLelement, 
// else "uncaught type error: illegal constructor"!
window.customElements.define('leaflet-map', CustomLeafletMapWebComponent); 

})()