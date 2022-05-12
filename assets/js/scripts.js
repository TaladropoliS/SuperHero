$(function () {
    $('form').submit(function (event) {
        event.preventDefault()

        $('#msg').text('Cargando . . .')
        let valueInput = $('#inputHero').val();

        //Validación que solo admite números en el form
        var validateReg = /[0-9]/gim;
        let validateID = validateReg.test(valueInput);

        if (!valueInput) {
            $('#msgInput').text('Por favor ingresa un número.')
            // alert("Por favor ingresa un número.");
        } else {
            if (!validateID) {
                $('#msgInput').text('Por favor ingresa sólo números.')
                // alert("Por favor ingresa sólo números.");
            }
            if (valueInput < 1 || valueInput > 732) {
                $('#msgInput').text('Por favor ingresa números del 1 al 732.')
                // alert("Por favor ingresa números del 1 al 732.");
            }
            $('#msgInput').text('')
            $('#respuesta').removeClass('d-none')

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
                <div class="card bg-transparent border-0">
                    <div class="row g-0">
                        <div class="col-md-4 my-auto">
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
                    console.log(combat)
                    if(!combat){
                        combat = 0
                    }
                    console.log(combat)
                    let durability = parseInt(data.powerstats.durability)
                    console.log(durability)
                    if(!durability){
                        durability = 0
                    }
                    console.log(durability)
                    let intelligence = parseInt(data.powerstats.intelligence)
                    console.log(intelligence)
                    if(!intelligence){
                        intelligence = 0
                    }
                    console.log(intelligence)
                    let power = parseInt(data.powerstats.power)
                    console.log(power)
                    if(!power){
                        power = 0
                    }
                    console.log(power)
                    let speed = parseInt(data.powerstats.speed)
                    console.log(speed)
                    if(!speed){
                        speed = 0
                    }
                    console.log(speed)
                    let strength = parseInt(data.powerstats.strength)
                    console.log(strength)
                    if(!strength){
                        strength = 0
                    }
                    console.log(strength)

                    var chart = new CanvasJS.Chart("chartContainer", {
                        theme: "dark2", // "light1", "light2", "dark1", "dark2"
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: `${nombre}`
                        },
                        data: [{
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 13,
                            indexLabel: "{label} - {y}",
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
        }

    })

    // navbar ACTIVE
    $(".nav-link").on("click", function () {
        $(".navbar-nav, .nav-link").find(".active").removeClass("active fw-bolder");
        $(this).addClass("active fw-bolder");
    });

})







