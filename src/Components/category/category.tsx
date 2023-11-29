import { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';
import './Category.css';

interface CategoryType {
  id: string,
  name: string,
}

type CategoryPropsType = {
  onClick: (categorie: {
    name: string,
    id: string,
  }) => Promise<void>;
};

function Category({ onClick }: CategoryPropsType) {
  const [category, setCategory] = useState<CategoryType[]>([]);

  async function categoryApi() {
    const Categories = await getCategories();
    setCategory(Categories);
  }

  useEffect(() => {
    categoryApi();
  }, []);

  return (
    <aside className="categories-container">
      {category.map((categorie) => (
        <label
          className="categorie-container"
          key={ categorie.id }
          data-testid="category"
        >
          <input
            type="radio"
            id={ categorie.id }
            name="categorie"
            value={ categorie.name }
            onClick={ () => onClick(categorie) }
            className="categorie-radio"
          />
          {categorie.name}
        </label>
      ))}
    </aside>
  );
}

export default Category;
