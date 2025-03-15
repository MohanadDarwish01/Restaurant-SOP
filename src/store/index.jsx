// Global state

import { create } from "zustand";
import img from '../assets/imgs/category/wok.png'
import { data } from "react-router-dom";







// init state
export const useCategoriesData = create((set) => (
    {

        domain: "http://localhost:1337",
        data: [
            // { documentId: 1, name: "Cold Drinks", path: "cold", catImg: img },
            // { documentId: 2, name: "Burgers", path: "burgers", catImg: img },
            // { documentId: 3, name: "Pizza", path: "pizza", catImg: img },
            // { documentId: 4, name: "Wok", path: "wok", catImg: img },
            // { documentId: 5, name: "Desserts", path: "desserts", catImg: img },
            // { documentId: 6, name: "Pasta", path: "pasta", catImg: img },
        ],


        active_cat_id: 0,
        setData: (categories) => (set(() => ({ data: categories }))),
        setActiveId: (activeTab) => (set(() => ({ active_cat_id: activeTab }))),
        resetActiveId: () => (set(() => ({ active_cat_id: 0 }))),
    }
))


export const useCart = create((set) => ({
    cartIndex: false,
    checkOutIndex: false,


    productsInCart: [],


    openCheckOut: () => (set(() => ({ checkOutIndex: true }))),
    closeCheckOut: () => (set(() => ({ checkOutIndex: false }))),


    openCart: () => (set(() => ({ cartIndex: true }))),
    closeCart: () => (set(() => ({ cartIndex: false }))),

    decrementQty: (documentId) => (set((state) => {
        let copyArray = [...state.productsInCart];
        let index = copyArray.findIndex((el) => (el.id == documentId));
        if (copyArray[index].qty > 1) {
            copyArray[index].qty--;
        } else {
            copyArray.splice(index, 1)
        }
        return { productsInCart: copyArray };
    })),

    incrementQty: (documentId) => (set((state) => {
        let copyArray = [...state.productsInCart];
        let index = copyArray.findIndex((el) => (el.id == documentId));
        copyArray[index].qty++;

        return { productsInCart: copyArray };
    })),


    addToCart: (product) => (set((state) => {
        let copy = [...state.productsInCart];
        let obj = copy.find((el) => (el.id == product.id));
        if (obj) {
            state.incrementQty(product.id)
        } else {
            copy.push(product)
        }
        return { productsInCart: copy };

    })),

    resetCart: () => (set(() => ({ productsInCart: [] }))),

}))


export const useInvoiceDetails = create((set) => ({
    index: false,
    activeInvoiceId: null,

    openDetails: () => (set(() => ({ index: true }))),
    closeDetails: () => (set(() => ({ index: false }))),

    setActiveId: (id) => (set(() => ({activeInvoiceId: id}))),
    reSetActiveId: () => (set(() => ({activeInvoiceId: null}))),
}))