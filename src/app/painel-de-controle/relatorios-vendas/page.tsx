'use client';

import React, { useState } from 'react';
import { Table, Card, DatePicker, Row, Col } from 'antd';
import { Pie, Line, Histogram } from '@ant-design/plots';
import moment from 'moment';

const { RangePicker } = DatePicker;

// Dados fictícios
const initialData = [
  {
    key: '1',
    date: '2023-06-01',
    product: 'Produto A',
    sales: 50,
    revenue: 1000,
  },
  {
    key: '2',
    date: '2023-06-02',
    product: 'Produto B',
    sales: 30,
    revenue: 750,
  },
  {
    key: '3',
    date: '2023-06-03',
    product: 'Produto C',
    sales: 20,
    revenue: 500,
  },
  {
    key: '4',
    date: '2023-06-04',
    product: 'Produto D',
    sales: 15,
    revenue: 375,
  },
  // Mais dados fictícios...
];

const columns = [
  {
    title: 'Data',
    dataIndex: 'date',
    key: 'date',
  },
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

  const salesData = filteredData.map(item => ({ type: item.product, value: item.sales }));
  const revenueData = filteredData.map(item => ({ date: item.date, revenue: item.revenue }));
  const histogramData = filteredData.map(item => ({ date: item.date, sales: item.sales }));

  const pieConfig = {
    appendPadding: 10,
    data: salesData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
  };

  const lineConfig = {
    data: revenueData,
    xField: 'date',
    yField: 'revenue',
    smooth: true,
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  const histogramConfig = {
    data: histogramData,
    binField: 'sales',
    binWidth: 10,
    colorField: 'date',
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
              <Pie {...pieConfig} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Gráfico de Receita (Linha)">
              <Line {...lineConfig} />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mt-4">
        <Card title="Histograma de Vendas">
          <Histogram {...histogramConfig} />
        </Card>
      </div>
    </div>
  );
}
