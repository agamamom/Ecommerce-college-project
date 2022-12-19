import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav/AdminNav";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LocalSearch from "../../components/forms/LocalSearch";

const AdminDashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");
  let stt = 1;
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="">
        <AdminNav />
      </div>
      <main class="main-wrap">
        <section class="content-main">
          <div class="content-header">
            <div>
              <h2 class="content-title card-title">Categories </h2>
              <p>Add, edit or delete a category</p>
            </div>
            <div>
              {/* <input
                type="text"
                placeholder="Search Categories"
                class="form-control bg-white"
              /> */}
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                  <form
                    className="form-create-category"
                    onSubmit={handleSubmit}
                  >
                    <div class="mb-4">
                      <label for="product_name" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        class="form-control"
                        id="product_name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div class="mb-4">
                      <label class="form-label">Description</label>
                      <textarea
                        placeholder="Type here"
                        class="form-control"
                      ></textarea>
                    </div>
                    <div class="d-grid">
                      <button class="btn btn-primary w-full">
                        Create category
                      </button>
                    </div>
                  </form>
                </div>
                <div class="col-md-9">
                  <div
                    class="table-responsive"
                    style={{ overflowX: "visible" }}
                  >
                    <table class="table table-hover table-categories">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th class="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.filter(searched(keyword)).map((c) => (
                          <tr key={c._id}>
                            <td>{stt++}</td>
                            <td>
                              <b>{c.name}</b>
                            </td>
                            <td>Fashions for Women</td>
                            <td>
                              <div className="row">
                                <div className="col">
                                  <span
                                    onClick={() => handleRemove(c.slug)}
                                    className="btn btn-sm float-right"
                                  >
                                    <DeleteOutlined className="text-danger" />
                                  </span>
                                </div>
                                <div className="col">
                                  <Link to={`/admin/category/${c.slug}`}>
                                    <span className="btn btn-sm float-right">
                                      <EditOutlined className="text-warning" />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
