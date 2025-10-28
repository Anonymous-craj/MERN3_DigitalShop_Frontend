import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import Card from "./components/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/productSlice";

function Product() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
        <section
          id="Products"
          className="
            max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10
            grid justify-center gap-8
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {products.length > 0 &&
            products.map((product) => (
              <Card key={String(product?.id)} product={product} />
            ))}
        </section>
      </div>
    </>
  );
}

export default Product;
