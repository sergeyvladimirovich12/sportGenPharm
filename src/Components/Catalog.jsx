import React, { useState, useEffect } from "react";
import "./Catalog.css";
import productsData from "../assets/items.json";
import { sendMessage } from "./telegram";

const Catalog = () => {
  const [selectedBrandImages, setSelectedBrandImages] = useState({});
  const [selectedBrandInfo, setSelectedBrandInfo] = useState({});
  const [activeTab, setActiveTab] = useState("AAC");

  useEffect(() => {
    if (productsData.products.length > 0) {
      const initialSelectedBrandImages = {};
      const initialSelectedBrandInfo = {};

      productsData.products.forEach((product) => {
        if (product.variants.length > 0 && product.type === activeTab) {
          // Фильтрация по типу
          const firstVariant = product.variants[0];
          initialSelectedBrandImages[product.name] = firstVariant.image;
          initialSelectedBrandInfo[product.name] = firstVariant;
        }
      });

      setSelectedBrandImages(initialSelectedBrandImages);
      setSelectedBrandInfo(initialSelectedBrandInfo);
    }
  }, [activeTab]);

  const handleBrandClick = (productName, brand) => {
    setSelectedBrandImages((prevImages) => ({
      ...prevImages,
      [productName]: brand.image,
    }));
    setSelectedBrandInfo((prevInfo) => ({
      ...prevInfo,
      [productName]: brand,
    }));
  };

  const getUserIp = async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIp = await getUserIp();
        const message = `новый посетитель сайта, IP: ${userIp}`;
        sendMessage(message);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div className="tab">
        <button
          className={`tab-button ${activeTab === "AAC" ? "active" : ""}`}
          onClick={() => handleTabClick("AAC")}
        >
          AAC
        </button>
        <button
          className={`tab-button ${activeTab === "SARM" ? "active" : ""}`}
          onClick={() => handleTabClick("SARM")}
        >
          SARM
        </button>
      </div>
      <div className="products">
        {productsData.products
          .filter((product) => product.type === activeTab) // Фильтруем продукты по активной вкладке
          .map((product) => (
            <div key={product.name} className="product">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-image">
                {selectedBrandImages[product.name] && (
                  <img
                    src={selectedBrandImages[product.name]}
                    alt={`${product.name} Image`}
                    className="variant-image"
                  />
                )}
              </div>
              <div className="brand-list">
                {product.variants.map((variant) => (
                  <div
                    onClick={() => handleBrandClick(product.name, variant)}
                    key={`${product.name}-${variant.brand}`}
                    className={`brand-item ${
                      selectedBrandImages[product.name] === variant.image &&
                      selectedBrandInfo[product.name]?.brand === variant.brand
                        ? "selected"
                        : ""
                    }`}
                  >
                    <p
                      className={
                        variant.available ? "available" : "unavailable"
                      }
                    >
                      {variant.brand}
                    </p>
                  </div>
                ))}
              </div>
              {selectedBrandInfo[product.name] && (
                <div className="selected-brand-info">
                  {selectedBrandInfo[product.name].brand && (
                    <p className="selected-brand-info__brand">
                      Бренд: {selectedBrandInfo[product.name].brand}
                    </p>
                  )}
                  <p className="selected-brand-info__concentration">
                    Концентрация:{" "}
                    {selectedBrandInfo[product.name].concentration}
                  </p>
                  <p
                    className={`availability ${
                      selectedBrandInfo[product.name].available
                        ? "available"
                        : "unavailable"
                    }`}
                  >
                    {selectedBrandInfo[product.name].available
                      ? "В наличии"
                      : "Нет в наличии"}
                  </p>
                  <p className="selected-brand-info__price">
                    {selectedBrandInfo[product.name].price} ₽
                  </p>
                  <a
                    href="https://t.me/sportGenPharm"
                    target="_blank"
                    className="buy"
                  >
                    Купить
                  </a>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Catalog;
