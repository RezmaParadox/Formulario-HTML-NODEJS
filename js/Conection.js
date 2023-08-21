import mysql from "mysql";

export default class ConexionBD {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "dwa",
    });
  }

  async conectar() {
    await this.connection.connect((error) => {
      if (error) throw error;
      console.log("Conexión exitosa");
    });
  }

  async desconectar() {
    await this.connection.end((error) => {
      if (error) throw error;
      console.log("Desconexión exitosa");
    });
  }

  async procedimiento(json) {
    try {
      await this.conectar();
      const { op, args } = json
      if (op == "ALTAS") {
        const query = `CALL ${op}(?, ?, ?, ?)`;
        const values = Object.values(args);

        const resultado = await new Promise((resolve, reject) =>{
          this.connection.query(query, values, (err, resultado) => {
            if(err) reject(err);
            else resolve(resultado[0])
          });
        })
        await this.desconectar();
        console.log(`Procedimiento ${op} exitoso`);
        return resultado;
      }
      if (op == "BAJAS") {
        const query = `CALL ${op}(?)`;
        const values = Object.values(args);

        const resultado = await new Promise((resolve, reject) => {
          this.connection.query(query, values, (err, resultado) => {
            if(err) reject(err);
            else resolve(resultado[0])
          });
        })
        await this.desconectar();
        console.log(`Procedimiento ${op} exitoso`);
        return resultado;
      }
      if (op == "CAMBIOS") {
        const query = `CALL ${op}(?, ?, ?, ?)`;
        const values = Object.values(args);

        const resultado = await new Promise((resolve, reject) => {
          this.connection.query(query, values, (err, resultado) => {
            if(err) reject(err)
            else resolve(resultado[0])
          });
        })
        await this.desconectar();
        console.log(`Procedimiento ${op} exitoso`);
        return resultado;
      }
      if (op == "CONSULTAS") {
        const query = `CALL ${op}();`;
        const resultado = await new Promise((resolve, reject) => {
          this.connection.query(query, (err, resultado) => {
            if (err) reject(err);
            else resolve(resultado[0]);
          });
        });
        await this.desconectar();
        console.log(`Procedimiento ${op} exitoso`);
        return resultado;
      }
      if (op == "CONSULTAS_NOMBRE") {
        const query = `CALL ${op}(?);`;
        const values = Object.values(args)
        const resultado = await new Promise((resolve, reject) => {
          this.connection.query(query, values, (err, resultado) => {
            if (err) reject(err);
            else resolve(resultado[0]);
          });
        });
        await this.desconectar();
        console.log(`Procedimiento ${op} exitoso`);
        return resultado;
      }
      if (op == "CONSULTAS_ANTERIOR") {
        const query = `CALL ${op}(?)`;
        const values = Object.values(args);

        const resultado = await new Promise((resolve, reject) => {
          this.connection.query(query, values, (err, resultado) => {
            if(err) reject(err);
            else resolve(resultado[0])
          });
        })
        await this.desconectar();
        console.log(`Procedimiento ${op} exitoso`);
        return resultado;
      }
      if (op == "CONSULTAS_SIGUIENTE") {
        const query = `CALL ${op}(?)`;
        const values = Object.values(args);

        const resultado = await new Promise((resolve, reject) => {
          this.connection.query(query, values, (err, resultado) => {
            if(err) reject(err);
            else resolve(resultado[0])
          });
        })
        await this.desconectar();
        console.log(`Procedimiento ${op} exitoso`);
        return resultado;
      }
    } catch (error) {
      console.error("Error al ejecutar el procedimiento :(, error: ", error);
      throw error;
    }
  }
}