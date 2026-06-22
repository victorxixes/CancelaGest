/* ============================
   GESTIÓN DE GASTOS DEL EXPEDIENTE
============================ */

/* Abrir modal de nuevo gasto */
function abrirModalNuevoGasto() {
    const modal = document.getElementById("modalNuevoGasto");
    const iframe = document.getElementById("iframeNuevoGasto");

    iframe.src = "../expedientes_actividades/ficha_pagodocumentos.html";

    modal.classList.add("open");
}

function cerrarModalNuevoGasto(e) {
    if (e) e.stopPropagation();
    document.getElementById("modalNuevoGasto").classList.remove("open");
}

/* ============================
   AÑADIR GASTO DESDE ENCARGO AL NOTARIO
============================ */

function agregarGastoDesdeEncargo() {
    const tipo = getValue("tipoDocumento");
    const numero = getValue("escrituraDocumento");
    const cuantia = parseFloat(getValue("provision") || 0);
    const saldo = cuantia;

    const fila = `
        <tr class="gasto-row fade-in">
            <td>${numero}</td>
            <td>${tipo}</td>
            <td class="cuantia">${cuantia.toFixed(2)} €</td>
            <td class="saldo">${saldo.toFixed(2)} €</td>
            <td>
                <button class="btn btn-small btn-secondary" onclick="editarGasto(this)">✏ Editar</button>
                <button class="btn btn-small btn-red" onclick="eliminarGasto(this)">🗑 Eliminar</button>
                <button class="btn btn-small btn-blue" onclick="imputarGasto()">📌 Imputar</button>
                <button class="btn btn-small btn-green" onclick="facturarGasto()">🧾 Facturar</button>
            </td>
        </tr>
    `;

    document.getElementById("tbodyGastos").insertAdjacentHTML("beforeend", fila);

    recalcularTotales();
}

/* ============================
   ELIMINAR GASTO
============================ */

function eliminarGasto(btn) {
    const fila = btn.closest("tr");
    if (fila) fila.remove();
    recalcularTotales();
}

/* ============================
   EDITAR GASTO (MODAL)
============================ */

let gastoActual = null;

function abrirModalEditar(id) {
    gastoActual = id;
    document.getElementById("modalEditarGasto").style.display = "block";
}

function cerrarModalEditar() {
    document.getElementById("modalEditarGasto").style.display = "none";
}

function guardarEdicionGasto() {
    alert("Función de edición pendiente de integrar con backend.");
    cerrarModalEditar();
}

/* ============================
   PAGAR GASTO (MODAL)
============================ */

function abrirModalPagar(id) {
    gastoActual = id;
    document.getElementById("modalPagarGasto").style.display = "block";
}

function cerrarModalPagar() {
    document.getElementById("modalPagarGasto").style.display = "none";
}

function guardarPago() {
    alert("Pago registrado correctamente.");
    cerrarModalPagar();
}

/* ============================
   FACTURAR GASTO (MODAL)
============================ */

function abrirModalFacturar(id) {
    gastoActual = id;
    document.getElementById("modalFacturarGasto").style.display = "block";
}

function cerrarModalFacturar() {
    document.getElementById("modalFacturarGasto").style.display = "none";
}

function guardarFactura() {
    alert("Factura guardada correctamente.");
    cerrarModalFacturar();
}

/* ============================
   IMPUTAR / FACTURAR (NAVEGACIÓN)
============================ */

function imputarGasto() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_imputacion.html";
}

function facturarGasto() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_liquidacionycierre.html";
}

/* ============================
   RECÁLCULO DE TOTALES
============================ */

function recalcularTotales() {
    let totalCuantia = 0;
    let totalSaldo = 0;

    document.querySelectorAll("#tbodyGastos tr").forEach(tr => {
        const cuantia = parseFloat(tr.children[2].textContent.replace("€", "")) || 0;
        const saldo = parseFloat(tr.children[3].textContent.replace("€", "")) || 0;

        totalCuantia += cuantia;
        totalSaldo += saldo;
    });

    document.getElementById("totalCuantia").textContent = totalCuantia.toFixed(2) + " €";
    document.getElementById("totalSaldo").textContent = totalSaldo.toFixed(2) + " €";
}

/* ============================
   HELPERS
============================ */

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
}

/* ============================
   MODAL PPAD
============================ */

function abrirModalPPAD() {
    document.getElementById("modalPPAD").classList.add("open");
}

function cerrarModalPPAD(e) {
    if (e) e.stopPropagation();
    document.getElementById("modalPPAD").classList.remove("open");
}

function guardarPPAD() {
    const fecha = document.getElementById("ppadFecha").value;
    const concepto = document.getElementById("ppadConcepto").value.trim();
    const importe = document.getElementById("ppadImporte").value;

    if (!fecha || !concepto || !importe) {
        alert("Debes rellenar todos los campos.");
        return;
    }

    const tbody = document.getElementById("tbodyGastos");

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>—</td>
        <td>PPAD</td>
        <td>—</td>
        <td>${concepto}</td>
        <td>${importe} €</td>
        <td>—</td>
        <td>${importe} €</td>
        <td>
            <button class="btn btn-green btn-small" onclick="editarGasto(this)">✏ Editar</button>
            <button class="btn btn-blue btn-small" onclick="abrirModalPagar()">💳 Pagar</button>
            <button class="btn btn-purple btn-small" onclick="abrirModalFacturar()">🧾 Facturar</button>
        </td>
    `;

    tbody.appendChild(tr);

    cerrarModalPPAD();
    recalcularTotales();
}

/* ============================
   GUARDAR NUEVO GASTO (MODAL)
============================ */

function guardarNuevoGasto() {
    const doc = document.getElementById("gastoDocumento").value;
    const tipo = document.getElementById("gastoTipo").value;
    const cuantia = document.getElementById("gastoCuantia").value;
    const concepto = document.getElementById("gastoConcepto").value;
    const importe = document.getElementById("gastoImporte").value;
    const pdf = document.getElementById("gastoPDF").files[0];

    if (!tipo || !concepto || !importe) {
        alert("Debes rellenar los campos obligatorios.");
        return;
    }

    const tbody = document.getElementById("tbodyGastos");

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${doc || "—"}</td>
        <td>${tipo}</td>
        <td>${cuantia || "—"}</td>
        <td>${concepto}</td>
        <td>${importe} €</td>
        <td>${pdf ? pdf.name : "—"}</td>
        <td>${importe} €</td>
        <td>
            <button class="btn btn-green btn-small" onclick="editarGasto(this)">✏ Editar</button>
            <button class="btn btn-blue btn-small" onclick="abrirModalPagar()">💳 Pagar</button>
            <button class="btn btn-purple btn-small" onclick="abrirModalFacturar()">🧾 Facturar</button>
        </td>
    `;

    tbody.appendChild(tr);

    cerrarModalNuevoGasto();
    recalcularTotales();
}
