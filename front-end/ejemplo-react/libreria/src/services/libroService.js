import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/libreria/api/v1/libros';

export const libroService = {
  // READ: Obtener todos los libros
  getLibros: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // CREATE: Agregar un nuevo libro
  createLibro: async (libro) => {
    const response = await axios.post(API_URL, libro);
    return response.data;
  },

  // UPDATE: Modificar un libro por su _id
  updateLibro: async (id, libro) => {
    const response = await axios.put(`${API_URL}/${id}`, libro);
    return response.data;
  },

  // DELETE: Eliminar un libro
  deleteLibro: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};