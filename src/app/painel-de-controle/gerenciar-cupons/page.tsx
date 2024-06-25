import { TableCouponComponent } from "@/components/table-coupon";

export default function GerenciarCupons() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">
        Meus Cupons de Desconto 
      </h1>

      <div className="pt-10">
        <TableCouponComponent />
      </div>
    </div>
  );
}
