import { ReactElement, useEffect, useState } from "react"
import { CategoryCard } from "../../components/Card"
import { axiosInstance } from "../../api/axiosInstance";
import "./styles.scss";

//interface

interface Category {
  CategoryID: number,
  CategoryName: string,
  Description: string,
  Image: string,
  CreateOn: string
}

export const Category = (): ReactElement => {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
      axiosInstance.get("/api/categories")
      .then((response: any) => setCategories(response.data))
      .catch((error: any) => console.error("Get categories is failed with details: ", error.data));
    }, []);

    return  <div className="category-wrapper">
      <h1 className="title">Category</h1>
      <div className="category">
        { categories?.map(cate => <CategoryCard key={cate.CategoryID} title={cate.CategoryName} description={cate.Description} image={cate.Image}/>) }
      </div>
    </div>
}