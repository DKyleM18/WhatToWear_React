import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/clothingitems";

export default function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Clothes</p>
        <button className="clothes-section__button">+ Add Clothes</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              // TODO: Pass props
              // onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
