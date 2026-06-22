const PAGE_SIZE = 10;

let expedientesOriginal = [];
let expedientesFiltrados = [];
let currentPage = 1;

let sortColumn = null;
let sortDirection = 1; // 1 = asc, -1 = desc

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    cargarExpedientesDesdeStorage();
    inicializarEventosPaginacion();
    inicializarFiltroBusqueda();
    inicializarOrdenacionColumnas();
    actualizarKPIs();
    renderTabla();
});

// ===============================
// CARGA DE DATOS
// ===============================
function cargarExpedientesDesdeStorage() {
    const datos = JSON.parse(localStorage.getItem("expedientes_importados")) || [];
    expedientesOriginal = datos;
    expedientesFiltrados = [...expedientesOriginal];
    currentPage = 1;
}

// ===============================
// RENDER TABLA
// ===============================
function renderTabla() {
    const tbody = document.getElementById("tablaDatos");
    const info = document.getElementById("paginationInfo");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (!expedientesFiltrados.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="22" style="text-align:center; opacity:0.7;">
                    No hay expedientes importados.
                </td>
            </tr>
        `;
        if (info) info.textContent = "";
        return;
    }

    const total = expedientesFiltrados.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    if (currentPage > totalPages) currentPage = totalPages || 1;

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageItems = expedientesFiltrados.slice(start, end);

    pageItems.forEach(exp => {

        // ============================
        // BADGE DE DÍAS
        // ============================
        let dias = "";
        let badgeDias = "";

        if (exp.FECHAALTA) {
            const fechaAlta = new Date(exp.FECHAALTA);
            const hoy = new Date();
            dias = Math.floor((hoy - fechaAlta) / (1000 * 60 * 60 * 24));

            if (dias < 10) badgeDias = `<span class="badge-dias badge-green">${dias}</span>`;
            else if (dias <= 20) badgeDias = `<span class="badge-dias badge-yellow">${dias}</span>`;
            else badgeDias = `<span class="badge-dias badge-red">${dias}</span>`;
        }

        // ============================
        // CHIPS ESTADOEXPEDIENTE
        // ============================
        let chipEstado = "";
        switch (exp.ESTADOEXPEDIENTE) {
            case "ABIERTO": chipEstado = `<span class="chip chip-info">ABIERTO</span>`; break;
            case "CERRADO": chipEstado = `<span class="chip chip-ok">CERRADO</span>`; break;
            case "PENDIENTE": chipEstado = `<span class="chip chip-warn">PENDIENTE</span>`; break;
            default: chipEstado = `<span class="chip chip-info">${exp.ESTADOEXPEDIENTE || ""}</span>`;
        }

        // ============================
        // CHIP SOL
        // ============================
        let chipSol = "";
        if (exp.SOL === "OK") chipSol = `<span class="chip chip-ok">OK</span>`;
        else if (exp.SOL === "ERROR") chipSol = `<span class="chip chip-error">ERROR</span>`;
        else chipSol = `<span class="chip chip-info">${exp.SOL || ""}</span>`;

        // ============================
        // CHIP CERT
        // ============================
        let chipCert = "";
        if (exp.CERT === "OK") chipCert = `<span class="chip chip-ok">OK</span>`;
        else if (exp.CERT === "ERROR") chipCert = `<span class="chip chip-error">ERROR</span>`;
        else chipCert = `<span class="chip chip-info">${exp.CERT || ""}</span>`;

        // ============================
        // CHIP NS
        // ============================
        let chipNS = "";
        if (exp.NS === "OK") chipNS = `<span class="chip chip-ok">OK</span>`;
        else if (exp.NS === "ERROR") chipNS = `<span class="chip chip-error">ERROR</span>`;
        else chipNS = `<span class="chip chip-info">${exp.NS || ""}</span>`;

        // ============================
        // RENDER FILA
        // ============================
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>
                <span class="expediente-link" onclick="abrirExpediente('${exp.IDEXPEDIENTE}')">
                    ${exp.IDEXPEDIENTE || ""}
                </span>
            </td>

            <td>${chipEstado}</td>
            <td>${exp.FECHAALTA || ""}</td>
            <td>${exp.NOMBRESOLICITANTE || ""}</td>
            <td>${exp.PRODUCTOGTG || ""}</td>
            <td>${exp.ACTIVIDADACTUAL || ""}</td>
            <td>${exp.ESTADOACTIVIDAD || ""}</td>
            <td>${exp.TIPOPROVISION || ""}</td>
            <td>${exp.CONTRATO || ""}</td>
            <td>${exp.FINCA || ""}</td>
            <td>${exp.CAPITAL || ""}</td>
            <td>${exp.NOMBRESOLICITANTE || ""}</td>
            <td>${exp.NIFSOLICITANTE || ""}</td>
            <td>${exp.NOMBRENOTARIO || ""}</td>
            <td>${exp.NIFNOTARIO || ""}</td>

            <td>${chipSol}</td>
            <td>${chipCert}</td>
            <td>${chipNS}</td>
            <td>${badgeDias}</td>

            <td>${exp.FECHA_ULTIMA_ACCION || ""}</td>
            <td>${exp.ULTIMA_ACCION || ""}</td>
        `;

        tbody.appendChild(tr);
    });

    if (info) {
        info.textContent = `Mostrando ${start + 1}–${Math.min(end, total)} de ${total} expedientes`;
    }

    actualizarEstadoBotonesPaginacion(totalPages);
}

