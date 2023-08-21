console.clear()
import { createServer } from 'http'
import { Procesos } from './js/Procesos.js'
import { createReadStream, existsSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const procesos = new Procesos() // Para usarse con POST
createServer((req, res) => {
	if (req.method == "GET") {
		const url = req.url == '/' ? './index.html' : req.url
		const archivo = fileURLToPath(import.meta.url) // Archivo meta (el que se está ejecutando)
		const directorio = path.dirname(archivo) // Recupero mi directorio base
		const ruta = path.join(directorio, url) // Ruta absoluta del recurso solicitado

		if (existsSync(ruta)) {
			const fileStream = createReadStream(ruta, 'UTF-8');
			if (url.match(/.html$/)) res.writeHead(200, { 'Content-Type': 'text/html ;  charset=UTF-8' });
			if (url.match(/.css$/)) res.writeHead(200, { 'Content-Type': 'text/css ;  charset=UTF-8' });
			if (url.match(/.js$/)) res.writeHead(200, { 'Content-Type': 'text/javascript ;  charset=UTF-8' });
			if (url.match(/.ico$/)) {
				var img = readFileSync(ruta);
				res.writeHead(200, { 'Content-Type': 'image/x-icon' });
				res.end(img, 'binary');
			}
			if (url.match(/.png$/)) {
				var img = readFileSync(ruta);
				res.writeHead(200, { 'Content-Type': 'image/png' });
				res.end(img, 'binary');
			}if (url.match(/.jpeg$/)) {
				var img = readFileSync(ruta);
				res.writeHead(200, { 'Content-Type': 'image/jpeg' });
				res.end(img, 'binary');
			}
			fileStream.pipe(res); //* Respuesta fragmentada al cliente (chunk)
		}
		else {
			console.log("No existe: ", ruta)
			res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' })
			res.end("404 Error: Archivo no encontrado")
		}
	}
	else if (req.method == "POST") {
		let data = ""
		req.on('data', chunk => data += chunk) // Armando la data
		req.on('end', () => { // La data está armanda
			console.log(data)
			try{
				console.log(data)
				data = JSON.parse(data) // Asumo que la data es un json
			}
			catch(error){
				console.error('Se produjo un error:', error);
			}
			
			if (procesos[data.op]) { // Verifico que sea una solicitud legal
				// Determino si hay ejecución con parámetros o sin parámetros.
				// En r va a quedar la respuesta del método que se invoque del objeto procesos

				//r = data.hasOwnProperty("args") ? procesos[data.op](data).then : procesos[data.op]()
				if (data.hasOwnProperty("args")) {
					procesos[data.op](data).then((result) => {
						// Indico al cliente que le estoy retornando json
						res.writeHead(200, { 'Content-Type': 'text/json; charset=UTF-8' })
						// Convierto a JSON para retornar la respuesta
						console.log(JSON.stringify(result))
						res.end(JSON.stringify(result))
					}).catch((err) => {
						const result = procesos[data.op]();
						res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
						res.end(JSON.stringify(result));
					});
				}
			}
			else res.end("Solicitud rechazada") // Servicio desconocido (solicitud no legal)
		})
	}
}).listen(8080, '127.0.0.1', () => {
	console.log("Servidor web a la escucha 127.0.0.1:8080")
})