import { TableBannerComponent } from "@/components/table-banners";

export default function GerenciarBanners() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Meus Banners</h1>

      <div className="pt-10">
        <TableBannerComponent />
      </div>
    </div>
  );
}
