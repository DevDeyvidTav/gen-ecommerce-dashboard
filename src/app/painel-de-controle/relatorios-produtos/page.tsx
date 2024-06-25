'use client';

import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import { Bar } from '@ant-design/plots';

const data = [
  {
    key: '1',
    product: 'Calça estampada',
    sales: 500,
    revenue: 10000,
  },
  {
    key: '2',
    product: 'Camisa social',
    sales: 300,
    revenue: 7500,
  },
  {
    key: '3',
    product: 'Camisa esportiva',
    sales: 200,
    revenue: 5000,
  },
  {
    key: '4',
    product: 'Short jeans handara',
    sales: 150,
    revenue: 3750,
  },
];

const columns = [
  {
    title: 'Produto',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Vendas',
    dataIndex: 'sales',
    key: 'sales',
  },
  {
    title: 'Receita',
    dataIndex: 'revenue',
    key: 'revenue',
  },
];

export default function GerenciarPromocoes() {
  const [barConfig, setBarConfig] = useState<any>(null);

  useEffect(() => {
    const barData = data.map(item => ({
      type: item.product,
      sales: item.sales,
    }));

    const config = {
      data: barData,
      xField: 'sales',
      yField: 'type',
      seriesField: 'type',
      legend: false,
      color: ['#1979C9'],
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      barWidthRatio: 0.8,
    };

    setBarConfig(config);
  }, []);

  return (
    <div className="flex flex-col h-[67vh] overflow-y-scroll w-full">
      <h1 className="text-xl font-semibold">
        Relatório de Produtos mais vendidos
      </h1>

      <div className="mt-4">
        <Card title="Tabela de Produtos mais Vendidos">
          <Table dataSource={data} columns={columns} pagination={false} />
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Gráfico de Vendas dos Produtos">
          {barConfig && <Bar {...barConfig} />}
        </Card>
      </div>
    </div>
  );
};

