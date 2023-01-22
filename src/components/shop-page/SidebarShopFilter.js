import React, { useState, useEffect } from "react";
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import { Link } from "react-router-dom";
import { getBrands } from "../../functions/product";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import Star from "../../components/forms/Star";

const { SubMenu, ItemGroup } = Menu;

const SidebarShopFilter = ({
  handleSlider,
  price,
  setPrice,
  fetchProducts,
  categoryIds,
  setCategoryIds,
  setStar,
  star,
  setSub,
  sub,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subs, setSubs] = useState([]);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
    getSubs().then((res) => setSubs(res.data));
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
    setStar("");
    setSub("");
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

    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    fetchProducts({ sub, categoryIds });
  };

  return (
    <>
      <div className=" pt-2">
        <h4>Search/Filter</h4>
        <hr />

        <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode="inline">
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
                max="999"
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

          {/* stars */}
          <SubMenu
            key="3"
            title={
              <div className="flex items-center">
                <StarOutlined />
                <span className="">Rating</span>
              </div>
            }
          >
            <div style={{ maringTop: "-10px" }}>{showStars()}</div>
          </SubMenu>

          {/* sub category */}
          <SubMenu
            key="4"
            title={
              <div className="flex items-center">
                <DownSquareOutlined />
                <span className="">Sub Categories</span>
              </div>
            }
          >
            <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
              {showSubs()}
            </div>
          </SubMenu>
        </Menu>
      </div>
    </>
  );
};

export default SidebarShopFilter;
