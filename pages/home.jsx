import React from "react";
import { css, cva } from "@shadow-panda/styled-system/css";
///https://www.npmjs.com/package/react-multi-carousel

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
      })}
    >
      <div
        className={css({
          bg: "blue",
          height: "100%",
          margin: "0 auto",
          color: "white",
          p: "10px",
          sm: { maxWidth: "1320px" },
        })}
      >
        <div
          className={css({
            sm: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: "10px",
            },

            display: "block",
          })}
        >
          <img
            className={css({ width: "250px", sm: { width: "300px" } })}
            src="/logo.svg"
            sendEmail
            alt="Match Points"
          />
          <nav className={css({ mt: "20px", sm: { mt: "0px" } })}>
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
                flexWrap: "wrap",
                "& li a": {
                  display: "block",
                  mb: "10px",
                },
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
            sm: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },

            display: "block",
            pt: "30px",
          })}
        ></div>

        <div
          className={css({
            pt: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          })}
        >
          <img
            className={css({ mt: "70px", width: "1200px" })}
            src="/heros.jpg"
            alt="Match Points"
          />
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              pt: "100px",
            })}
          >
            <img
              className={css({ width: "70px" })}
              src="/icon.svg"
              alt="Match Points"
            />
          </div>
          <h1
            className={css({
              sm: { fontSize: "3.94em" },
              fontSize: "2.94em",
              pt: "30px",
              lineHeight: "1.2em",
              textAlign: "center",
              fontWeight: "light",
            })}
          >
            <span
              className={css({
                color: "greeny",
              })}
            >
              Connect
            </span>{" "}
            and <br />
            <span
              className={css({
                color: "darkBlue",
              })}
            >
              Play{" "}
            </span>{" "}
            Tennis{" "}
            <span
              className={css({
                fontSize: "0.54em",
              })}
            >
              🎾
            </span>{" "}
            <br />
            with Your{" "}
            <span
              className={css({
                color: "black",
              })}
            >
              Perfect Match !
            </span>{" "}
            <br />
          </h1>
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
            })}
          >
            <ul
              className={css({
                sm: { textAlign: "left" },
                textAlign: "center",
                fontSize: "1.1em",
                mt: "50px",
                "& li": {
                  pb: "10px",
                },
              })}
            >
              <li>
                🤚 <strong>Share,</strong> Share Your Next Match with the
                Community
              </li>
              <li>
                💬 <strong>Connect,</strong> Connect with New Tennis Partner
              </li>
              <li>
                🎾 <strong>Enjoy,</strong> Meet Your Tennis partner & Play !
              </li>
            </ul>
          </div>
          <img
            className={css({ mt: "50px", width: "1200px" })}
            src="/hp.png"
            alt="Match Points"
          />
        </div>
      </div>
    </div>
  );
}
