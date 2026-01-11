import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data));
  }, []);

  const addProduct = () => {
    axios.post("http://localhost:3000/products", {
      id, name, quantity: qty, price
    }).then(() => window.location.reload());
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`)
      .then(() => window.location.reload());
  };

  return (
    <div>
      <h3>Product CRUD</h3>

      <input placeholder="Id" onChange={e => setId(e.target.value)} /><br/>
      <input placeholder="Name" onChange={e => setName(e.target.value)} /><br/>
      <input placeholder="Qty" onChange={e => setQty(e.target.value)} /><br/>
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} /><br/>

      <button onClick={addProduct}>Add</button>

      <hr/>

      {products.map(p => (
        <div key={p.id}>
          {p.id} - {p.name} - {p.quantity} - {p.price}
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;