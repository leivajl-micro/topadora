var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    trashcan: true,
    scrollbars: true,
    zoom: { controls: true, wheel: true }
});

function enviarCodigo() {
    var codigoPython = Blockly.Python.workspaceToCode(workspace);
    if (!codigoPython.trim()) return alert("El espacio está vacío.");
    
    var btn = document.getElementById("btnCargar");
    btn.innerText = "Cargando..."; 
    btn.disabled = true;

    // Se apunta a la IP fija del Access Point del ESP32
    fetch('http://192.168.4.1/', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: codigoPython
    })
    .then(res => {
        if(res.ok) alert("¡Código cargado con éxito! El robot se reiniciará.");
        else alert("Error: El robot respondió mal.");
    })
    .catch(err => {
        alert("Error de conexión. ¿Estás conectado al Wi-Fi 'Topadora-01'?");
        console.error(err);
    })
    .finally(() => { 
        btn.innerText = "🚀 Subir al Robot"; 
        btn.disabled = false; 
    });
}

function guardarXML() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToText(xml);
    var blob = new Blob([xmlText], {type: 'text/xml'});
    var a = document.createElement('a');
    a.download = 'proyecto_robot.xml';
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