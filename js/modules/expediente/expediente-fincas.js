/* ============================
   MODAL FINCAS
============================ */

function abrirModalFincas() {
    const modal = document.getElementById("modalFincas");
    if (!modal) return;
    modal.classList.add("open");
}

function cerrarModalFincas(e) {
    const modal = document.getElementById("modalFincas");
    if (!modal) return;

    if (!e || e.target.id === "modalFincas" || e.target.classList.contains("modal-close")) {
        modal.classList.remove("open");
    }
}

/* ============================
   GUARDAR FINCA
============================ */

function guardarFinca() {

    const finca = {
        num:        getValue("finca_num"),
        seccion:    getValue("finca_seccion"),
        cru:        getValue("finca_cru"),
        provincia:  getValue("finca_provincia"),
        poblacion:  getValue("finca_poblacion"),
        registro:   getValue("finca_registro"),
        capital:    getValue("finca_capital"),
        inscripcion:getValue("finca_inscripcion"),
        contrato:   getValue("finca_contrato"),
        fecha:      getValue("finca_fecha"),
        subrogado:  getValue("finca_subrogado"),
        entidad:    getValue("finca_entidad")
    };

    const tbody = document.getElementById("tablaFincas");
    if (!tbody) return;

    tbody.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${finca.fecha}</td>
            <td>${finca.num}</td>
            <td>${finca.provincia}</td>
            <td>${finca.poblacion}</td>
            <td>${finca.registro}</td>
            <td>${finca.capital}</td>
        </tr>
    `);

    cerrarModalFincas();
}

/* ============================
   HELPERS
============================ */

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
}
