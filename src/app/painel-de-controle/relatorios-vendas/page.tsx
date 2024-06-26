'use client';

import React, { useState } from 'react';
import { Table, Card, DatePicker, Row, Col } from 'antd';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const { RangePicker } = DatePicker;

// Dados fictícios
const initialData = [
  { key: '1', date: '2023-06-01', product: 'Produto A', sales: 50, revenue: 1000 },
  { key: '2', date: '2023-06-02', product: 'Produto B', sales: 30, revenue: 750 },
  { key: '3', date: '2023-06-03', product: 'Produto C', sales: 20, revenue: 500 },
  { key: '4', date: '2023-06-04', product: 'Produto D', sales: 15, revenue: 375 },
  // Mais dados fictícios...
];

const columns = [
  { title: 'Data', dataIndex: 'date', key: 'date' },
  { title: 'Produto', dataIndex: 'product', key: 'product' },
  { title: 'Vendas', dataIndex: 'sales', key: 'sales' },
  { title: 'Receita', dataIndex: 'revenue', key: 'revenue' },
];

export default function RelatoriosVendas() {
  const [filteredData, setFilteredData] = useState(initialData);
  const [dates, setDates] = useState([null, null]);

  const onDateChange = (dates: any) => {
    if (!dates || dates.length < 2) return;
    const [start, end] = dates;
    setDates([start, end]);
    const filtered = initialData.filter(item => {
      const date = moment(item.date);
      return date.isBetween(start, end, 'days', '[]');
    });
    setFilteredData(filtered);
  };

  const salesData = {
    labels: filteredData.map(item => item.product),
    datasets: [{
      label: 'Vendas',
      data: filteredData.map(item => item.sales),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#1979C9'],
    }],
  };

  const revenueData = {
    labels: filteredData.map(item => item.date),
    datasets: [{
      label: 'Receita',
      data: filteredData.map(item => item.revenue),
      borderColor: '#36A2EB',
      backgroundColor: '#36A2EB',
      fill: false,
    }],
  };

  const histogramData = {
    labels: filteredData.map(item => item.date),
    datasets: [{
      label: 'Vendas',
      data: filteredData.map(item => item.sales),
      backgroundColor: '#FF6384',
    }],
  };

  const pieOptions = {
    plugins: {
      legend: { position: 'right' as const },
      title: {
        display: true,
        text: 'Vendas dos Produtos',
      },
    },
  };

  const lineOptions = {
    plugins: {
      legend: { position: 'right' as const },
      title: {
        display: true,
        text: 'Receita ao Longo do Tempo',
      },
    },
  };

  const barOptions = {
    plugins: {
      legend: { position: 'right' as const },
      title: {
        display: true,
        text: 'Histograma de Vendas',
      },
    },
  };

  return (
    <div className="flex flex-col h-[67vh] overflow-y-scroll overflow-x-hidden w-full">
      <h1 className="text-xl font-semibold">
        Relatório de Vendas e Receita
      </h1>

      <div className="mt-4">
        <Card title="Selecione o Período">
          <RangePicker onChange={onDateChange} />
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Tabela de Vendas e Receita">
          <Table dataSource={filteredData} columns={columns} pagination={false} />
        </Card>
      </div>

      <div className="mt-4">
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Gráfico de Vendas (Pizza)">
              <Pie data={salesData} options={pieOptions} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Gráfico de Receita (Linha)">
              <Line data={revenueData} options={lineOptions} />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mt-4">
        <Card title="Histograma de Vendas">
          <Bar data={histogramData} options={barOptions} />
        </Card>
      </div>
    </div>
  );
}
