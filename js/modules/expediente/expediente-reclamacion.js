/* ============================
   RECLAMACIÓN
============================ */

function abrirModalReclamacion() {
    const modal = document.getElementById("modalReclamacion");
    if (!modal) return;
    modal.classList.add("open");
}

function cerrarModalReclamacion(e) {
    const modal = document.getElementById("modalReclamacion");
    if (!modal) return;

    if (!e) return;

    if (e.target.id === "modalReclamacion" || e.target.classList.contains("modal-close")) {
        modal.classList.remove("open");
    }
}

function guardarReclamacion() {
    const tipo = document.getElementById("reclamacionTipo")?.value;
    const descripcion = document.getElementById("reclamacionDescripcion")?.value.trim();

    if (!descripcion) {
        alert("Debes escribir una descripción.");
        return;
    }

    const asunto = encodeURIComponent("Nueva reclamación - " + (tipo || ""));
    const cuerpo = encodeURIComponent(
        "Tipo de reclamación: " + (tipo || "") +
        "\n\nDescripción:\n" + descripcion
    );

    window.location.href = `mailto:reclamaciones@molsan.com?subject=${asunto}&body=${cuerpo}`;

    cerrarModalReclamacion({ target: { id: "modalReclamacion" } });

    const textarea = document.getElementById("reclamacionDescripcion");
    if (textarea) textarea.value = "";
}
