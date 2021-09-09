// memo utilizado para não fazer renderizações desnecessárias
import React, { memo, useEffect, useState } from "react";
import { Row, Col } from "antd";
import Economy from "./components/Economy";
import Technology from "./components/Technology";
import World from "./components/World";
import api from "../api";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNews = (articles) => {
    setLoading(false);
    setNews({
      world: articles[0]?.value.value,
      economy: articles[1]?.value.value,
      technology: articles[2]?.value.value,
    });
  };

  useEffect(() => {
    setLoading(true);
    // caso haja algum erro na chamada de serviço, a aplicação não trava
    Promise.allSettled([
      api.getNews("world"),
      api.getNews("economy"),
      api.getNews("technology"),
    ]).then(handleNews);
  }, []);

  // isso para não mostrar a página enquanto o conteúdo não tiver sido carregaod
  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <h2>World</h2>
          <World values={news?.world} />
        </Col>
        <Col span={24} md={8}>
          <h2>Economy</h2>
          <Economy values={news?.economy} />
        </Col>
      </Row>
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2>Technology</h2>
          <Technology values={news?.technology} />
        </Col>
      </Row>
    </div>
  );
}

// gutter -> espaçamento entre as grids e como se comporta a partir do tamanho do dispositivo do usuário
// span -> grids de 24
// md -> tamanho médio

export default memo(Home);
