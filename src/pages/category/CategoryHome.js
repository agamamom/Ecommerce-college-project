import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import Sidebar from "../../components/category-page/Sidebar";
import ListProductType from "../../components/category-page/ListProductType";

const CategoryHome = () => {
  const { slug } = useParams();

  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      setCategory(c.data.products);
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
        <div className="col-span-1 w-full ">
          <Sidebar />
        </div>
        <div className="col-span-4 w-full ">
          <ListProductType slug={slug} allProductByCategory={category} />
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
