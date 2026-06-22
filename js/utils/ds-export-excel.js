function exportarExcel(tablaId = "tablaResultados", nombreArchivo = null) {
    const tabla = document.getElementById(tablaId);

    if (!tabla) {
        alert("No se encontró la tabla para exportar.");
        return;
    }

    // Nombre automático si no se pasa uno
    if (!nombreArchivo) {
        const fecha = new Date().toISOString().slice(0, 10);
        nombreArchivo = `exportacion_${fecha}.csv`;
    }

    let csv = [];

    // Recorremos filas
    for (let i = 0; i < tabla.rows.length; i++) {
        let fila = [];
        let columnas = tabla.rows[i].querySelectorAll("th, td");

        columnas.forEach(col => {
            let texto = col.innerText
                .replace(/\n/g, " ")        // elimina saltos de línea
                .replace(/\s+/g, " ")       // normaliza espacios
                .replace(/"/g, '""')        // escapa comillas
                .trim();

            if (texto === "") texto = "";

            fila.push(`"${texto}"`);
        });

        csv.push(fila.join(";")); // separador español
    }

    const csvString = csv.join("\n");

    if (csvString.trim().length === 0) {
        alert("La tabla está vacía, no se puede exportar.");
        return;
    }

    // Blob UTF‑8 con BOM para Excel España
    const blob = new Blob(
        ["\ufeff" + csvString],
        { type: "text/csv;charset=utf-8;" }
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
