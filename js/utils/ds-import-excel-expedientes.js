function importarExcelExpedientes() {
    const fileInput = document.getElementById("inputExcel");
    const file = fileInput.files[0];

    if (!file) {
        alert("Selecciona un archivo Excel.");
        return;
    }

    mostrarProcesando(true);

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const expedientes = XLSX.utils.sheet_to_json(sheet);

            localStorage.setItem("expedientes_importados", JSON.stringify(expedientes));

            mostrarProcesando(false);

            document.getElementById("resultadoImportacion").innerHTML =
                `<span style="color:green; font-weight:700;">✔ ${expedientes.length} expedientes importados correctamente.</span>`;

        } catch (error) {
            mostrarProcesando(false);
            document.getElementById("resultadoImportacion").innerHTML =
                `<span style="color:red; font-weight:700;">❌ Error al procesar el Excel.</span>`;
        }
    };

    reader.readAsArrayBuffer(file);
}

function mostrarProcesando(show) {
    document.getElementById("modalProcesando").style.display = show ? "flex" : "none";
}
