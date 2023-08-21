class index_ui {
	constructor(reset = false) {
		if (reset) {
			// Obtengo los acceso a los elementos de mi página
			this.form = document.querySelector("form")
			this.select = document.querySelector("#select")
			this.enviar = document.querySelector("#enviar")
			this.bajas = document.querySelector("#bajas")
			this.cambios = document.querySelector("#cambios")
			this.consultaGeneral = document.querySelector("#consultaGeneral")
			this.consultaNombre = document.querySelector("#consultaNombre")
			this.consultas_anterior = document.querySelector("#anterior")
			this.consultas_siguiente = document.querySelector("#siguiente")
			this.clear = document.querySelector("#clear")

			//* Obtengo acceso a los elementos input
			this.nombre = document.querySelector("#nombre")
			this.nacionalidad = document.querySelector("#nacionalidad")
			this.edad = document.querySelector("#edad")
			this.data = document.querySelector("#data")
			this.id = document.querySelector("#id")

			//* Fijo eventos
			this.bajas.addEventListener("click", this.bajas_click)
			this.enviar.addEventListener("click", this.altas_click)
			this.cambios.addEventListener("click", this.cambios_click)
			this.select.addEventListener('change', this.seleccionar_click)
			this.consultaNombre.addEventListener("click", this.consultas_nombre_click)
			this.consultaGeneral.addEventListener("click", this.consulta_general_click)
			this.consultas_anterior.addEventListener("click", this.consultas_anterior_click)
			this.consultas_siguiente.addEventListener("click", this.consultas_siguiente_click)
		}
	}

	altas_click(e) {
		let datos = { "op": "ID", "args": UI.recuperar("ALTAS") }
		e.preventDefault() 
		self.ALTAS(datos)  
	}

	bajas_click(e) {
		let datos = { "op": "BAJAS", "args": UI.recuperar("BAJAS") }
		console.log(datos)
		e.preventDefault()
		self.BAJAS(datos)
	}
	cambios_click(e) {
		e.preventDefault() 
		let datos = {"op": "CAMBIOS", "args": UI.recuperar("CAMBIOS")}
		self.CAMBIOS(datos) 
	}

	consulta_general_click(e) {
		//agregue
		e.preventDefault() 
		let datos = {"op": "CONSULTAS", "args": UI.recuperar("CONSULTAS")}
		//
		self.CONSULTASG(datos) 
	}

	consultas_nombre_click(e) {
		e.preventDefault() 
		let datos = {"op": "CONSULTAS_NOMBRE", "args": UI.recuperar("CONSULTAS_NOMBRE")}
		self.CONSULTAS_NOMBRE(datos)
	}

	consultas_anterior_click(e) {
		e.preventDefault() 
		let datos = {"op": "CONSULTAS_ANTERIOR", "args": UI.recuperar("CONSULTAS_ANTERIOR")}
		self.CONSULTAS_ANTERIOR(datos) 
	}

	consultas_siguiente_click(e) {
		e.preventDefault() 
		let datos = {"op": "CONSULTAS_SIGUIENTE" ,"args": UI.recuperar("CONSULTAS_SIGUIENTE")}		
		self.CONSULTAS_SIGUIENTE(datos) 
	}

	seleccionar_click(e) {
		let target = e.target
		UI.actualizar(target[target.selectedIndex].data)
		
	}

	recuperar(servicio) {
		let datos = {}

		if (servicio == "ALTAS" || servicio == "CAMBIOS") {

			datos.id = UI.id.value
			datos.nombre = UI.nombre.value,
			datos.nacionalidad = UI.nacionalidad.value,
			datos.edad = UI.edad.value
		}
		if (servicio == "BAJAS" || servicio == "CONSULTAS_ANTERIOR" || servicio == "CONSULTAS_SIGUIENTE") {
			datos.id = UI.id.value
		}
		else if (servicio == "CONSULTAS_NOMBRE") {
			datos.nombre = UI.nombre.value
		}

		return datos
	}

	actualizar(data) {
		UI.id.value = data.id
		UI.nombre.value = data.nombre
		UI.nacionalidad.value = data.nacionalidad
		UI.edad.value = data.edad
	}

	clean() {
		UI.id.value = ""
		UI.nombre.value = ""
		UI.nacionalidad.value = ""
		UI.edad.value = ""
	}

	mostrarConsulta(data) {
		this.select.innerHTML = ""
		if (Array.isArray(data)) {
			let contenido = "";
			let option = document.createElement("option");
			option.innerText = "Selecciona un dato"
			this.select.appendChild(option)
			for (const prop of data) {
				contenido += prop.nombre + " " + prop.nacionalidad + " " + prop.edad + "\n";

				let option = document.createElement("option");
				option.setAttribute("value", prop.id);
				option.innerText = prop.nombre + " " + prop.nacionalidad + " " + prop.edad
				option.data = prop
				this.select.appendChild(option)
			}
			
		} else {
			this.actualizar(data)
			let option = document.createElement("option");
			option.innerText = " -------------------- "
			this.select.appendChild(option)
		}
	}
}