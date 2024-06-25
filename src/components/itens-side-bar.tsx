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
          <div className="text-blue-400">Painel de Controle</div>
        )}
      </Link>,
      "painel-de-controle",
      <div>
        <AppstoreOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>
    ),
    getItem(
      <div className="text-white">Produtos</div>,
      "Produtos",
      <div>
        <ProductOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link href={"/painel-de-controle/criar-produtos"}>
            {collapsed ? (
              "Criar Produtos"
            ) : (
              <div className="text-blue-400">Criar Produtos</div>
            )}
          </Link>,
          "painel-de-controle/criar-produtos",
          <div>
            {!collapsed && (
              <ShopOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link href={"/painel-de-controle/estoque"}>
            {collapsed ? (
              "Criar Produtos"
            ) : (
              <div className="text-blue-400">Criar Estoque</div>
            )}
          </Link>,
          "painel-de-controle/estoque",
          <div>
            {!collapsed && (
              <ShoppingCartOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),

        getItem(
          <Link href={"/painel-de-controle/gerenciar-produtos"}>
            {collapsed ? (
              "Gerenciar Produtos"
            ) : (
              <div className="text-blue-400">Meus Produtos</div>
            )}
          </Link>,
          "painel-de-controle/gerenciar-produtos",
          <div>
            {!collapsed && (
              <PieChartOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/categorias-produtos"}
            className="text-white"
          >
            {collapsed ? (
              "Categorias "
            ) : (
              <div className="text-blue-400">Categorias</div>
            )}
          </Link>,
          "painel-de-controle/categorias-produtos",
          <div>
            {!collapsed && (
              <FormOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-white">Promocões</div>,
      "4",
      <div className="">
        <NotificationOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/criar-promocoes"}
            className="text-white"
          >
            {collapsed ? (
              "Criar Promoção"
            ) : (
              <div className="text-blue-400">Criar Promoção</div>
            )}
          </Link>,
          "painel-de-controle/criar-promocoes",
          <div>
            {!collapsed && (
              <FireOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/gerenciar-promocoes"}
            className="text-white"
          >
            {collapsed ? (
              "Gerenciar Promoção"
            ) : (
              <div className="text-blue-400">Gerenciar Promoção</div>
            )}
          </Link>,
          "painel-de-controle/gerenciar-promocoes",
          <div>
            {!collapsed && (
              <LineChartOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-white">Pedidos</div>,
      "5",
      <div>
        <FileDoneOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/visualizar-pedidos"}
            className="text-white"
          >
            {collapsed ? (
              "Visualizar Pedidos"
            ) : (
              <div className="text-blue-400">Visualizar Pedidos</div>
            )}
          </Link>,
          "painel-de-controle/visualizar-pedidos",
          <div>
            {!collapsed && (
              <FileTextOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-white">Banners</div>,
      "6",
      <div>
        <FileImageOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/criar-novos-banners"}
            className="text-white"
          >
            {collapsed ? (
              "Criar Novos Banners"
            ) : (
              <div className="text-blue-400">Criar Novos Banners</div>
            )}
          </Link>,
          "painel-de-controle/criar-novos-banners",
          <div>
            {!collapsed && (
              <PictureOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/gerenciar-banners"}
            className="text-white"
          >
            {collapsed ? (
              "Gerenciar Banners"
            ) : (
              <div className="text-blue-400">Gerenciar Banners</div>
            )}
          </Link>,
          "painel-de-controle/gerenciar-banners",
          <div>
            {!collapsed && (
              <FundOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-white">Cupons</div>,
      "7",
      <div>
        <QrcodeOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/criar-cupons"}
            className="text-white"
          >
            {collapsed ? (
              "Criar Cupons"
            ) : (
              <div className="text-blue-400">Criar Cupons</div>
            )}{" "}
          </Link>,
          "painel-de-controle/criar-cupons",
          <div>
            {!collapsed && (
              <ShoppingOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/gerenciar-cupons"}
            className="text-white"
          >
            {collapsed ? (
              "Gerenciar Cupons"
            ) : (
              <div className="text-blue-400">Gerenciar Cupons</div>
            )}{" "}
          </Link>,
          "painel-de-controle/gerenciar-cupons",
          <div>
            {!collapsed && (
              <TagsOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),

      ]
    ),
    getItem(
      <div className="text-white">Relatórios</div>,
      "8",
      <div>
        < PieChartFilled
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link
            href={"/painel-de-controle/relatorios-produtos"}
            className="text-white"
          >
            {collapsed ? (
              "Produtos"
            ) : (
              <div className="text-blue-400">Produtos</div>
            )}{" "}
          </Link>,
          "/painel-de-controle/relatorios-produtos",
          <div>
            {!collapsed && (
              <ShoppingOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/relatorios-vendas"}
            className="text-white"
          >
            {collapsed ? (
              "Vendas"
            ) : (
              <div className="text-blue-400">Vendas</div>
            )}{" "}
          </Link>,
          "/painel-de-controle/relatorios-vendas",
          <div>
            {!collapsed && (
              <TagsOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
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
