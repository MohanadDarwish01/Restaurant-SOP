// Global state

import { create } from "zustand";
import img from '../assets/imgs/category/wok.png'







// init state
export const useCategoriesData = create((set) => (
    {
        categories: [
            { documentId: 1, name: "Cold Drinks", path: "cold", catImg: img },
            { documentId: 2, name: "Burgers", path: "burgers", catImg: img },
            { documentId: 3, name: "Pizza", path: "pizza", catImg: img },
            { documentId: 4, name: "Wok", path: "wok", catImg: img },
            { documentId: 5, name: "Desserts", path: "desserts", catImg: img },
            { documentId: 6, name: "Pasta", path: "pasta", catImg: img },
        ],

        active_cat_id: 0,
        setActiveId: (activeTab) => (set(() => ({ active_cat_id: activeTab }))),
        resetActiveId: ()=>(set(() => ({active_cat_id: 0}))),
    }
))