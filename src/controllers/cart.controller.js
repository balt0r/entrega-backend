// Este archivo manejará la lógica de agregar productos al carrito

let cart = []; // El carrito en memoria

// Función para agregar un producto al carrito
const addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body; // El ID del producto que viene en el cuerpo de la solicitud

    if (!productId) {
      return res.status(400).json({ error: 'Falta el ID del producto' });
    }

    // Buscar el producto en la base de datos usando el productsManager
    const product = await productsManager.readOne(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.product._id === productId);
    if (existingProduct) {
      // Si el producto ya existe en el carrito, incrementar la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo con una cantidad de 1
      cart.push({ product, quantity: 1 });
    }

    return res.status(200).json({ message: 'Producto agregado al carrito', cart });
  } catch (error) {
    next(error);
  }
};

// Puedes agregar otras funciones como ver el carrito, eliminar productos, etc.

export { addToCart };
