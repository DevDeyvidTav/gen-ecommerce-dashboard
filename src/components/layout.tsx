"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Popover, MenuProps } from "antd";
import { ItensComponet } from "./itens-side-bar";
import { useRouter } from "next/navigation";
const { Header, Sider, Content } = Layout;
import Image from "next/image";
import Cookies from "js-cookie";
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

export function LayoutComponent({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { items } = ItensComponet(collapsed);
  const pathname = usePathname();
  const routeName = pathname.substring(1);

  const router = useRouter();

  async function handleLogout() {
    try {
      Cookies.remove("userId");
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/login");
    }
  }
  
  const content = (
    <div className="flex flex-col justify-center items-center">
      <a
        onClick={handleLogout}
        className="flex justify-center hover:bg-gray-200 w-full items-center
        py-1 rounded-md cursor-pointer transition-all duration-300"
      >
        Sair
      </a>
    </div>
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        width={260}
        color="#232A60"
        style={{
          background: "#232A60",
        }}
        className="h-screen bg-[#232A60]"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          className="flex justify-center items-center text-red-600 text-xl
           py-5 pb-12"
        >
          <Image src="/assets/logo.jpeg" width={40} height={100} alt="logo" />
        </div>
        <Menu
          className="bg-[#232A60]"
          theme="light"
          mode="inline"
          selectedKeys={[routeName]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="flex justify-between shadow-sm "
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="link"
            className="text-red-500"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 72,
              height: 72,
            }}
          />

          <div className="pr-5 cursor-pointer">
            <Popover
              content={content}
              title={
                <div className="text-center flex justify-center items-center gap-2">
                  Bem vindo! <LikeOutlined className="text-blue-500" />
                </div>
              }
              trigger="click"
            >
              <Avatar
                className="shadow-md"
                style={{ backgroundColor: "#232A60" }}
                size={42}
                icon={
                  <div>
                    <Image
                      src="/assets/logo.jpeg"
                      alt="avatar"
                      width={30}
                      height={20}
                    />
                  </div>
                }
              />
            </Popover>
          </div>
        </Header>
        <Content
          className="overflow-y-scroll  border
          border-zinc-100 rounded-md shadow-md"
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
