import React, { memo } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { createMarkup } from "../../utils";
import { useHistory } from "react-router-dom"; // para usar com um botão de retornar

function Economy({ values }) {
  const history = useHistory();

  const renderImg = ({ image, description }) => (
    <img src={image.url} alt={description} width="100%" />
  );

  // dangerouslySetInnerHtml -> o retorno do serviço é em markdown. Para apresentar isso no HTML usa-se essa tag.
  // Não é recomendado e pode haver perda de performance. Mas serve para colocar o valor direto ali na HTML
  const renderDescription = (description) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id) => {
    history.push(`/economy/${id}`);
  };

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;
    return (
      <Col span={24} md={12} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url
            ? renderImg({ image, description })
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
}

Economy.defaultProps = {
  values: [],
};

Economy.propTypes = {
  values: PropTypes.array.isRequired,
};

export default memo(Economy);
