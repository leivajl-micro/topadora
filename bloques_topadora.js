Blockly.Blocks['topadora_motor'] = {
    init: function() {
        this.appendValueInput("VELOCIDAD")
            .setCheck("Number")
            .appendField("⚙️ Motor")
            .appendField(new Blockly.FieldDropdown([["IZQ","izq"], ["DER","der"]]), "MOTOR")
            .appendField("PWM:");
        this.appendDummyInput().appendField("%");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
    }
};

Blockly.Blocks['topadora_mover_pala'] = {
    init: function() {
        this.appendValueInput("POSICION").setCheck("Number").appendField("🏗️ Pala a");
        this.appendDummyInput().appendField("%");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
    }
};

Blockly.Blocks['topadora_mover_pinza'] = {
    init: function() {
        this.appendValueInput("POSICION").setCheck("Number").appendField("🗜️ Pinza a");
        this.appendDummyInput().appendField("%");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
    }
};

Blockly.Blocks['topadora_led'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("💡 LED N°")
            .appendField(new Blockly.FieldNumber(0, 0, 3, 1), "INDICE");
        this.appendValueInput("R").setCheck("Number").appendField("R:");
        this.appendValueInput("G").setCheck("Number").appendField("G:");
        this.appendValueInput("B").setCheck("Number").appendField("B:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
};

Blockly.Blocks['topadora_tono'] = {
    init: function() {
        this.appendValueInput("FRECUENCIA").setCheck("Number").appendField("🎵 Tono");
        this.appendValueInput("DURACION").setCheck("Number").appendField("Hz por");
        this.appendDummyInput().appendField("ms");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
    }
};

Blockly.Blocks['topadora_esperar'] = {
    init: function() {
        this.appendValueInput("SEGUNDOS").setCheck("Number").appendField("⏳ Delay");
        this.appendDummyInput().appendField("s");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
    }
};

Blockly.Blocks['topadora_leer_linea'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("👁️ Línea")
            .appendField(new Blockly.FieldDropdown([["IZQ","izq"], ["DER","der"]]), "SENSOR");
        this.setOutput(true, "Number");
        this.setColour(65);
    }
};

Blockly.Blocks['topadora_leer_distancia'] = {
    init: function() {
        this.appendDummyInput().appendField("📏 Distancia Láser");
        this.setOutput(true, "Number");
        this.setColour(65);
    }
};

Blockly.Blocks['topadora_high_low'] = {
    init: function() {
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([["HIGH","1"], ["LOW","0"]]), "ESTADO");
        this.setOutput(true, "Number");
        this.setColour(210);
    }
};

// --- GENERADORES PYTHON ---

Blockly.Python.forBlock['topadora_motor'] = function(block, generator) {
    var motor = block.getFieldValue('MOTOR');
    var vel = generator.valueToCode(block, 'VELOCIDAD', Blockly.Python.ORDER_NONE) || '0';
    generator.definitions_['import_robot'] = 'import robot';
    return 'robot.motor_' + motor + '(' + vel + ')\n';
};

Blockly.Python.forBlock['topadora_mover_pala'] = function(block, generator) {
    var pos = generator.valueToCode(block, 'POSICION', Blockly.Python.ORDER_NONE) || '0';
    generator.definitions_['import_robot'] = 'import robot';
    return 'robot.mover_pala(' + pos + ')\n';
};

Blockly.Python.forBlock['topadora_mover_pinza'] = function(block, generator) {
    var pos = generator.valueToCode(block, 'POSICION', Blockly.Python.ORDER_NONE) || '0';
    generator.definitions_['import_robot'] = 'import robot';
    return 'robot.mover_pinza(' + pos + ')\n';
};

Blockly.Python.forBlock['topadora_led'] = function(block, generator) {
    var i = block.getFieldValue('INDICE');
    var r = generator.valueToCode(block, 'R', Blockly.Python.ORDER_NONE) || '0';
    var g = generator.valueToCode(block, 'G', Blockly.Python.ORDER_NONE) || '0';
    var b = generator.valueToCode(block, 'B', Blockly.Python.ORDER_NONE) || '0';
    generator.definitions_['import_robot'] = 'import robot';
    return 'robot.led(' + i + ', ' + r + ', ' + g + ', ' + b + ')\n';
};

Blockly.Python.forBlock['topadora_tono'] = function(block, generator) {
    var freq = generator.valueToCode(block, 'FRECUENCIA', Blockly.Python.ORDER_NONE) || '440';
    var dur = generator.valueToCode(block, 'DURACION', Blockly.Python.ORDER_NONE) || '500';
    generator.definitions_['import_robot'] = 'import robot';
    return 'robot.tocar_tono(' + freq + ', ' + dur + ')\n';
};

Blockly.Python.forBlock['topadora_esperar'] = function(block, generator) {
    var seg = generator.valueToCode(block, 'SEGUNDOS', Blockly.Python.ORDER_NONE) || '1';
    generator.definitions_['import_robot'] = 'import robot';
    return 'robot.esperar(' + seg + ')\n';
};

Blockly.Python.forBlock['topadora_leer_linea'] = function(block, generator) {
    var sensor = block.getFieldValue('SENSOR');
    generator.definitions_['import_robot'] = 'import robot';
    var code = 'robot.leer_linea_' + sensor + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['topadora_leer_distancia'] = function(block, generator) {
    generator.definitions_['import_robot'] = 'import robot';
    return ['robot.leer_distancia()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['topadora_high_low'] = function(block, generator) {
    var estado = block.getFieldValue('ESTADO');
    return [estado, Blockly.Python.ORDER_ATOMIC];
};