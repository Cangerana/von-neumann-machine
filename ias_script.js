//==================================================================//
/*----------------------------- Global -----------------------------*/
//==================================================================//

instructions = []

memory = []

mbr = mar = imm = ir = pc = ro0 = ro1 = e = l = g = 0

registers = [0, 0, 0, 0, 0, 0, 0, 0]

code = {
    'hlt': '0x00',
    'ld': '0x01',
    'st': '0x02',
    'add': '0x03',
    'sub': '0x04',
    'mul': '0x05',
    'div': '0x06',
    'lsh': '0x07',
    'rsh': '0x08',
    'cmp': '0x09',
    'je': '0x0a',
    'jne': '0x0b',
    'jl': '0x0c',
    'jle': '0x0d',
    'jg': '0x0e',
    'jge': '0x0f',
    'jmp': '0x10',
    'movih': '0x11',
    'movil': '0x12',
    'addi': '0x13',
    'subi': '0x14',
    'muli': '0x15',
    'divi': '0x16',
    'movrr': '0x17',
}

var reg = {
    'r0': '0x00',
    'r1': '0x01',
    'r2': '0x02',
    'r3': '0x03',
    'r4': '0x04',
    'r5': '0x05',
    'r6': '0x06',
    'r7': '0x07',
}

//==================================================================//
/*---------------------- Instructions Scripts ----------------------*/
//==================================================================//

function creatOpcode() {
    var codeText = document.getElementById('code-text').value

    instructions = words(codeText)
    modify_opcode_fied()
}

function saveMemory() {
    var memoryInput = document.getElementsByTagName('input')

    for (var i = 0; i < instructions.length; i++) {
        memoryInput[i.toString()].value = instructions[i].toString(16)
        memory[i] = instructions[i]
    }
}

//==================================================================//
/*-------------------------- CPU Scripts --------------------------*/
//==================================================================//

function interpreter() {
    // Busca
    set_mbr(memory[pc])

    // Decodifica 
    aux = decodefy(mbr)

    set_ir(aux[0])
    set_ro0(aux[1])
    set_ro1(aux[2])

    set_pc(pc+1)
    // Execulta
    if (ir == 0){
        set_mar(aux[3])
        hlt()
    }
    else if (ir == 1){
        set_mar(aux[3])
        ld()
    }
    else if (ir == 2){
        set_mar(aux[3])
        st()
    }
    else if (ir == 3){
        set_mar(aux[3])
        add()
    }
    else if (ir == 4){
        set_mar(aux[3])
        sub()
    }
    else if (ir == 5){
        set_mar(aux[3])
        mul()
    }
    else if (ir == 6){
        set_mar(aux[3])
        div()
    }
    else if (ir == 7){
        set_imm(aux[3])
        lsh()
    }
    else if (ir == 8){
        set_imm(aux[3])
        rsh()
    }
    else if (ir == 9){
        set_mar(aux[3])
        cmp()
    }
    else if (ir == 10){
        set_mar(aux[3])
        je()
    }
    else if (ir == 11){
        set_mar(aux[3])
        jne()
    }
    else if (ir == 12){
        set_mar(aux[3])
        jl()
    }
    else if (ir == 13){
        set_mar(aux[3])
        jle()
    }
    else if (ir == 14){
        set_mar(aux[3])
        jg()
    }
    else if (ir == 15){
        set_mar(aux[3])
        jge()
    }
    else if (ir == 16){
        set_mar(aux[3])
        jmp()
    }
    else if (ir == 17){
        set_mar(aux[3])
        movih()
    }
    else if (ir == 18){
        set_imm(aux[3])
        movil()
    }
    else if (ir == 19){
        set_imm(aux[3])
        addi()
    }
    else if (ir == 20){
        set_imm(aux[3])
        subi()
    }
    else if (ir == 21){
        set_imm(aux[3])
        muli()
    }
    else if (ir == 22){
        set_imm(aux[3])
        divi()
    }
    else if (ir == 23){
        set_mar(aux[3])
        movrr()
    }
}

function hlt() {
    set_pc(0)
    set_ir(0)
    set_mbr(0)
    set_mar(0)
    set_imm(0)
    set_ro0(0)
    set_ro1(0)
    set_e(0)
    set_l(0)
    set_g(0)
    set_registers(0)
}

function ld() {
    set_mbr(memory[mar])
    set_register(ro0, mbr)
}

function st() {
    set_mbr(registers[ro0])
    set_memory(mar, mbr)
}

function add() {
   set_register(ro0, registers[ro0] + registers[ro1])
}

function sub() {
    set_register(ro0, registers[ro0] - registers[ro1])
}

function mul() {
    set_register(ro0, registers[ro0] * registers[ro1])
}

function div() {
    set_register(ro0, registers[ro0] / registers[ro1])
}

function lsh() {
    set_register(ro0, registers[ro0] << imm)
}

function rsh() {
    set_register(ro0, registers[ro0] >> imm)
}

function cmp() {
    if (registers[ro0] == registers[ro1]) {
        set_e(1)
    }else{
        set_e(0)
    }
    if (registers[ro0] < registers[ro1]){
        set_l(1)
    }else{
        set_l(0)
    }
    if (registers[ro0] > registers[ro1]){
        set_g(1)
    }else{
        set_g(0)
    } 
}

