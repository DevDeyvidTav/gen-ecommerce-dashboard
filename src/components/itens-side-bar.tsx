import { MenuProps } from "antd";
import Link from "next/link";

import {
  AppstoreOutlined,
  ProductOutlined,
  PieChartOutlined,
  FormOutlined,
  FireOutlined,
  NotificationOutlined,
  LineChartOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FileImageOutlined,
  FundOutlined,
  PictureOutlined,
  QrcodeOutlined,
  ShoppingOutlined,
  TagsOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  PieChartFilled
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export function ItensComponet(collapsed: any) {
  const items: MenuItem[] = [
    getItem(
      <Link href={"/"}>
        {collapsed ? (
          "Painel de Controle"
        ) : (
          <div className="text-primary">Painel de Controle</div>
        )}
      </Link>,
      "painel-de-controle",
      <div>
        <AppstoreOutlined
          style={{ fontSize: "24px" }}
          className="text-primary"
        />
      </div>
    ),
    getItem(
      <div className="text-primary">Produtos</div>,
      "Produtos",
      <div>
        <ProductOutlined
          style={{ fontSize: "24px" }}
          className="text-primary"
        />
      </div>,
      [
        getItem(
          <Link href={"/painel-de-controle/criar-produtos"}>
            {collapsed ? (
              "Criar Produtos"
            ) : (
              <div className="text-primary">Criar Produtos</div>
            )}
          </Link>,
          "painel-de-controle/criar-produtos",
          <div>
            {!collapsed && (
              <ShopOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
        getItem(
          <Link href={"/painel-de-controle/estoque"}>
            {collapsed ? (
              "Criar Produtos"
            ) : (
              <div className="text-primary">Criar Estoque</div>
            )}
          </Link>,
          "painel-de-controle/estoque",
          <div>
            {!collapsed && (
              <ShoppingCartOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),

        getItem(
          <Link href={"/painel-de-controle/gerenciar-produtos"}>
            {collapsed ? (
              "Gerenciar Produtos"
            ) : (
              <div className="text-primary">Meus Produtos</div>
            )}
          </Link>,
          "painel-de-controle/gerenciar-produtos",
          <div>
            {!collapsed && (
              <PieChartOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/categorias-produtos"}
            className="text-primary"
          >
            {collapsed ? (
              "Categorias "
            ) : (
              <div className="text-primary">Categorias</div>
            )}
          </Link>,
          "painel-de-controle/categorias-produtos",
          <div>
            {!collapsed && (
              <FormOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-primary">Promocões</div>,
      "4",
      <div className="">
        <NotificationOutlined
          style={{ fontSize: "24px" }}
          className="text-primary"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/criar-promocoes"}
            className="text-primary"
          >
            {collapsed ? (
              "Criar Promoção"
            ) : (
              <div className="text-primary">Criar Promoção</div>
            )}
          </Link>,
          "painel-de-controle/criar-promocoes",
          <div>
            {!collapsed && (
              <FireOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/gerenciar-promocoes"}
            className="text-primary"
          >
            {collapsed ? (
              "Gerenciar Promoção"
            ) : (
              <div className="text-primary">Gerenciar Promoção</div>
            )}
          </Link>,
          "painel-de-controle/gerenciar-promocoes",
          <div>
            {!collapsed && (
              <LineChartOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-primary">Pedidos</div>,
      "5",
      <div>
        <FileDoneOutlined
          style={{ fontSize: "24px" }}
          className="text-primary"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/visualizar-pedidos"}
            className="text-primary"
          >
            {collapsed ? (
              "Visualizar Pedidos"
            ) : (
              <div className="text-primary">Visualizar Pedidos</div>
            )}
          </Link>,
          "painel-de-controle/visualizar-pedidos",
          <div>
            {!collapsed && (
              <FileTextOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-primary">Banners</div>,
      "6",
      <div>
        <FileImageOutlined
          style={{ fontSize: "24px" }}
          className="text-primary"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/criar-novos-banners"}
            className="text-primary"
          >
            {collapsed ? (
              "Criar Novos Banners"
            ) : (
              <div className="text-primary">Criar Novos Banners</div>
            )}
          </Link>,
          "painel-de-controle/criar-novos-banners",
          <div>
            {!collapsed && (
              <PictureOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/gerenciar-banners"}
            className="text-primary"
          >
            {collapsed ? (
              "Gerenciar Banners"
            ) : (
              <div className="text-primary">Gerenciar Banners</div>
            )}
          </Link>,
          "painel-de-controle/gerenciar-banners",
          <div>
            {!collapsed && (
              <FundOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-primary">Cupons</div>,
      "7",
      <div>
        <QrcodeOutlined
          style={{ fontSize: "24px" }}
          className="text-primary"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/criar-cupons"}
            className="text-primary"
          >
            {collapsed ? (
              "Criar Cupons"
            ) : (
              <div className="text-primary">Criar Cupons</div>
            )}{" "}
          </Link>,
          "painel-de-controle/criar-cupons",
          <div>
            {!collapsed && (
              <ShoppingOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/gerenciar-cupons"}
            className="text-primary"
          >
            {collapsed ? (
              "Gerenciar Cupons"
            ) : (
              <div className="text-primary">Gerenciar Cupons</div>
            )}{" "}
          </Link>,
          "painel-de-controle/gerenciar-cupons",
          <div>
            {!collapsed && (
              <TagsOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),

      ]
    ),
    getItem(
      <div className="text-primary">Relatórios</div>,
      "8",
      <div>
        < PieChartFilled
          style={{ fontSize: "24px" }}
          className="text-primary"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/relatorios-produtos"}
            className="text-primary"
          >
            {collapsed ? (
              "Produtos"
            ) : (
              <div className="text-primary">Produtos</div>
            )}{" "}
          </Link>,
          "/painel-de-controle/relatorios-produtos",
          <div>
            {!collapsed && (
              <ShoppingOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/relatorios-vendas"}
            className="text-primary"
          >
            {collapsed ? (
              "Vendas"
            ) : (
              <div className="text-primary">Vendas</div>
            )}{" "}
          </Link>,
          "/painel-de-controle/relatorios-vendas",
          <div>
            {!collapsed && (
              <TagsOutlined
                style={{ fontSize: "24px" }}
                className="text-primary"
              />
            )}
          </div>
        ),

      ]
    ),
  ];

  return {
    items,
  };
}
