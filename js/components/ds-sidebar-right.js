document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebarTools");
    const hitbox = document.querySelector(".sidebar-hitbox");

    if (!sidebar || !hitbox) return;

    // Abrir al pasar el ratón por la zona sensible
    hitbox.addEventListener("mouseenter", () => {
        sidebar.classList.add("open");
    });

    // Cerrar al salir del sidebar
    sidebar.addEventListener("mouseleave", () => {
        sidebar.classList.remove("open");
    });
});