function je() {
    if (e == 1) {
        set_pc(mar)
    }
}

function jne() {
    if (e == 0) {
        set_pc(mar)
    }
}

function jl() {
    if (l == 1) {
        set_pc(mar)
    }
}

function jle() {
    if (e == 1 || l == 1) {
        set_pc(mar)
    } 
}

function jg() {
    if (g == 1) {
        set_pc(mar)
    }
}

function jge() {
    if (e == 1 || g == 1) {
        set_pc(mar)
    }
}

function jmp() {
    set_pc(mar)
}

function movih() {
    set_register(
        ro0,
        (((imm) & 0x0000ffff) << 16) & (registers[ro0] & 0x0000ffff)
    )
}

function movil() {
    set_register(
        ro0,
        (((imm) & 0x0000ffff)) & (registers[ro0] & 0x00000000)
    )
}

function addi() {
    set_register(ro0, (registers[ro0] + imm))
}

function subi() {
    set_register(ro0, (registers[ro0] - imm))
}

function muli() {
    set_register(ro0, (registers[ro0] * imm))
}

function divi() {
    set_register(ro0, (registers[ro0] / imm))
}

function movrr() {
    set_register(ro0, registers[ro1])
}

//==================================================================//
/*----------------------------- Tools -----------------------------*/
//==================================================================//

function words(text) {
    var lines = text.toLowerCase()
    lines = lines.split('\n')
    var hex = []

    for (var i = 0; i < lines.length; i++) {
        line = lines[i]
        line = line.replace(',', '')
        line = line.split(' ')

        hex.push(code_instruction(line))
    }
    return hex
}

function code_instruction(ins) {
    var cd = []
    var count = 0

    if (ins[0] == '') {
        ins[0] = 0
    }

    for (var j = 0; j < ins.length; j++) {
        if (ins[j] in code) {
            hex = ((code[ins[j]]) << 24) & '0xff000000'
        } else if (ins[j] in reg) {
            if (count == 0) {
                hex = ((reg[ins[j]]) << 21) & '0xe00000'
                count++
            } else if (count == 1) {
                hex = ((reg[ins[j]]) << 18) & '0x1c0000'
            }
        } else {
            hex = ('0x' + ins[j]) & '0x3ffff'
        }

        cd.push(hex)
    }

    hex = 0

    for (var i = 0; i < cd.length; i++) {
        hex = hex | cd[i]
    }

    return hex
}

function modify_opcode_fied() {
    document.getElementById('opcode-text').value = ''

    for (var i = 0; i < instructions.length; i++) {
        document.getElementById('opcode-text').value += (instructions[i]).toString(16) + '\n'
    }
}

function cleanMemory() {
    memory = []
    var memoryInput = document.getElementsByTagName('input')

    for (var i = 0; i < 100; i++) {
        memory.push(0)
        memoryInput[i].value = '00000000'
    }
}

function decodefy(word) {
    var code = []
    mask = ['0xff000000', '0xe00000', '0x1c0000', '0x3ffff']

    code.push(
        (word & mask[0]) >> 24
    )
    code.push(
        (word & mask[1]) >> 21
    )
    code.push(
        (word & mask[2]) >> 18
    )
    code.push(
        (word & mask[3])
    )

    return code
}

function change_memory() {
    if (event.target.value != ''){
        memory[event.target.id] = parseInt(event.target.value, 16)
    }else{
        set_memory(event.target.id, 0)
    }
}

function set_memory(index, value) {
    document.getElementById(index).value = ''
    document.getElementById(index).value = (value).toString(16)
    memory[index] = value
}

function set_mbr(value) {
    document.getElementById("mbr").innerHTML = value.toString(16)
    mbr = value
}

function set_mar(value) {
    document.getElementById("mar").innerHTML = value.toString(16)
    mar = value
}

function set_imm(value) {
    document.getElementById("imm").innerHTML = value.toString(16)
    imm = value
}

function set_ir(value) {
    document.getElementById("ir").innerHTML = value.toString(16)
    ir = value
}

function set_pc(value) {
    document.getElementById("pc").innerHTML = value.toString(16)
    pc = value
}

function set_ro0(value) {
    document.getElementById("ro0").innerHTML = value.toString(16)
    ro0 = value
}

function set_ro1(value) {
    document.getElementById("ro1").innerHTML = value.toString(16)
    ro1 = value
}

function set_registers(value) {
    for(var i = 0; i<8;i++){
        document.getElementById('reg-' + (i.toString())).innerHTML = value.toString(16)
        registers[i] = value
    }
}

function set_register(index, value) {
    document.getElementById('reg-' + index.toString()).innerHTML = value.toString(16)
    registers[index] = value
}

function set_e(value){
    document.getElementById("e").innerHTML = value.toString(16)
    e = value
}

function set_l(value){
    document.getElementById("l").innerHTML = value.toString(16)
    l = value
}

function set_g(value){
    document.getElementById("g").innerHTML = value.toString(16)
    g = value
}