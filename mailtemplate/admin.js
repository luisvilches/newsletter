module.exports = function(obj){
    return `<section>
    <h3>Nuevo Registro</h3><br>
    <p><strong>Nombre:</strong> ${obj.name}</p>
    <p><strong>Apellido:</strong> ${obj.lastname}</p>
    <p><strong>Rut:</strong> ${obj.rut}</p><br>
    <p><strong>Telefono:</strong> ${obj.phone}</p>
    <p><strong>Correo:</strong> ${obj.mail}</p>
    <p><strong>Ciudad:</strong> ${obj.ciudad}</p>
    <p><strong>Whatsapp:</strong> ${obj.whatsapp ? "Si":"No"}</p>
    <p><strong>Newsletter:</strong> ${obj.newsletter ? "Si":"No"}</p>
    </section>`;
}