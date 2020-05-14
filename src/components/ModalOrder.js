import React from "react";
import Img from "gatsby-image";

const ModalOrder = (props) => {
  return (
    <ul>
      {props.shows
        .filter((item) => props.filter.includes(item.node.alternative_id))
        .map((item) => (
          <li style={{ width: "250px" }} key={item.node.id}>
            <Img
              durationFadeIn={1000}
              draggable={false}
              fluid={item.node.featuredImg.childImageSharp.fluid}
            />
          </li>
        ))}
    </ul>
  );
};

export default ModalOrder;
