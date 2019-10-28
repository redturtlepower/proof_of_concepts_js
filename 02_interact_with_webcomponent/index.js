function addWebcomponentFromScript(el){
    var el = document.createElement("leaflet-map");
    el.getElementsByTagName("leaflet-map")[0];
    console.log("got element? "+el)
    el.sayHello()
}