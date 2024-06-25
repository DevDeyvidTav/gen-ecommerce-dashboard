'use client';

import React from 'react';
import { Table, Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const barData = {
  labels: data.map(item => item.product),
  datasets: [
    {
      label: 'Vendas',
      data: data.map(item => item.sales),
      backgroundColor: '#1979C9',
    },
  ],
};

const barOptions: any = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Vendas dos Produtos',
    },
  },
};

export default function GerenciarPromocoes() {
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
          <Bar data={barData} options={barOptions} />
        </Card>
      </div>
    </div>
  );
}
