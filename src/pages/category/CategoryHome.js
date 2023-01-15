import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      console.log(JSON.stringify(c.data, null, 4));
      setCategory(c.data);
    });
  }, []);

  return (
    <div className="px-[45px] mt-[40px]">
      <div className="mb-[20px]">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/category/${slug}`}>{slug}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-5 gap-7">
        <div className="col-span-1 w-full bg-slate-500 h-[500px]"></div>
        <div className="col-span-4 w-full bg-pink-400 h-[500px]"></div>
      </div>
    </div>
  );
};

export default CategoryHome;
