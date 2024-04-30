const { User, Product } = require("../models/index");
const { generateToken, verifyToken } = require("../helpers/jwt");
const bcrypt = require("bcrypt");

class Controller {
  //User Controller
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      if (password.length < 5) {
        return res
          .status(400)
          .json({ message: "Password must be at least 5 characters long" });
      }

      const role = username.toLowerCase().includes("admin") ? "admin" : "user";

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = generateToken({ id: user.id, email: user.email });
      res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const { UserId } = req.additionsData;
      const user = await User.findByPk(UserId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User profile fetched successfully", user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching user profile", error: error.message });
    }
  }

  static async updateUserProfile(req, res) {
    try {
      const { UserId } = req.additionsData;
      const { username, password } = req.body;

      if (!username && !password) {
        return res
          .status(400)
          .json({ message: "Please provide username or password" });
      }

      const updatedData = {};

      if (username) {
        updatedData.username = username;
      }

      if (password) {
        if (password.length < 5) {
          return res
            .status(400)
            .json({ message: "Password must be at least 5 characters long" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }

      const [updatedRows] = await User.update(updatedData, {
        where: { id: UserId },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User profile updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user profile", error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { UserId } = req.additionsData;

      const userToDelete = await User.findByPk(UserId);
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found" });
      }

      await userToDelete.destroy();

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  }

  //Product Controller
  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.json({ products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching products", error: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ product });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching product", error: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const { name, description, price, stock } = req.body;

      if (!name || !description || !price || !stock) {
        return res.status(400).json({
          message: "Missing required fields: name, price, description, stock",
        });
      }

      if (isNaN(price) || isNaN(stock)) {
        return res.status(400).json({
          message: "Price and stock must be numeric values",
        });
      }

      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      if (error.name === "Unauthorized") {
        return res.status(403).json({
          message: "Forbidden: " + error.message,
        });
      }
      res.status(500).json({
        message: "Error creating product",
        error: error.message,
      });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, price, description, stock } = req.body;

      const existingProduct = await Product.findByPk(id);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatedFields = Object.assign({}, existingProduct, {
        name: name || existingProduct.name,
        price: price || existingProduct.price,
        description: description || existingProduct.description,
        stock: stock || existingProduct.stock,
      });

      await existingProduct.update(updatedFields);

      return res.json({
        message: "Product updated successfully",
        product: existingProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const productToDelete = await Product.findByPk(id);
      if (!productToDelete) {
        return res.status(404).json({ message: "Product not found" });
      }
      await productToDelete.destroy();
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting product", error: error.message });
    }
  }
}

module.exports = Controller;
