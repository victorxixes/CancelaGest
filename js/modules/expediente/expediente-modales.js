/* ============================
   MODAL: EDITAR GASTO
============================ */

let gastoActual = null;

function abrirModalEditar(id) {
    gastoActual = id;
    const modal = document.getElementById("modalEditarGasto");
    if (modal) modal.style.display = "block";
}

function cerrarModalEditar() {
    const modal = document.getElementById("modalEditarGasto");
    if (modal) modal.style.display = "none";
}

function guardarEdicionGasto() {
    alert("Función de edición pendiente de integrar con backend.");
    cerrarModalEditar();
}

/* ============================
   MODAL: PAGAR GASTO
============================ */

function abrirModalPagar(id) {
    gastoActual = id;
    const modal = document.getElementById("modalPagarGasto");
    if (modal) modal.style.display = "block";
}

function cerrarModalPagar() {
    const modal = document.getElementById("modalPagarGasto");
    if (modal) modal.style.display = "none";
}

function guardarPago() {
    alert("Pago registrado correctamente.");
    cerrarModalPagar();
}

/* ============================
   MODAL: FACTURAR GASTO
============================ */

function abrirModalFacturar(id) {
    gastoActual = id;
    const modal = document.getElementById("modalFacturarGasto");
    if (modal) modal.style.display = "block";
}

function cerrarModalFacturar() {
    const modal = document.getElementById("modalFacturarGasto");
    if (modal) modal.style.display = "none";
}

function guardarFactura() {
    alert("Factura guardada correctamente.");
    cerrarModalFacturar();
}

/* ============================
   UTILIDADES GENERALES
============================ */

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
}