// ===============================
// KPIs
// ===============================
function actualizarKPIs() {
    const total = expedientesOriginal.length;

    const certificadosErr = expedientesOriginal.filter(e => e.CERT === "ERROR").length;
    const notasErr = expedientesOriginal.filter(e => e.NS === "ERROR").length;
    const secundarias = expedientesOriginal.filter(e => e.SECUNDARIA === "PENDIENTE").length;

    const k1 = document.getElementById("kpiCertificados");
    const k2 = document.getElementById("kpiNotas");
    const k3 = document.getElementById("kpiSecundarias");
    const k4 = document.getElementById("kpiTotal");

    if (k1) k1.textContent = certificadosErr;
    if (k2) k2.textContent = notasErr;
    if (k3) k3.textContent = secundarias;
    if (k4) k4.textContent = total;
}

// ===============================
// PAGINACIÓN
// ===============================
function inicializarEventosPaginacion() {
    const btnPrev = document.getElementById("prevPage");
    const btnNext = document.getElementById("nextPage");

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderTabla();
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            const totalPages = Math.ceil(expedientesFiltrados.length / PAGE_SIZE);
            if (currentPage < totalPages) {
                currentPage++;
                renderTabla();
            }
        });
    }
}

function actualizarEstadoBotonesPaginacion(totalPages) {
    const btnPrev = document.getElementById("prevPage");
    const btnNext = document.getElementById("nextPage");

    if (btnPrev) btnPrev.disabled = currentPage <= 1;
    if (btnNext) btnNext.disabled = currentPage >= totalPages;
}

// ===============================
// FILTRO BÚSQUEDA
// ===============================
function inicializarFiltroBusqueda() {
    const inputFiltro = document.getElementById("filtroBusqueda");
    if (!inputFiltro) return;

    inputFiltro.addEventListener("input", () => {
        const term = inputFiltro.value.trim().toLowerCase();

        if (!term) {
            expedientesFiltrados = [...expedientesOriginal];
        } else {
            expedientesFiltrados = expedientesOriginal.filter(exp => {
                return (
                    (exp.IDEXPEDIENTE || "").toString().toLowerCase().includes(term) ||
                    (exp.NOMBRESOLICITANTE || "").toLowerCase().includes(term) ||
                    (exp.NIFSOLICITANTE || "").toLowerCase().includes(term)
                );
            });
        }

        currentPage = 1;
        renderTabla();
    });
}

// ===============================
// ORDENACIÓN POR COLUMNAS
// ===============================
function inicializarOrdenacionColumnas() {
    const ths = document.querySelectorAll("th[data-col]");
    ths.forEach(th => {
        th.addEventListener("click", () => {
            const col = th.dataset.col;

            if (sortColumn === col) sortDirection *= -1;
            else {
                sortColumn = col;
                sortDirection = 1;
            }

            ordenarExpedientes(col);
            actualizarIconosOrdenacion();
            renderTabla();
        });
    });
}

function ordenarExpedientes(col) {
    expedientesFiltrados.sort((a, b) => {
        let v1 = a[col] ?? "";
        let v2 = b[col] ?? "";

        // Fechas
        if (col.includes("FECHA")) {
            v1 = v1 ? new Date(v1) : 0;
            v2 = v2 ? new Date(v2) : 0;
        }

        // Números
        if (col === "CAPITAL") {
            v1 = Number(v1) || 0;
            v2 = Number(v2) || 0;
        }

        // Comparación general
        if (v1 < v2) return -1 * sortDirection;
        if (v1 > v2) return 1 * sortDirection;
        return 0;
    });
}

function actualizarIconosOrdenacion() {
    const ths = document.querySelectorAll("th[data-col]");
    ths.forEach(th => th.innerHTML = th.textContent);

    if (!sortColumn) return;

    const th = document.querySelector(`th[data-col="${sortColumn}"]`);
    if (!th) return;

    const icon = sortDirection === 1 ? "▲" : "▼";
    th.innerHTML = `${th.textContent} <span class="sort-icon">${icon}</span>`;
}

// ===============================
// ACCIÓN "IR"
// ===============================
function abrirExpediente(id) {
    localStorage.setItem("expediente_seleccionado", id);
    window.location.href = "ficha_expediente_envionotario.html";
}
