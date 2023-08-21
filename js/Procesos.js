import { CI } from "./constantes.js";
import ConexionBD from "./Conection.js";

export class Procesos {
	async ID(datos) {
		datos.args.id = await this.id();
		return datos;
	}

	id() {
		let fecha = new Date(),
			str = fecha.getFullYear();

		str += ("0" + (fecha.getMonth() + 1)).slice(-2); // Siempre a dos dígitos
		str += ("0" + fecha.getDate()).slice(-2);
		str += ("0" + fecha.getHours()).slice(-2);
		str += ("0" + fecha.getMinutes()).slice(-2);
		str += ("0" + fecha.getSeconds()).slice(-2);
		str += ("00" + fecha.getMilliseconds()).slice(-3); // Siempre a tres dígitos
		return str;
	}

	async ALTAS(datos) {
		const conexion = new ConexionBD();
		const res = await conexion.procedimiento(datos)
			.then(results =>{
				return { res: CI.ALTA_EXITOSA };
			})
			.catch(err =>{
				return { res: CI.ALTA_FALLIDA };
			})
		return res;
	}

	async BAJAS(datos) {
		console.log(datos)
		const conexion = new ConexionBD();
		const res = await conexion.procedimiento(datos)
			.then(results => {
				if (results[0].resultado != '') {
					return { res: CI.BAJA_EXITOSA };
				}else{
					return { res: CI.BAJA_FALLIDA };
				}
			})
			.catch(err =>{
				return { res: CI.BAJA_FALLIDA };
			})
		return res;
	}

	async CAMBIOS(datos) {
		const conexion = new ConexionBD();
		const res = await conexion.procedimiento(datos)
			.then(results => {
				if (results[0].resultado != ''){
					return { res: CI.CAMBIO_EXITOSO };
				}else{
					return { res: CI.CAMBIO_FALLIDO };
				}
			})
			.catch(err => {
				return { res: CI.CAMBIO_FALLIDO };
			})
		return res;
	}

	async CONSULTAS(datos) {
		const conexion = new ConexionBD();
		const res = await conexion.procedimiento(datos)
			.then(results => {
				console.log("results: ", results)
				if (results[0].resultado != 0) {
					return { res: CI.CONSULTA_EXITOSA, args: results };
				} else {
					return { res: CI.CONSULTA_FALLIDA};
				}
			})
			.catch(error => {
				return { res: CI.CONSULTA_FALLIDA };
			});
		return res;
	}

	async CONSULTAS_NOMBRE(datos) {
		const conexion = new ConexionBD();
		const res = await conexion.procedimiento(datos)
			.then(results =>{
				if (results[0].resultado != 0) {
					return { res: CI.CONSULTA_EXITOSA, args: results}
				}else{
					return {res: CI.CONSULTA_FALLIDA}
				}
			}).catch(error =>{
				return {res: CI.CONSULTA_FALLIDA}
			})
		 return res;
	}

	async CONSULTAS_ANTERIOR(datos) {
		const conexion = new ConexionBD();
		const res = await conexion.procedimiento(datos)
			.then(results =>{
				if (results[0].resultado != 0) {
					return { res: CI.CONSULTA_EXITOSA, args: results}
				}else{
					return {res: CI.CONSULTA_FALLIDA}
				}
			}).catch(error =>{
				return {res: CI.CONSULTA_FALLIDA}
			})
		 return res;
	}

	async CONSULTAS_SIGUIENTE(datos) {
		const conexion = new ConexionBD();
		const res = await conexion.procedimiento(datos)
			.then(results =>{
				if (results[0].resultado != 0) {
					return { res: CI.CONSULTA_EXITOSA, args: results}
				}else{
					return {res: CI.CONSULTA_FALLIDA}
				}
			}).catch(error =>{
				return {res: CI.CONSULTA_FALLIDA}
			})
		 return res;
	}
}
