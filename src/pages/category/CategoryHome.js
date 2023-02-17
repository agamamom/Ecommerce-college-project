import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/category-page/Sidebar";
import ListProductType from "../../components/category-page/ListProductType";
import { Breadcrumb } from "antd";
import BreadcrumbComponent from "../../components/breadcrumb/Breadcrumb";
import ScrollToTop from "react-scroll-to-top";

const CategoryHome = () => {
  const { slug } = useParams();

  const slugToString = JSON.stringify(slug);

  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      setCategory(c.data.products);
    });
    window.scrollTo(0, 0);
  }, [slug]);

  const breadCrumb = () => {
    return (
      <div className="py-[50px] flex justify-between items-center relative z-[2px]">
        <div className="text-[30px] uppercase">Category</div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/category/${slug}`}>{slug}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  };

  return (
    <div>
      <BreadcrumbComponent>{breadCrumb()}</BreadcrumbComponent>
      <div className="px-[45px] mt-[40px]">
        <div className="grid grid-cols-5 gap-7">
          <div className="col-span-1 w-full ">
            <Sidebar />
          </div>
          <div className="col-span-4 w-full ">
            <ListProductType slug={slug} allProductByCategory={category} />
          </div>
        </div>
      </div>
      <ScrollToTop smooth />
    </div>
  );
};

export default CategoryHome;
