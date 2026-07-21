import { useState, useEffect } from 'react';
import { libroService } from './services/libroService';

// Lista de nacionalidades para el dropdown
const NACIONALIDADES = [
  { value: "Colombiana", label: "Colombiana" },
  { value: "Argentina", label: "Argentina" },
  { value: "Mexicana", label: "Mexicana" },
  { value: "Chilena", label: "Chilena" },
  { value: "Española", label: "Española" },
  { value: "Uruguaya", label: "Uruguaya" }
];

function App() {
  // --- LÓGICA (Se mantiene igual para que funcione con tu API) ---
  const [libros, setLibros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '', nombreAutor: '', apellidoAutor: '', nacionalidadAutor: '', precio: '', cantidad_stock: ''
  });

  useEffect(() => { cargarLibros(); }, []);

  const cargarLibros = async () => {
    try { const data = await libroService.getLibros(); setLibros(data); } 
    catch (error) { console.error("Error:", error); }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const libroPayload = {
      titulo: formData.titulo,
      autor: { nombre: formData.nombreAutor, apellido: formData.apellidoAutor, nacionalidad: formData.nacionalidadAutor },
      precio: parseFloat(formData.precio),
      cantidad_stock: parseInt(formData.cantidad_stock, 10)
    };
    try {
      if (editandoId) { await libroService.updateLibro(editandoId, libroPayload); } 
      else { await libroService.createLibro(libroPayload); }
      resetForm(); cargarLibros();
    } catch (error) { console.error("Error al guardar:", error); }
  };

  const handleEditClick = (libro) => {
    setEditandoId(libro._id);
    setFormData({
      titulo: libro.titulo, nombreAutor: libro.autor.nombre, apellidoAutor: libro.autor.apellido,
      nacionalidadAutor: libro.autor.nacionalidad, precio: libro.precio, cantidad_stock: libro.cantidad_stock
    });
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Eliminar este libro?")) {
      try { await libroService.deleteLibro(id); cargarLibros(); } 
      catch (error) { console.error("Error al eliminar:", error); }
    }
  };

  const resetForm = () => {
    setEditandoId(null);
    setFormData({ titulo: '', nombreAutor: '', apellidoAutor: '', nacionalidadAutor: '', precio: '', cantidad_stock: '' });
  };

  // --- INTERFAZ (El cambio radical de estilo) ---
  return (
    <>
      {/* Estilos CSS incrustados para el efecto Glassmorphism y degradado */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Degradado de fondo */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          min-height: 100vh;
        }

        .glass-container {
          background: rgba(255, 255, 255, 0.7); /* Fondo blanco traslúcido */
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px); /* Efecto desโฟกัส (cristal) */
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 30px;
          margin-bottom: 30px;
        }

        .form-section-title {
          font-size: 1.1rem;
          color: #4a148c;
          margin-bottom: 15px;
          display: block;
          border-bottom: 2px solid rgba(118, 75, 162, 0.3);
          padding-bottom: 5px;
        }

        .grid-campos {
          display: grid;
          grid-templateColumns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }

        .input-glass {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(200, 200, 200, 0.5);
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 1rem;
          color: #333;
          transition: all 0.3s ease;
        }

        .input-glass:focus {
          outline: none;
          border-color: #764ba2;
          box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.2);
          background: rgba(255, 255, 255, 1);
        }

        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.2s ease;
        }

        .btn:active { transform: scale(0.98); }

        .btn-primary {
          background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
        }

        .btn-primary:hover { box-shadow: 0 6px 20px rgba(106, 17, 203, 0.5); }

        .btn-secondary {
          background: rgba(108, 117, 125, 0.2);
          color: #333;
          margin-left: 10px;
        }
        .btn-secondary:hover { background: rgba(108, 117, 125, 0.3); }

        /* Estilos Tabla */
        .tabla-glass {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px; /* Espacio entre filas */
        }

        .tabla-glass thead tr {
          background-color: rgba(74, 20, 140, 0.8);
          color: white;
        }

        .tabla-glass th { padding: 15px; text-align: left; }
        .tabla-glass th:first-child { border-radius: 8px 0 0 8px; }
        .tabla-glass th:last-child { border-radius: 0 8px 8px 0; }

        .tabla-glass tbody tr {
          background: rgba(255, 255, 255, 0.5);
          transition: background 0.2s ease;
        }

        .tabla-glass tbody tr:hover { background: rgba(255, 255, 255, 0.8); }

        .tabla-glass td { padding: 15px; border-top: 1px solid rgba(255,255,255,0.3); border-bottom: 1px solid rgba(255,255,255,0.3); }
        .tabla-glass td:first-child { border-left: 1px solid rgba(255,255,255,0.3); border-radius: 8px 0 0 8px; }
        .tabla-glass td:last-child { border-right: 1px solid rgba(255,255,255,0.3); border-radius: 0 8px 8px 0; }

        .action-btn {
          background: none; border: none; cursor: pointer; font-size: 1.2rem; padding: 5px; opacity: 0.7; transition: opacity 0.2s;
        }
        .action-btn:hover { opacity: 1; }
      `}</style>

      {/* CONTENEDOR PRINCIPAL */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)', marginBottom: '40px' }}>
          📚 Panel de Inventario de Librería
        </h1>

        {/* FORMULARIO: EFECTO CRISTAL (Ya no es un bloque blanco puro) */}
        <div className="glass-container">
          <h2 style={{ marginTop: 0, color: '#4a148c', marginBottom: '25px' }}>
            {editandoId ? '📝 Editar Libro' : '➕ Añadir Nuevo Título'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid-campos">
              {/* Grupo 1: Libro */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <span className="form-section-title">📖 Detalles del Libro</span>
                <input className="input-glass" type="text" name="titulo" placeholder="Título del libro" value={formData.titulo} onChange={handleInputChange} required />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input className="input-glass" style={{ flex: 1 }} type="number" step="0.01" name="precio" placeholder="Precio ($)" value={formData.precio} onChange={handleInputChange} required />
                  <input className="input-glass" style={{ flex: 1 }} type="number" name="cantidad_stock" placeholder="Stock" value={formData.cantidad_stock} onChange={handleInputChange} required />
                </div>
              </div>

              {/* Grupo 2: Autor (Separado visualmente pero en el mismo form) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <span className="form-section-title">👤 Datos del Autor</span>
                <input className="input-glass" type="text" name="nombreAutor" placeholder="Nombre(s)" value={formData.nombreAutor} onChange={handleInputChange} required />
                <input className="input-glass" type="text" name="apellidoAutor" placeholder="Apellido(s)" value={formData.apellidoAutor} onChange={handleInputChange} required />
                <select className="input-glass" name="nacionalidadAutor" value={formData.nacionalidadAutor} onChange={handleInputChange} required>
                  <option value="" disabled>Selecciona la nacionalidad</option>
                  {NACIONALIDADES.map((nac) => <option key={nac.value} value={nac.value}>{nac.label}</option>)}
                </select>
              </div>
            </div>

            {/* BOTONES */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px', textAlign: 'right' }}>
              <button type="submit" className="btn btn-primary">
                {editandoId ? 'Actualizar Registro' : 'Guardar en Inventario'}
              </button>
              {editandoId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancelar</button>}
            </div>
          </form>
        </div>

        {/* TABLA: También con efecto flotante */}
        <div className="glass-container" style={{ padding: '20px' }}>
          <h3 style={{ marginTop: 0, color: '#4a148c' }}>Listado Actual</h3>
          <table className="tabla-glass">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Nacionalidad</th>
                <th>Precio</th>
                <th>Stock</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {libros.map((libro) => (
                <tr key={libro._id}>
                  <td style={{ fontWeight: '600', color: '#2c3e50' }}>{libro.titulo}</td>
                  <td>{`${libro.autor.nombre} ${libro.autor.apellido}`}</td>
                  <td>{libro.autor.nacionalidad}</td>
                  <td style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1.1rem' }}>${libro.precio.toFixed(2)}</td>
                  <td>{libro.cantidad_stock} <span style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>uds.</span></td>
                  <td style={{ textAlign: 'center', minWidth: '100px' }}>
                    <button onClick={() => handleEditClick(libro)} className="action-btn" title="Editar">✏️</button>
                    <button onClick={() => handleDeleteClick(libro._id)} className="action-btn" style={{ color: '#e74c3c' }} title="Eliminar">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;