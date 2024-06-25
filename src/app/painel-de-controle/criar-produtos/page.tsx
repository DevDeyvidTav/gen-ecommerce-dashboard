import { RegisterProductsComponent } from "@/components/register-products";

export default function CriarProdutos() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Adição de Produtos </h1>

      <div className="pt-10">
        <h1 className="pb-5">Preencha os campos:</h1>
        <RegisterProductsComponent />
      </div>
    </div>
  );
}
