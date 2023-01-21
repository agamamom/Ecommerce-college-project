import React, { useState, useEffect } from "react";
import { getCategories } from "../../functions/category";
import { Link } from "react-router-dom";
import { getBrands } from "../../functions/product";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

const { SubMenu, ItemGroup } = Menu;

const SidebarShopFilter = ({
  handleSlider,
  price,
  setPrice,
  fetchProducts,
  categoryIds,
  setCategoryIds,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  }, []);

  useEffect(() => {
    getBrands().then((c) => {
      setBrands(c.data);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  return (
    <>
      <div className=" pt-2">
        <h4>Search/Filter</h4>
        <hr />

        <Menu defaultOpenKeys={["1", "2"]} mode="inline">
          {/* price */}
          <SubMenu
            key="1"
            title={
              <div className="flex items-baseline">
                <DollarOutlined />
                <span>Price</span>
              </div>
            }
          >
            <div>
              <Slider
                className="ml-4 mr-4"
                tipFormatter={(v) => `$${v}`}
                range
                value={price}
                onChange={handleSlider}
                max="4999"
              />
            </div>
          </SubMenu>

          {/* category */}
          <SubMenu
            key="2"
            title={
              <div className="flex items-center">
                <DownSquareOutlined />
                <span className="">Categories</span>
              </div>
            }
          >
            <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
          </SubMenu>
        </Menu>
      </div>
    </>
  );
};

export default SidebarShopFilter;
