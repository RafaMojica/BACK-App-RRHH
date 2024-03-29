const S = require("sequelize");
const db = require("../config/db");

class DatosLaborales extends S.Model {}

DatosLaborales.init(
  {
    fechaDeIngreso: { type: S.DATEONLY },
    puesto: { type: S.STRING },
    diasLaborales: { type: S.STRING },
    horarioLaboral: { type: S.STRING },
    turno: { type: S.STRING },
    observaciones: { type: S.TEXT },
    jerarquia: { type: S.INTEGER },
  },
  {
    sequelize: db,
    modelName: "datosLaborales",
  }
);
//HOOKS
DatosLaborales.addHook("beforeCreate", (datosLaborales, options) => {
  const JERARQUIA = {
    "gerente general": 1,
    "gerente regional": 2,
    "rrhh pais": 3,
    "gerente pais": 4,
    "jefe regional": 5,
    "jefe pais": 6,
    "coordinador regional": 7,
    "coordinador pais": 8,
    "empleado": 9,
  };
  const asignarNumero = JERARQUIA[datosLaborales.puesto];
  return (datosLaborales.jerarquia = asignarNumero);
});

module.exports = DatosLaborales;
