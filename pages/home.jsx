import React from "react";
import { Raleway } from "next/font/google";
import { css, cva } from "@shadow-panda/styled-system/css";
import HomeCarousel from "../components/HomeCarousel";

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

const raleway = Raleway({
  weight: "900",
  subsets: ["latin"],
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
          bg: "greeny",
          height: "10px",
        })}
      ></div>
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
        </div>

        <div
          className={css({
            pt: "0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            sm: { pt: "60px" },
          })}
        >
          <h1
            className={css({
              sm: { fontSize: "3.94em" },
              fontSize: "2.94em",
              pt: "30px",
              lineHeight: "1.1em",
              textAlign: "left",
              sm: { textAlign: "center" },
              fontWeight: "light",
              mb: "100px",
            })}
          >
            <span className={raleway.className}>
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
                  fontSize: "0.84em",
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
            </span>
          </h1>
          <HomeCarousel />
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              pt: "50px",
            })}
          >
            <nav className={css({ mt: "20px", sm: { mt: "0px" } })}>
              <h1
                className={css({
                  fontSize: "1.24em",
                  lineHeight: "2.5em",
                })}
              >
                Discover Tennis Matches in Your City !
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
                fontSize: "1.2em",
                mt: "50px",
                "& li": {
                  pb: "10px",
                },
              })}
            >
              <li>
                🤚 <strong>Step 1 </strong> Share Your Next Match with the
                Community
              </li>
              <li>
                💬 <strong>Step 2 </strong> Connect with New Tennis Partner
              </li>
              <li>
                🎾 <strong>Step 3 </strong> Meet Your Tennis partner & Play !
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
