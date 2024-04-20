import React from "react";
import { css, cva } from "@shadow-panda/styled-system/css";

const link = cva({
  base: {
    background: "greeny",
    color: "black",
    borderRadius: "5px",
    fontWeight: "bold",
    p: "10px",
    mr: "10px",
  },
});

export default function Home() {
  return (
    <div
      className={css({
        bg: "blue",
        height: "100vh",
        color: "white",
        p: "10px",
      })}
    >
      <img
        className={css({ width: "250px", sm: { width: "400px" } })}
        src="/logo.svg"
        alt="Match Points"
      />
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: "30px",
        })}
      >
        <h1
          className={css({
            fontSize: "1.94em",
            pt: "30px",
            pl: "60px",
            lineHeight: "1.2em",
          })}
        >
          Find Your Next <br />
          Forehand Friend.
        </h1>
        <nav>
          <h1
            className={css({
              fontSize: "1.24em",

              lineHeight: "2.5em",
            })}
          >
            Choose your city
          </h1>
          <ul
            className={css({
              display: "flex",
              mr: "120px",
            })}
          >
            <li>
              <a href="/city/Sydney" className={link()}>
                Sydney
              </a>
            </li>
            <li>
              <a href="#" className={link()}>
                Melbourne
              </a>
            </li>
            <li>
              <a href="#" className={link()}>
                Brisbane
              </a>
            </li>
            <li>
              <a href="#" className={link()}>
                Perth
              </a>
            </li>
            <li>
              <a href="#" className={link()}>
                Canberra
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          pt: "30px",
        })}
      >
        <img
          className={css({ mt: "70px", width: "1200px" })}
          src="/hp.png"
          alt="Match Points"
        />
      </div>
    </div>
  );
}
