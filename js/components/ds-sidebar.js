document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       0. CALCULAR PREFIX UNIVERSAL (FUNCIONA EN TODAS LAS RUTAS)
    ============================================================ */
    const path = window.location.pathname.replace(/\\/g, "/");
    let depth = 0;

    if (path.includes("/paginas/")) {
        const after = path.split("/paginas/")[1];
        depth = after.split("/").length - 1;
    }

    const prefix = "../".repeat(depth + 1);

 /* ============================================================
   1. ICONOS EMOJI — PACK COMPLETO
============================================================ */
const icons = {
    dashboard: "📊",
    calendar: "📅",
    folder: "📁",
    factura: "🧾",
    mail: "✉️",
    tools: "🛠️",
    web: "🌐",
    arrow: "▶️",

    actividades: "📝",
    auditoria: "🛡️",
    modificaciones: "✏️",
    eliminaciones: "🗑️",
    errores: "⚠️",
    clientes: "👥",
    proveedores: "🧑‍💼",
    productos: "📦",
    variantes: "🧬",
    familias: "🗂️",
    inventario: "📦",
    etiquetas: "🏷️",
    tickets: "🎟️",
    tpv: "💳",
    facturas: "🧾",
    documentos: "📁",
    notificaciones2: "🔔",
    roles: "🔐",
    usuarios: "👤",
    configuracion: "⚙️",
    importar: "📥",
    exportar: "📤",
    historial: "🕒",

    /* ============================================================
       ICONOS ESPECÍFICOS SECTOR NOTARIAL / REGISTRO
    ============================================================ */
    notariaSinProtocolo: "🏛️",   // Escritura en notaría sin protocolo
    notariaConProtocolo: "📜",    // Escritura con protocolo asignado
    presentacionRegistro: "🏢",   // Presentación en Registro de la Propiedad
    liquidacionImpuestos: "💰",   // Liquidación tributaria
    liquidacionCierre: "📕"       // Cierre del expediente
};


    /* ============================================================
       2. INYECTAR SIDEBAR
    ============================================================ */
    const html = `
    <div id="sidebar" class="sidebar sidebar-compact">

        <div class="sidebar-logo">
            <img src="${prefix}img/logo.jpg" class="logo-mini">
        </div>

        <div id="toggleSidebar" class="menu-item">
            <div class="emoji-icon">${icons.arrow}</div>
            <span class="menu-title">Expandir</span>
        </div>

       <div class="sidebar-items">

                <a class="submenu-item" href="${prefix}paginas/dashboard/dashboard.html">
                    <div class="emoji-icon">${icons.dashboard}</div>
                    <span>Dashboard</span>
                </a>
        </div>

        <div class="sidebar-items">

            <!-- ACTIVIDADES -->
            <div class="menu-item toggle-submenu" data-submenu="submenu-exp">
                <div class="emoji-icon">${icons.documentos}</div>
                <span class="menu-title">Actividades</span>
                <span class="arrow">▶</span>
            </div>

            <div class="submenu" id="submenu-exp">

                <a class="submenu-item" href="${prefix}paginas/expedientes/expedientes.html">
                    <div class="emoji-icon">${icons.familias}</div>
                    <span>Listado general</span>
                </a>

                <a class="submenu-item" href="${prefix}paginas/expedientes_actividades/expedientes_actividad_documentacionprevia.html">
                    <div class="emoji-icon">${icons.actividades}</div>
                    <span>Documentación previa</span>
                </a>

                <a class="submenu-item" href="${prefix}paginas/expedientes_actividades/expedientes_actividad_sedenotarialsinprotocolo.html">
                    <div class="emoji-icon">${icons.notariaSinProtocolo}</div>
                    <span>Sede notarial sin protocolo</span>
                </a>

                <a class="submenu-item" href="${prefix}paginas/expedientes_actividades/expedientes_actividad_sedenotarialconprotocolo.html">
                    <div class="emoji-icon">${icons.notariaConProtocolo}</div>
                    <span>Sede notarial con protocolo</span>
                </a>

                <a class="submenu-item" href="${prefix}paginas/expedientes_actividades/expedientes_actividad_liquidacionimpuestos.html">
                    <div class="emoji-icon">${icons.liquidacionImpuestos}</div>
                    <span>Liquidación impuestos</span>
                </a>

                <a class="submenu-item" href="${prefix}paginas/expedientes_actividades/expedientes_actividad_presentacionregistro.html">
                    <div class="emoji-icon">${icons.presentacionRegistro}</div>
                    <span>Presentación registro</span>
                </a>

                <a class="submenu-item" href="${prefix}paginas/expedientes_actividades/expedientes_actividad_defectos.html">
                    <div class="emoji-icon">${icons.errores}</div>
                    <span>Defectos registrales</span>
                </a>

                <a class="submenu-item" href="${prefix}paginas/expedientes_actividades/expedientes_actividad_liquidacionycierre.html">
                    <div class="emoji-icon">${icons.liquidacionCierre}</div>
                    <span>Liquidación y cierre</span>
                </a>

                <a class="submenu-item" href="${prefix}paginas/expedientes_actividades/expedientes_estado_gestioneconomica.html">
                    <div class="emoji-icon">${icons.tpv}</div>
                    <span>Gestión económica</span>
                </a>

            </div>

            <!-- AGENDA -->
            <a class="menu-item" href="${prefix}paginas/agenda/agenda.html">
                <div class="emoji-icon">${icons.calendar}</div>
                <span class="menu-title">Agenda</span>
            </a>

            <!-- FACTURACIÓN -->
            <a class="menu-item" href="${prefix}paginas/facturacion/facturacion.html">
                <div class="emoji-icon">${icons.facturas}</div>
                <span class="menu-title">Facturación</span>
            </a>

            <!-- HERRAMIENTAS -->
            <a class="menu-item" href="${prefix}paginas/herramientas/herramientas.html">
                <div class="emoji-icon">${icons.tools}</div>
                <span class="menu-title">Herramientas</span>
            </a>

            <!-- INTRANET -->
            <a class="menu-item" href="${prefix}paginas/intranet/intranet.html">
                <div class="emoji-icon">${icons.web}</div>
                <span class="menu-title">Intranet</span>
            </a>

            <!-- MENSAJES -->
            <a class="menu-item" href="${prefix}paginas/mensajeria/mensajes.html">
                <div class="emoji-icon">🗨️</div>
                <span class="menu-title">WhatsApp</span>
            </a>

            <!-- MENSAJERIA -->
            <a class="menu-item" href="${prefix}paginas/mensajeria/mensajeria.html">
                <div class="emoji-icon">📦</div>
                <span class="menu-title">Mensajería</span>
            </a>

            <!-- FUSIONES -->
            <a class="menu-item" href="${prefix}paginas/fusiones/fusiones.html">
                <div class="emoji-icon">🧩</div>
                <span class="menu-title">Fusiones</span>
            </a>

            <!-- UTILIDADES -->
            <a class="menu-item" href="${prefix}paginas/utilidades/utilidades.html">
                <div class="emoji-icon">⚙️</div>
                <span class="menu-title">Utilidades</span>
            </a>

            <!-- CTN -->
            <a class="menu-item" href="${prefix}paginas/ctn/ctn.html">
                <div class="emoji-icon">‍💼</div>
                <span class="menu-title">Ctn</span>
            </a>

            <!-- BUSCADOR -->
            <a class="menu-item" href="${prefix}paginas/expedientes/buscador/buscar_expedientes.html">
                <div class="emoji-icon">🔍</div>
                <span class="menu-title">Buscador</span>
            </a>

        </div>

        <div class="user-avatar-wrapper">
            <img src="${prefix}img/USUARIO.jpg" class="user-avatar" id="avatarUser">
        </div>

        <div class="user-menu" id="userMenu">
            <div class="user-menu-item" onclick="location.href='${prefix}paginas/panel/panel.html'">Cambiar panel</div>
            <div class="user-menu-item" onclick="location.href='${prefix}logout.html'">Cerrar sesión</div>
        </div>

    </div>
    `;

    document.getElementById("sidebar-container").innerHTML = html;

    /* ============================================================
       3. SUBMENÚ
    ============================================================ */
    document.querySelectorAll(".toggle-submenu").forEach(btn => {
        btn.addEventListener("click", () => {
            const sub = document.getElementById(btn.dataset.submenu);
            const arrow = btn.querySelector(".arrow");
            sub.classList.toggle("open");
            arrow.classList.toggle("rotate");
        });
    });

    /* ============================================================
       4. EXPANDIR / COLAPSAR (CON MEMORIA)
    ============================================================ */
    const toggle = document.getElementById("toggleSidebar");

    if (localStorage.getItem("sidebar-expanded") === "true") {
        document.body.classList.add("sidebar-expanded");
    }

    toggle.addEventListener("click", () => {
        const expanded = document.body.classList.toggle("sidebar-expanded");
        localStorage.setItem("sidebar-expanded", expanded);
    });

    /* ============================================================
       5. MENÚ AVATAR
    ============================================================ */
    const avatar = document.getElementById("avatarUser");
    const menu = document.getElementById("userMenu");

    avatar.addEventListener("click", e => {
        e.stopPropagation();
        menu.classList.toggle("open");
    });

    menu.addEventListener("click", e => {
        e.stopPropagation();
    });

    document.addEventListener("click", () => menu.classList.remove("open"));

    /* ============================================================
       6. DETECTAR MÓDULO ACTIVO AUTOMÁTICAMENTE
    ============================================================ */
    const current = window.location.pathname.replace(/\\/g, "/");

    document.querySelectorAll("#sidebar .menu-item[href]").forEach(item => {
        const href = item.getAttribute("href").replace(/\\/g, "/");

        if (current.endsWith(href) || current.includes(href)) {
            item.classList.add("active");
        }
    });

    document.querySelectorAll(".submenu-item").forEach(item => {
        const href = item.getAttribute("href").replace(/\\/g, "/");

        if (current.endsWith(href) || current.includes(href)) {
            item.classList.add("active");

            const parent = item.closest(".submenu");
            if (parent) {
                parent.classList.add("open");

                const toggle = document.querySelector(
                    `.toggle-submenu[data-submenu="${parent.id}"] .arrow`
                );
                if (toggle) toggle.classList.add("rotate");
            }
        }
    });

});
