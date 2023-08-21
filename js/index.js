class index {
	constructor(reset = false) {
		if (reset) {
			window.self = new index()
			window.UI = new index_ui(true)
			window.ajax = new Ajax("localhost")
			window.CI = new CONSTANTES()
		}
	}

	async ALTAS(data) {
		if (self.validar(data.args)) {
			console.log(data)
			let r = await ajax.post(data) 

			r = JSON.parse(r)
			r.op = "ALTAS"
			UI.actualizar(r.args)

		
			r = await ajax.post(r)
			r = JSON.parse(r)
			alert(r.res == CI.ALTA_EXITOSA ? "Alta exitosa" : "Alta fallida")
		}
	}

	async BAJAS(data) {
		if (self.validar(data.args)) {
			let r = await ajax.post(data) // (solicito una BAJA)

			r = JSON.parse(r)
			let mensaje
			if (r.res == CI.BAJA_EXITOSA) {
				mensaje = "Baja exitosa"
			} else {
				mensaje = "No existe"
			}
			alert(mensaje)
			UI.clean()
		}
	}

	async CAMBIOS(data) {
		if (self.validar(data)) {
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			const mensaje = r.res == CI.CAMBIO_EXITOSO ? "CAMBIO exitosa" : "CAMBIO fallido"
			alert(mensaje)
			UI.clean()
		}
	}

	async CONSULTASG() {
		let r = { "op": "CONSULTAS", "args": "" }
		r = await ajax.post(r)
		r = JSON.parse(r)
		if (r.res == CI.CONSULTA_EXITOSA) {
			alert("Consulta exitosa");
			UI.clean()
			UI.mostrarConsulta(r.args)
		} else {
			alert("No hay datos");
		}
	}

	async CONSULTAS_NOMBRE(data) {
		if (self.validar(data.args)) {
			let r = await ajax.post(data) 
			r = JSON.parse(r)
				if (r.res == CI.CONSULTA_EXITOSA) {
					UI.actualizar(r.args[0])
					UI.mostrarConsulta(r.args)
				} else {
					UI.contenedor.value = ""
					UI.select.innerHTML = ""
					alert("No hay datos")
				}
		}
	}

	async CONSULTAS_ANTERIOR(data) {
		if (self.validar(data.args)) {
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			if (r.res == CI.CONSULTA_EXITOSA) {
				UI.actualizar(r.args[0])
				UI.mostrarConsulta(r.args)
			} else {
				alert("No hay datos")
			}
		}
	}

	async CONSULTAS_SIGUIENTE(data) {
		if (self.validar(data.args)) {
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			if (r.res == CI.CONSULTA_EXITOSA) {
				UI.actualizar(r.args[0])
				UI.mostrarConsulta(r.args)
			} else {
				alert("No hay datos")
			}
		}
	}

	validar(datos) {
		let decision = true		
		if (datos.hasOwnProperty("nombre")) {
			if (datos.nombre == "")
				decision = false
		}
		else if (datos.hasOwnProperty("nacionalidad")) {
			if (datos.nacionalidad == "")
				decision = false

		}
		else if (datos.hasOwnProperty("edad")) {
			if (datos.edad == "")
				decision = false

		}
		if (!decision) alert("Error en los datos")
		return decision
	}

	ERROR(e) { alert(e.message) }
}
window.onload = () => new index(true)