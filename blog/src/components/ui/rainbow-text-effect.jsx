"use client"

import { useEffect, useState } from "react"

export function RainbowTextEffect({ fontSize = 20, text = "design", className = "" }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 400)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const desktopTextShadow = `
    1px 5px #B3E5FC, 1px 6px #000, 
    2px 10px #81D4FA, 2px 11px #000, 
    3px 15px #4FC3F7, 3px 16px #000, 
    4px 20px #29B6F6, 4px 21px #000, 
    5px 25px #03A9F4, 5px 26px #000, 
    6px 30px #039BE5, 6px 31px #000, 
    7px 35px #0288D1, 7px 36px #000, 
    8px 40px #0277BD, 8px 41px #000, 
    9px 45px #1565C0, 9px 46px #000, 
    10px 50px #0D47A1, 10px 51px #000,
    11px 55px #1A237E, 11px 56px #000,
    12px 60px #283593, 12px 61px #000,
    13px 65px #3949AB, 13px 66px #000, 
    14px 70px #5C6BC0, 14px 71px #000
  `

  const mobileStyles = {
    textShadow: "none",
    background: "linear-gradient(to bottom, #4FC3F7, #0288D1, #0D47A1)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    lineHeight: "130%",
  }

  const desktopStyles = {
    color: "white",
    WebkitTextStroke: "0.5px #000",
    textStroke: "0.5px #000",
    textShadow: desktopTextShadow,
    lineHeight: "100%",
  }

  const baseStyles = {
    fontFamily: "'Open Sans', sans-serif",
    fontStyle: "italic",
    fontSize: `${fontSize}vw`,
    fontWeight: 600,
    textTransform: "lowercase",
    wordBreak: "break-all",
    margin: 0,
    padding: 0,
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,600&display=swap" rel="stylesheet" />
      <div
        style={{
          fontFamily: "'Open Sans', sans-serif",
        }}
        className={className}
      >
        <p
          style={{
            ...baseStyles,
            ...(isMobile ? mobileStyles : desktopStyles),
          }}
        >
          {text}
        </p>
      </div>
    </>
  )
}
