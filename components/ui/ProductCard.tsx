"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { ApiProduct } from "@/types/api-product";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: ApiProduct }) {
  const setCount = useCart((state) => state.setCount);
  const triggerFlyToCart = useAnimationStore((state) => state.triggerFlyToCart);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_BASE_URL = API_URL?.replace("/api", "") || "";

  const productId = product.inventory_item_id;
  const productLinkId = product.inventory_item_id;

  const getImageUrl = (image: string | null) => {
    if (!image) return "/img/placeholder.jpg";
    if (image.startsWith("http")) return image;
    return `${API_BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("access");

    console.log("PRODUCT CARD ADD TO CART DEBUG:", {
      fullProduct: product,
      sentInventoryItemId: product.inventory_item_id,
      sentProductId: product.product_id,
      sentBranchId: product.outlet_id ?? null,
    });

    if (!token) {
      localStorage.setItem("redirect_after_login", `/product/${productLinkId}`);
      router.push("/login");
      return;
    }

    try {
      setIsAdding(true);

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        triggerFlyToCart(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
      }

      const res = await fetch(`${API_URL}/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
          branch_id: product.outlet_id ?? null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to add to cart.");
      }

      const totalCount = Array.isArray(data.items)
        ? data.items.reduce(
            (sum: number, item: { quantity: number }) =>
              sum + Number(item.quantity || 0),
            0
          )
        : 0;

      setCount(totalCount);

      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error instanceof Error ? error.message : "Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link
      href={`/product/${productLinkId}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-[#f8fafc]">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>

      <div className="p-3.5">
        <h3 className="text-[15px] font-semibold text-[#2f8f83]">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {product.description || "No description"}
        </p>

        <p className="mt-2 text-lg font-bold text-slate-900">
          {formatPrice(product.price)}
        </p>

        <p className="text-xs text-slate-400">Stock: {product.quantity}</p>

        <div className="mt-3 flex justify-end" ref={buttonRef}>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex h-9 w-9 items-center justify-center rounded-full border ${
              isAnimating
                ? "bg-[#2f8f83] text-white"
                : "bg-white text-slate-500 hover:bg-[#de922f] hover:text-white"
            } ${isAdding ? "cursor-not-allowed opacity-60" : ""}`}
          >
            <ShoppingCart className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </Link>
  );
}