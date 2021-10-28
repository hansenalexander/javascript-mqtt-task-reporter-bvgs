function sendInnSvar(svar, gruppe) {
  let MQTT_HOST = "mqtt.flespi.io"
  let MQTT_PORT = 443
  let MQTT_TOPIC = "bvgs"
  let MQTT_USER = "FlespiToken Pn9sJUTeQrco4aiUpNKZBU3sn7obeQqR1o7B6QFK7GY0G4KTHlH73ynhwzgydue5"
  let MQTT_PASS = ""

  let resultatEl = document.querySelector("#resultat")
  let oppgaveEl = document.querySelector("h1")
  let gruppenavn = gruppe ? ('' + gruppe).trim() : 'Ukjent Gruppe'
  let oppgavenavn = oppgaveEl ? oppgaveEl.innerHTML.trim() : 'Ukjent Oppgave'

  let client = new Paho.Client(MQTT_HOST, MQTT_PORT, gruppenavn);

  if (resultatEl) {
    resultatEl.innerHTML = svar
  } else {
    console.error("Kunne ikke finne element med id='resultat'")
  }

  console.log(svar, gruppe)
  client.connect({
    useSSL: true,
    userName : MQTT_USER,
    password : MQTT_PASS,

    onSuccess: function() {
      console.log("Koblet til broker")
      let message = new Paho.Message(JSON.stringify({ gruppenavn, oppgavenavn, svar }))
      message.destinationName = MQTT_TOPIC
      client.send(message)
    }
  })
}

