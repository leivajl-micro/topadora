var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    trashcan: true,
    scrollbars: true,
    zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }
});

function enviarCodigo() {
    var codigoPython = Blockly.Python.workspaceToCode(workspace);
    if (!codigoPython.trim()) {
        alert("El espacio de trabajo está vacío.");
        return;
    }
    
    var btn = document.getElementById("btnCargar");
    btn.innerText = "Cargando..."; 
    btn.disabled = true;

    fetch('http://192.168.4.1/', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: codigoPython
    })
    .then(response => {
        if(response.ok) {
            alert("¡Programa cargado con éxito! El robot se reiniciará.");
        } else {
            alert("Error: El robot respondió mal.");
        }
    })
    .catch(error => {
        alert("Error de conexión. Verifica estar conectado a la red Wi-Fi 'Topadora-01'.");
        console.error(error);
    })
    .finally(() => { 
        btn.innerText = " Subir al Robot"; 
        btn.disabled = false; 
    });
}

function guardarXML() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToText(xml);
    var blob = new Blob([xmlText], {type: 'text/xml'});
    var a = document.createElement('a');
    a.download = 'mi_proyecto_topadora.xml';
    a.href = URL.createObjectURL(blob);
    a.click();
}

function cargarXML(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var xmlText = e.target.result;
        var xml = Blockly.utils.xml.textToDom(xmlText);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
        document.getElementById('fileInput').value = '';
    };
    reader.readAsText(file);
}
