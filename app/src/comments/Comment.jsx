import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App.jsx";
import { Link } from "react-router-dom";
import Menu from "./Menu.jsx";

export default function Comment({ data }) {
  const [menu, setMenu] = useState(false);
  const { id, likes } = useContext(UserContext)["userData"];
  const [img, setImg] = useState("/images/user.svg");
  const [likesNo, setLikesNo] = useState(data["likes"]);
  const [liked, setLiked] = useState(likes.includes(data["id"]));
  const [warning, setWarning] = useState();

  // DO OPTYMALIZACJI
  // DO OPTYMALIZACJI
  // DO OPTYMALIZACJI
  // DO OPTYMALIZACJI
  // DO OPTYMALIZACJI

  useEffect(() => {
    if (data["avatar"]) {
      const render = new FileReader();
      const file = new Blob([new Uint8Array(data["avatar"]["data"])], {
        type: "image/png",
      });
      render.readAsDataURL(file);
      render.onload = () => {
        setImg(render.result);
      };
    }
  }, []);

  function closeMenu() {
    setMenu(false);
  }

  async function like() {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userID: id, commentID: data["id"] }),
    };
    try {
      const response = await fetch("http://localhost/like", options);
      if (!response.ok) return setWarning(true);
      setLiked((prev) => !prev);
      setLikesNo((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      throw Error(`Error when awarding likes: ${err}`);
    }
  }
  return (
    <div className="comment">
      <header className="showcase">
        <div className="container">
          <Link to={`/${data["nick"]}`}>
            <div className="avatar">
              <img src={img} alt="avatar" />
            </div>
          </Link>
          <div className="info">
            <Link to={`/${data["nick"]}`}>
              <h3 className="nick">{data["nick"]}</h3>
            </Link>
            <p className="date">{data["date"]}</p>
          </div>
        </div>
        <button onClick={() => setMenu(true)}>
          <img className="medium" src="/images/threedots.svg" alt="open menu" />
        </button>
        {menu && (
          <Menu
            fn={closeMenu}
            loggedUserID={id}
            commentID={data["id"]}
            commentUserID={data["userID"]}
          />
        )}
      </header>
      <p className="content">{data["content"]}</p>
      <div className="panel">
        <button
          className="super"
          onClick={() => {
            if (!id) return;
            like();
          }}>
          {!liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512">
              <path
                opacity="1"
                d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
              />
            </svg>
          ) : (
            <svg
              className="liked"
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512">
              <path
                opacity="1"
                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
              />
            </svg>
          )}
          {likesNo}
          {warning && <small>Error with likes</small>}
        </button>
        <button className="com">
          <img src="/images/comment.svg" alt="open replies" />
        </button>
      </div>
    </div>
  );
}
