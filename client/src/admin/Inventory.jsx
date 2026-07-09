import React, { useEffect, useState } from "react";
import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory
} from "../services/inventoryService";

function Inventory() {
  const [inventory,setInventory] = useState([]);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("All");
  const [loading,setLoading] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [editItem,setEditItem] = useState(null);
  const [form,setForm] = useState({
    name:"",
    type:"Base",
    stock:"",
    threshold:"",
    unit:"Units"
  });

  useEffect(()=>{
    fetchInventory();
  },[]);

  const fetchInventory = async()=>{
    try{
      const data = await getInventory();
      setInventory(data.inventory);
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  // Input Change
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  // Add Inventory
  const handleAdd=async()=>{
    try{
      await addInventory(form);
      setShowModal(false);
      setForm({
        name:"",
        type:"Base",
        stock:"",
        threshold:"",
        unit:"Units"
      });
      fetchInventory();
    }
    catch(error){
      console.log(error);
    }
  };

  // Update Stock
  const handleUpdate=async()=>{
    try{
      await updateInventory(
        editItem._id,
        {
          stock:Number(editItem.stock),
          threshold:Number(editItem.threshold)
        }
      );
      setEditItem(null);
      fetchInventory();
    }
    catch(error){
      console.log(error);
    }
  };

  // Delete
  const handleDelete=async(id)=>{
    if(window.confirm("Delete this item?")){
      await deleteInventory(id);
      fetchInventory();
    }
  };

  // Search + Filter
  const filteredInventory = inventory.filter((item)=>{
    const matchSearch = item.name
    .toLowerCase()
    .includes(search.toLowerCase());
    const matchFilter =
    filter==="All" ||
    item.type===filter;
    return matchSearch && matchFilter;
  });

  if(loading)
  return (
    <h4 className="text-center mt-5">
      Loading Inventory...
    </h4>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>
          Inventory Management
        </h2>
        <button
          className="btn btn-success"
          onClick={()=>setShowModal(true)}
        >
          + Add Item
        </button>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search inventory..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >
            <option value="All">
              All
            </option>
            <option>
              Base
            </option>
            <option>
              Sauce
            </option>
            <option>
              Cheese
            </option>
            <option>
              Topping
            </option>
            <option>
              Meat
            </option>
            <option>
              Spice
            </option>
            <option>
              Beverage
            </option>
            <option>
              Side
            </option>
          </select>
        </div>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Stock</th>
            <th>Threshold</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredInventory.map((item)=>(
              <tr
                key={item._id}
                className={
                  item.stock <= item.threshold
                  ?
                  "table-danger"
                  :
                  ""
                }
              >
                <td>
                  {item.name}
                </td>
                <td>
                  {item.type}
                </td>
                <td>
                  {item.stock}
                </td>
                <td>
                  {item.threshold}
                </td>
                <td>
                  {
                    item.stock <= item.threshold
                    ?
                    <span className="badge bg-danger">
                      Low Stock
                    </span>
                    :
                    <span className="badge bg-success">
                      Available
                    </span>
                  }
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={()=>setEditItem(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={()=>handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* ADD MODAL */}
      {
        showModal &&
        <div className="modal show d-block"
          style={{background:"rgba(0,0,0,0.5)"}}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>
                  Add Inventory
                </h5>
                <button
                  className="btn-close"
                  onClick={()=>setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <select
                  className="form-select mb-2"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Base</option>
                  <option>Sauce</option>
                  <option>Cheese</option>
                  <option>Topping</option>
                  <option>Meat</option>
                  <option>Spice</option>
                  <option>Beverage</option>
                  <option>Side</option>
                </select>
                <input
                  className="form-control mb-2"
                  placeholder="Stock"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Threshold"
                  name="threshold"
                  value={form.threshold}
                  onChange={handleChange}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Unit"
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={()=>setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleAdd}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {/* EDIT MODAL */}
      {
        editItem &&
        <div className="modal show d-block"
          style={{background:"rgba(0,0,0,0.5)"}}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>
                  Update Inventory
                </h5>
                <button
                  className="btn-close"
                  onClick={()=>setEditItem(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  value={editItem.stock}
                  onChange={(e)=>
                    setEditItem({
                      ...editItem,
                      stock:e.target.value
                    })
                  }
                />
                <input
                  className="form-control mb-2"
                  value={editItem.threshold}
                  onChange={(e)=>
                    setEditItem({
                      ...editItem,
                      threshold:e.target.value
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={()=>setEditItem(null)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Inventory;