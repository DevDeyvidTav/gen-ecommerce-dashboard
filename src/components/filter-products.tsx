import { Select } from "antd";

interface Props {
  category: any;
  setFilter: any;
}
export function FilterProductsComponent({ category, setFilter }: Props) {
  return (
    <div className="mt-5 ml-[0.6rem] flex gap-2 items-center">
      <div className="grid grid-cols-2 w-full gap-3 mr-5">
        <div className="flex gap-2 items-center">
          <label className="">Filtros: </label>
          <Select
            className="w-1/2"
            placeholder="Selecione a categoria"
            onChange={(value) => setFilter(value)}
            options={category.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
