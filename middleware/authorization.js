// // const { User, Vehicle } = require("../models/index");

// const authorization = async (req, res, next) => {
//   const { id } = req.params;
//   const { UserId, Role } = req.additionsData;

//   try {
//     // // const vehicle = await Vehicle.findByPk(id, { include: [User] });
//     // if (!vehicle) {
//     //   throw { name: "NotFound", message: "Vehicle not found" };
//     }

//     if (Role.toLowerCase() !== "admin") {
//     //   if (vehicle.UserId === UserId) {
//         return next();
//       } else {
//         // throw { name: "Forbidden", message: "Not your vehicle" };
//       }
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = authorization;
