import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useNavigate, useParams } from "react-router-dom";

const SubUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  let { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        navigate("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="flex">
        <div className="w-[300px] fixed text-[20px] admin-nav">
          <AdminNav />
        </div>
        <main class="main-wrap">
          <section class="content-main">
            <div className="">
              {loading ? (
                <h4 className="text-danger">Loading..</h4>
              ) : (
                <h4>Update sub category</h4>
              )}

              <div className="form-group">
                <label>Parent category</label>
                <select
                  name="category"
                  className="form-control"
                  onChange={(e) => setParent(e.target.value)}
                >
                  <option>Please select</option>
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option
                        key={c._id}
                        value={c._id}
                        selected={c._id === parent}
                      >
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SubUpdate;
