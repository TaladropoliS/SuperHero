$(function () {

    $('form').submit(function (event) {
        event.preventDefault()
        $('#msg').text('Cargando . . .')
        let valueInput = $('#inputHero').val();

        $.ajax({
            type: 'GET',
            url: `https://www.superheroapi.com/api.php/4905856019427443/${valueInput}`,
            success: function (data) {
                $('#msg').hide()

                let imagen = data.image.url
                let nombre = data.name
                let conexiones = data.connections['group-affiliation']
                let publicado = data.biography.publisher
                let ocupacion = data.work.occupation
                let primeraAparicion = data.biography['first-appearance']
                let altura = data.appearance.height[1]
                let peso = data.appearance.weight[1]
                let aliados = data.biography.aliases
                let aliadosList = []

                for (let i of aliados) {
                    i = ' ' + i
                    aliadosList.push(i)
                }

                $('#superHeroSection').html(`
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text small"><i><b>Conexiones: </b></i>${conexiones}</p>
                                <hr>
                                <p class="card-text small"><i><b>Publicado por: </b></i>${publicado}</p>
                                <hr>
                                <p class="card-text small"><i><b>Ocupación: </b></i>${ocupacion}</p>
                                <hr>
                                <p class="card-text small"><i><b>Primera Aparición: </b></i>${primeraAparicion}</p>
                                <hr>
                                <p class="card-text small"><i><b>Altura: </b></i>${altura}</p>
                                <hr>
                                <p class="card-text small"><i><b>Peso: </b></i>${peso}</p>
                                <hr>
                                <p class="card-text small"><i><b>Aliados: </b></i>${aliadosList}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `)

                let combat = parseInt(data.powerstats.combat)
                let durability = parseInt(data.powerstats.durability)
                let intelligence = parseInt(data.powerstats.intelligence)
                let power = parseInt(data.powerstats.power)
                let speed = parseInt(data.powerstats.speed)
                let strength = parseInt(data.powerstats.strength)

                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `${nombre}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 13,
                        indexLabel: "{label} - {y}%",
                        dataPoints: [
                            {y: combat, label: "combat"},
                            {y: durability, label: "durability"},
                            {y: intelligence, label: "intelligence"},
                            {y: power, label: "power"},
                            {y: speed, label: "speed"},
                            {y: strength, label: "strength"},
                        ]
                    }]
                });
                chart.render();
            }
        });
    })

    // navbar ACTIVE
    $(".nav-link").on("click", function () {
        $(".navbar-nav, .nav-link").find(".active").removeClass("active fw-bolder");
        $(this).addClass("active fw-bolder");
    });

})







