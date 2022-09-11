const d = new Date()
d.setHours(d.getHours()-3)

updateColor = (value) => {
    document.getElementById('color').value = value
}

document.addEventListener('DOMContentLoaded',  () => {

    let form = document.querySelector('#form-calendar')

    let calendarEl = document.getElementById('calendar')

    let calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: 'bootstrap5',
        initialView: 'timeGridWeek',//'dayGridMonth',
        locale: 'pt-BR',
        timeZone:'UTC',
        headerToolbar: {
            left: 'prev today next',
            center: 'title',
            right: 'dayGridMonth timeGridWeek timeGridDay listMonth',
            // lembrate: configurar timeGridWeek para começar com o dia atual
            // Bloquear acesso a consulta para o usuario
        },
        views:{
            timeGrid:{
                eventMinHeight: 1,
                allDaySlot:false,

            },
        },
        nowIndicator: true,
        now: d,
        //slotMinTime:'09:00:00',
        //slotMaxTime:'17:00:00',
        slotDuration:'01:00:00',
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            omitZeroMinute: false,
            hour12:false
        },
        height: 500,
        expandRows: true,
        // events: rootUrl+'/calendario/show',
        // editable: true,
        dayMaxEvents: true, // when too many events in a day, show the popover
        eventSources:{
            url: rootUrl+'/calendario/show',
            method:'POST',
            extraParams: {
                _token: form._token.value,
            }
        },

        eventDidMount:(info) => {
            $(info.el).tooltip({
                title:'Paciente: ' + info.event.extendedProps.patient,
                placement: 'top',
                trigger: 'hover',
                container: 'body'
            });

        },
        dateClick:(info) => {
            if(info.view.type!=='dayGridMonth'){
                // Reseta as informações do Modal
                form.reset();

                let time = new Date(info.dateStr.replace(/[^0-9,:-]/gi,' '))
                form.time.value = time.toLocaleString()

                // Get data e hora atual e coloca no campo data
                form.start.value = info.dateStr.replace(/[^0-9,:-]/gi,' ')
                form.end.value = info.dateStr.replace(/[^0-9,:-]/gi,' ')


                $('#event').modal('show')
            }

        },
        eventClick:(info) => {
            axios.post(rootUrl+'/calendario/edit/'+info.event.id).
            then(
                // Se der certo, o modal será aberto com as informações do banco
                (res) => {
                    // Recupero as informações do Controller e as insiro no form
                    form.id.value = res.data.id

                    form.title.value = res.data.title
                    form.patient.value = res.data.patient

                    form.title.value = res.data.title
                    form.observation.value = res.data.observation

                    let time = new Date(info.event.startStr.replace(/[^0-9,:-]/gi,' '))
                    form.time.value = time.toLocaleString()

                    form.start.value = res.data.start
                    form.end.value = res.data.end


                    $('#event').modal('show')
                }).
            catch(
                // Caso um erro for encontrado será imprimido no console
                error=>{
                    if(error.response){
                        console.log(error.response.data)
                    }
                }
            )
        },
        // eventDrop:(info) => {
        //     axios.post(rootUrl+'/calendario/edit/'+info.event.id).
        //     then(
        //         // Se der certo, o modal será aberto com as informações do banco
        //         (res) => {
        //             // Recupero as informações do Controller e as insiro no form
        //             form.id.value = res.data.id
        //
        //             form.title.value = res.data.title
        //             form.patient.value = res.data.patient
        //             form.observation.value = res.data.observation
        //
        //             let time = new Date(info.event.startStr.replace(/[^0-9,:-]/gi,' '))
        //             form.time.value = time.toLocaleString()
        //
        //             form.start.value = info.event.startStr.replace(/[^0-9,:-]/gi,' ')
        //             form.end.value = form.start.value
        //
        //             $('#event').modal('show')
        //         }).
        //     catch(
        //         // Caso um erro for encontrado será imprimido no console
        //         error=>{
        //             if(error.response){
        //                 console.log(error.response.data)
        //             }
        //         }
        //     )
        // }

    });
    calendar.render()


    document.getElementById('btnSave').addEventListener('click',()=>{
        sendData('/calendario/store')
    })

    document.getElementById('btnRemove').addEventListener('click',()=>{
        sendData('/calendario/destroy/'+form.id.value)
    })

    document.getElementById('btnChange').addEventListener('click',()=>{
        sendData('/calendario/update/'+form.id.value)
    })

    sendData = (url) => {
        const formData = new FormData(form)

        // Axios envia informações via url
        axios.post(rootUrl+url, formData).
        then(
            // Se der certo, o modal será fechado e a informação enviada
            (res)=>{
                calendar.refetchEvents()
                $('#event').modal('hide')
            }).
        catch(
            // Caso um erro for encontrado será imprimido no console
            error=>{
                if(error.response){
                    console.log(error.response.data)
                }
            }
        )
    }
})


