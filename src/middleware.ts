import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("userId")?.value;
  const absoluteUrl = req.nextUrl.origin;

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(`${absoluteUrl}/painel-de-controle`);
  } else {
    if (req.nextUrl.pathname === "/login") {
      if (token) {
        return NextResponse.redirect(`${absoluteUrl}/`);
      }
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(`${absoluteUrl}/login`);
    }
  }
}
export const config = {
  matcher: [
    "/",
    "/login",
    "/painel-de-controle",
    "/painel-de-controle/gerenciar-produtos",
    "/painel-de-controle/criar-produtos",
    "/painel-de-controle/estoque",
    "/painel-de-controle/categorias-produtos",
    "/painel-de-controle/criar-promocoes",
    "/painel-de-controle/gerenciar-promocoes",
    "/painel-de-controle/criar-cupons",
    "/painel-de-controle/gerenciar-cupons",
    "/painel-de-controle/criar-novos-banners",
    "/painel-de-controle/gerenciar-banners",
    "/painel-de-controle/visualizar-pedidos",
    "/relatorios/produtos",
    "/relatorios/vendas",
  ],
};
