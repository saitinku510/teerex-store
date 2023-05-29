import ProductCard from "components/productCard/index";
import { Filter, Search } from "constants/index";
import { ShoppingCardContext } from "contextAPI/index";
import React, { useContext, useEffect, useState } from "react";
import { getShoppingList } from "services/api";

import "./home.scss";

const Home = () => {
  const { cartList, setCartList, cardList, setCardList } =
    useContext(ShoppingCardContext);

  const [filteredCardList, setFilteredCardList] = useState(cardList);
  const [searchValue, setSearchValue] = useState("");

  const [colorFilterTypes, setColorFilterTypes] = useState([]);
  const [genderFilterTypes, setGenderFilterTypes] = useState([]);

  const [allFilterData, setAllFilterData] = useState([]);

  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      if (!openFilters) {
        document.getElementsByClassName("productFilters")[0].style.display = "none";
      } else {
        document.getElementsByClassName("productFilters")[0].style.display = "flex";
      }
    }
  }, [openFilters, window.innerWidth]);

  useEffect(() => {
    if (!cardList?.length) {
      fetchCardsList();
    }
  }, []);

  const fetchCardsList = async () => {
    const data = await getShoppingList();
    const filtering = data.map((item) => ({ ...item, usedQuantity: 0 }));
    setCardList(filtering);
    setFilteredCardList(filtering);
  };

  const addToCart = (cardDetail, cardId) => {
    const clonedFilter = JSON.parse(JSON.stringify(filteredCardList));
    const overallCardsList = JSON.parse(JSON.stringify(cardList));
    const clonedCart = JSON.parse(JSON.stringify(cartList));
    overallCardsList[cardId] = cardDetail;
    clonedFilter[cardId] = cardDetail;
    setCardList(overallCardsList);
    setFilteredCardList(clonedFilter);
    const filterUniq = clonedCart.filter((item) => item.id === cardDetail.id);
    if (filterUniq.length) {
      const index = clonedCart.findIndex((item) => item.id === cardDetail.id);
      if (cardDetail.usedQuantity > 0) {
        clonedCart[index] = cardDetail;
        setCartList(clonedCart);
      } else {
        clonedCart.splice(index, 1);
        setCartList(clonedCart);
      }
    } else {
      setCartList([...cartList, cardDetail]);
    }
  };

  const searchSetter = (filter, value) => {
    const filteredNameList = filter.length
      ? filter.filter((item) =>
          item.name.trim().toLowerCase().includes(value.trim().toLowerCase())
        )
      : [];
    const filteredColorList = filter.length
      ? filter.filter((item) =>
          item.color.trim().toLowerCase().includes(value.trim().toLowerCase())
        )
      : [];

    setFilteredCardList(
      removeDuplicatesById([...filteredNameList, ...filteredColorList])
    );
  };

  const handleSearch = (value) => {
    setSearchValue(value);

    if (value && !allFilterData?.length) {
      searchSetter(cardList, value);
    } else if (allFilterData?.length) {
      searchSetter(allFilterData, value);
    } else {
      setFilteredCardList([...cardList]);
    }
  };

  const removeDuplicatesById = (list) => {
    const uniqueProperty = "id";
    const filteredList = [];
    const tempList = [...list];

    tempList.forEach((obj) => {
      const isDuplicate = filteredList.some(
        (item) => item[uniqueProperty] === obj[uniqueProperty]
      );

      if (!isDuplicate) {
        filteredList.push(obj);
      }
    });
    return filteredList;
  };

  const filterChecker = (event, value, setValue) => {
    let temp = [];
    const { name, checked } = event;

    if (checked && !value.includes(name)) {
      temp = [...value, name];
      setValue(temp);
    } else {
      if (value.includes(name)) {
        temp = value.filter((type) => type !== name);
        setValue(temp);
      }
    }
    return temp;
  };

  const filterType = (temp, typeGroup, type1, type2) => {
    const tempFilterType = cardList.filter((product) =>
      typeGroup.includes(product[type1])
    );
    let tempFilter = [];
    if (typeGroup.length) {
      tempFilter = tempFilterType.filter((product) => temp.includes(product[type2]));
    } else {
      tempFilter = cardList.filter((product) => temp.includes(product[type2]));
    }

    setFilteredCardList(tempFilter);

    setAllFilterData(removeDuplicatesById([...allFilterData, ...tempFilter]));
  };

  const handleColorFilterType = (e) => {
    const temp = filterChecker(e.target, colorFilterTypes, setColorFilterTypes);
    if (temp.length) {
      filterType(temp, genderFilterTypes, "gender", "color");
    } else {
      setAllFilterData([]);
      setFilteredCardList(cardList);
    }
  };

  const handleGenderFilterType = (e) => {
    const temp = filterChecker(e.target, genderFilterTypes, setGenderFilterTypes);

    if (temp.length) {
      filterType(temp, colorFilterTypes, "color", "gender");
    } else {
      setAllFilterData([]);
      setFilteredCardList(cardList);
    }
  };

  return (
    <>
      <section className="product">
        <div className="container">
          <div className="productContent">
            <div className="productFilters">
              <div>
                <h3>Color</h3>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="Red"
                      id="Red"
                      checked={colorFilterTypes.includes("Red")}
                      onChange={handleColorFilterType}
                    />
                    <label htmlFor="Red">Red</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Blue"
                      id="Blue"
                      checked={colorFilterTypes.includes("Blue")}
                      onChange={handleColorFilterType}
                    />
                    <label htmlFor="Blue">Blue</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Green"
                      id="Green"
                      checked={colorFilterTypes.includes("Green")}
                      onChange={handleColorFilterType}
                    />
                    <label htmlFor="Green">Green</label>
                  </li>
                </ul>
              </div>
              <div>
                <h3>Gender</h3>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="Men"
                      id="Men"
                      checked={genderFilterTypes.includes("Men")}
                      onChange={handleGenderFilterType}
                    />
                    <label htmlFor="Men">Men</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Women"
                      id="Women"
                      checked={genderFilterTypes.includes("Women")}
                      onChange={handleGenderFilterType}
                    />
                    <label htmlFor="Women">Women</label>
                  </li>
                </ul>
              </div>
              {/* <div>
                <h3>Price</h3>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="0-Rs250"
                      id="0-Rs250"
                      // checked={genderFilterTypes.includes("0-250")}
                      onChange={handleGenderFilterType}
                    />
                    <label htmlFor="0-Rs250">0-Rs250</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Rs251-450"
                      id="Rs251-450"
                      // checked={genderFilterTypes.includes("251-450")}
                      onChange={handleGenderFilterType}
                    />
                    <label htmlFor="Rs251-450">Rs251-450</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Rs450"
                      id="Rs450"
                      // checked={genderFilterTypes.includes("251-450")}
                      onChange={handleGenderFilterType}
                    />
                    <label htmlFor="Rs450">Rs 450</label>
                  </li>
                </ul>
              </div>
              <div>
                <h3>Type</h3>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="Polo"
                      id="Polo"
                      checked={genderFilterTypes.includes("Polo")}
                      onChange={handleTypeFilterType}
                    />
                    <label htmlFor="Polo">Polo</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Hoodie"
                      id="Hoodie"
                      checked={genderFilterTypes.includes("Hoodie")}
                      onChange={handleTypeFilterType}
                    />
                    <label htmlFor="Hoodie">Hoodie</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Basic"
                      id="Basic"
                      checked={genderFilterTypes.includes("Basic")}
                      onChange={handleTypeFilterType}
                    />
                    <label htmlFor="Basic">Basic</label>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="productContainer">
              <div className="productSearch">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="svgWrapper">
                  <Search />
                </div>
                <div
                  className="svgWrapper filter"
                  onClick={() => setOpenFilters(!openFilters)}
                >
                  <Filter />
                </div>
              </div>

              <div className="productCards">
                {filteredCardList.map((card, index) => (
                  <ProductCard
                    key={index}
                    cardDetails={card}
                    addToCart={addToCart}
                    cardId={index}
                  />
                ))}

                <div className="dummy"></div>
                <div className="dummy"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
