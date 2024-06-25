import { PromotionProductsComponent } from "@/components/promotion-products";

export default function CriarPromocoes() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">
        Adicionar Promoções
      </h1>

      <div className="pt-10">
        <h1 className="pb-5 font-semibold">
          selecione o produto para adicionar promocão:
        </h1>
        <PromotionProductsComponent />
      </div>
    </div>
  );
}
