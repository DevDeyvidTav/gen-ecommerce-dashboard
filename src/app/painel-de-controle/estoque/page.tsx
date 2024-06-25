import { RegisterVariantsComponent } from "@/components/register-variants";

export default function Estoque() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Adição de Estoque</h1>

      <div className="pt-10">
        <h1 className="text-xl font-semibold mb-5">
          Adicione variações aos produtos
        </h1>
        <RegisterVariantsComponent />
      </div>
    </div>
  );
}
