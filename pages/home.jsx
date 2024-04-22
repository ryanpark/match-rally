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
        height: "100%",
      })}
    >
      <div
        className={css({
          bg: "blue",
          height: "100%",
          width: "100%",
          margin: "0 auto",
          color: "white",
          p: "10px",
          sm: { maxWidth: "1320px" },
        })}
      >
        <img
          className={css({ width: "250px", sm: { width: "400px" } })}
          src="/logo.svg"
          alt="Match Points"
        />
        <div
          className={css({
            sm: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },

            display: "block",
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
          })}
        >
          <div
            className={css({
              pt: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            })}
          >
            <img
              className={css({ mt: "70px", width: "1200px", mb: "-230px" })}
              src="/heros.jpg"
              alt="Match Points"
            />
            <img
              className={css({ mt: "70px", width: "1200px" })}
              src="/hp.png"
              alt="Match Points"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
