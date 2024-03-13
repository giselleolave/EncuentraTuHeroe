
$(document).ready(function () {
    // VARIABLES
    const btnBuscar = $("#formulario")
    const heroe = $("#heroe")
    const resultado = $("#resultado")
    // boton de busqueda
    btnBuscar.on("submit", function (e) {
        e.preventDefault()

        //CONECTAR APIREST

        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${heroe.val()}`,
            method: "GET",
            success(data) {
                const{powerstats,name}= data;
                const {intelligence,strength,speed,durability,power,combat}= powerstats;
                //console.log('Poderes',powerstats);

                // DATOS GRÁFICO
                const estadisticas = [
                    { y: intelligence, label: "Intelligence" },
                    { y: strength, label: "strength" },
                    { y: speed, label: "speed" },
                    { y: durability, label: "durability" },
                    { y: power, label: "power" },
                    { y: combat, label: "combat" },

                ]
                // TARJERA DEL HEROE
                resultado.html(`
                <h3 class="text-center">Super Héroe Encontrado</h3>
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.image.url}"
                                class="img-fluid rounded-start" alt="Imagen">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">

                                <h5 class="card-title">Nombre : ${data.name}</h5>
                                <p class="card-text">Conexiones: ${data.connections["group-affiliation"]}</p>
                                <p class="card-text">Familiares: ${data.connections["relatives"]}</p>
                                <div class="ms-4">
                                    <p>Publicado por: ${data.biography.publisher}</p>
                                    <hr>
                                    <p>Ocupación : ${data.work.occupation}</p>
                                    <hr>
                                    <p>Primera Aparición : ${data.biography["first-appearance"]}</p>
                                    <hr>
                                    <p>Altura: ${data.appearance.height}</p>
                                    <hr>
                                    <p>Peso: ${data.appearance.weight}</p>
                                    <hr>
                                    <p>Alianza: ${data.biography.aliases}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                             
                `)
                // GRÁFICO
                const chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de Poder de ${name}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y} ",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y} ",
                        dataPoints: estadisticas
                    }]
                });

                chart.render();

            },
            error(e) {
                console.error("ERROR DE CONEXIÓN" + e.statusCode)

            }
        })


    })

})