import { RegisterCategoryComponent } from "@/components/register-category";

export default function CategoriasProdutos() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">
        Categorias dos Produtos
      </h1>
      <div className="pt-10">
        <RegisterCategoryComponent />
      </div>
    </div>
  );
}
