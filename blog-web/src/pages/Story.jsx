import "../styles/Story.scss";

export default function OurStory() {
    return (
      <div
        style={{
          backgroundColor: "rgb(151, 114, 71)",
          color: "white",
          minHeight: "100vh",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "auto" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "30px" }}>
            Our Story
          </h1>
  
          <h2 style={{ fontSize: "38px", marginBottom: "30px" }}>
            Everyone has a story to tell
          </h2>
  
          <p style={{ fontSize: "22px", lineHeight: "1.8", marginBottom: "25px" }}>
            This platform is built to empower writers and readers by providing
            a space to share ideas, stories, and knowledge.
          </p>
  
          <p style={{ fontSize: "22px", lineHeight: "1.8", marginBottom: "25px" }}>
            We believe in human creativity enhanced by technology.
          </p>
  
          <p style={{ fontSize: "22px", lineHeight: "1.8", marginBottom: "40px" }}>
            Blogify AI is a home for human stories and ideas. Here, anyone can share
            knowledge and wisdom with the world—without having to build a mailing
            list or a following first. The internet is noisy and chaotic; Blogify Ai is
            quiet yet full of insight. It’s simple, beautiful, collaborative, and
            helps you find the right readers for whatever you have to say.
          </p>
  
          <h2 style={{ fontSize: "36px", marginBottom: "30px" }}>
            Ultimately, our goal is to deepen our collective understanding of the world
            through the power of writing.
          </h2>
  
          <p style={{ fontSize: "22px", lineHeight: "1.8" }}>
            We believe that what you read and write matters. Words can divide or
            empower us, inspire or discourage us. In a world where the most
            sensational and surface-level stories often win, we’re building a
            system that rewards depth, nuance, and time well spent — a space for
            thoughtful conversation over noise, and substance over packaging.
          </p>
        </div>
      </div>
    );
  }
