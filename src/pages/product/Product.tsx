import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import Card from "./components/Card";
import ProductSkeleton from "./components/ProductSkeleton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/productSlice";
import { Status } from "../../globals/types/type";
import { motion } from "framer-motion";

const Product = () => {
  const { products, status } = useAppSelector((store) => store.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl">Featured Products</h1>
      </div>

      {/* ✅ Loading Skeletons */}
      {status === Status.LOADING && (
        <section
          id="ProductSkeletons"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </section>
      )}

      {/* ✅ Error State */}
      {status === Status.ERROR && (
        <p className="text-center text-red-500 mt-10">
          Failed to load products. Please try again later.
        </p>
      )}

      {/* ✅ Success State */}
      {status === Status.SUCCESS && products.length > 0 && (
        <section
          id="Products"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card key={product.id} product={product} />
            </motion.div>
          ))}
        </section>
      )}

      {/* ✅ Empty State */}
      {status === Status.SUCCESS && products.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No products available at the moment.
        </p>
      )}
    </div>
  );
};

export default Product;
