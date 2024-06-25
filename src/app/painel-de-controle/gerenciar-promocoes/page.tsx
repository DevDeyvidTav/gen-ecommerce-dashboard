import { ProductWithPromotionComponent } from "@/components/product-with-promotion";

export default function GerenciarPromocoes() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">
        Produtos em Promocão
      </h1>

      <div>
        <ProductWithPromotionComponent />
      </div>
    </div>
  );
}
