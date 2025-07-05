// import { useEffect } from 'react'
import './categories.css'
import { useNavigate } from 'react-router-dom'
// import ProductService from '../../api-service/product.service'
import ProductService from "sharedApp/ProductService";
// import Loading from '../loading/loading'
import React, { useEffect, Suspense } from 'react';

const Loading = React.lazy(() => import("sharedApp/Loading"));

function Categories() {

    const { getAllCategories, isLoading, categories, error } = ProductService()
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories()
    }, [])

    const onExplore = (id, name) => {
        navigate(`/products/${name}`, { state: { categoryId: id } })
    }

    return (
        <section class="banner-container">
            <h1>Browse wellness by categories</h1>

            {/* {isLoading && <Loading />} */}
            <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
                {isLoading && <Loading />}
            </Suspense>

            {
                categories.map((category) => {
                    return (
                        <div class="banner" key={category.id}>
                            <img src={`http://localhost:3001/categories/${category.imageUrl}`} alt="" />
                            <div class="b-content">
                                <h3>{category.categoryName}</h3>
                                <p>{category.description}</p>
                                <button onClick={() => onExplore(category.id, category.categoryName)}>Explore Now</button>
                            </div>
                        </div>
                    )
                })
            }

        </section>
    )
}


export default Categories;