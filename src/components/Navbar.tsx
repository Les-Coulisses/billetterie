import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { getShows } from "../api";

const styles: { [name: string]: React.CSSProperties } = {
  navbar: {
    height: 77,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Source Sans Pro', sans-serif",
    fontWeight: 300,
    color: "white",
    position: "absolute",
    top: 0,
    userSelect: "none",
  },
  divider: {
    flexGrow: 1,
    height: 3,
    borderTop: "solid 1px rgba(192, 192, 192, 0.35)",
    borderBottom: "solid 1px rgba(192, 192, 192, 0.35)",
  },
  verticalDivider: {
    height: "20%",
    borderRight: "solid 1px rgba(192, 192, 192, 0.35)",
  },
  items: {
    width: 1000,
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
};

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query {
      allInternalShows {
        edges {
          node {
            alternative_id
            title
            cover {
              alternative_id
              path
              url
            }
          }
        }
      }
      file(name: { eq: "white-logo" }) {
        childImageSharp {
          fixed(height: 66) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <div style={styles.navbar}>
      <div style={styles.divider} />
      <div style={styles.verticalDivider} />
      <div style={styles.items}>
        <Link to="#" style={styles.link}>
          A propos
        </Link>
        <Link to="#" style={styles.link}>
          Blog
        </Link>
        <Img
          fixed={data.file.childImageSharp.fixed}
          fadeIn={false}
          draggable={false}
        />
        <Link
          to="#"
          style={styles.link}
          onClick={() => {
            getShows((shows) => {
              console.log(data.allInternalShows);
            });
          }}
        >
          Contact
        </Link>
        <Link to="#" style={styles.link}>
          Réserver
        </Link>
      </div>
      <div style={styles.verticalDivider} />
      <div style={styles.divider} />
      {data.allInternalShows.edges.map((item) => (
        <p>{item.node.title}</p>
      ))}
    </div>
  );
};

// const Menu = () => null;

// const getWindowDimensions = () => {
//   const { innerWidth: width, innerHeight: height } = window;
//   return {
//     width,
//     height,
//   };
// };

const SizeChecker = () => {
  // const [windowDimensions, setWindowDimensions] = useState(
  //   getWindowDimensions()
  // );

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //   }

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // const { width } = windowDimensions;

  // if (width < 768) return <Menu />;
  return <Navbar />;
};

export default SizeChecker;
