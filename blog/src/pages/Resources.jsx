import React, { useRef } from "react";
import Background from "../components/Background";
import FunFacts from "../components/FunFacts";
import Resources from "../components/Resources";

const funFacts = [
  "- I play guitar sometimes",
  "- I overthink in FPL",
  "- I love exploring new tech",
];

const resources = [
  { name: "Writings", url: "/" },
  { name: "Resources", url: "/resources" },
  { name: "Twitter", url: "https://twitter.com/whotookromeiro" },
  { name: "LinkedIn", url: "https://linkedin.com/in/romeirofernandes" },
];

export default function ResourcesPage() {
  const birthDate = useRef(new Date("2005-10-11T02:37:00Z"));

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-2 sm:px-4 py-8 font-sans flex flex-col min-h-screen">
        {/* Top columns */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          <FunFacts birthDate={birthDate.current} facts={funFacts} />
          <div className="hidden sm:block">
            <Resources resources={resources} highlight="Resources" />
          </div>
        </div>
        {/* Separator */}
        <hr className="border-t border-[#232323] my-6" />
        {/* Resource links */}
        <div className="text-[#f5f5f7] text-md mx-2">
          Over the span of 8 months where I've built countless websites, these
          are some cool resources I refer to sometimes:
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse text-base sm:text-sm border border-[#232323]">
              <thead>
                <tr>
                  <th className="py-2 px-3 font-semibold text-zinc-400 border border-[#232323] bg-[#18181b]">
                    What it is
                  </th>
                  <th className="py-2 px-3 font-semibold text-zinc-400 border border-[#232323] bg-[#18181b]">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Inspiring Websites
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://supercreative.design/1000-inspiring-websites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      supercreative.design/1000-inspiring-websites
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Device Mockups
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://shots.so/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      shots.so
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Avatar Generator
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://getavataaars.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      getavataaars.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Background Remover
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://www.experte.com/background-remover"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      experte.com/background-remover
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Color Gradients
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://hypercolor.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      hypercolor.dev
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Design Resources
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://undesign.learn.uno/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      undesign.learn.uno
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Code Screenshot Tool
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://ray.so/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      ray.so
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Neumorphism Generator
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://neumorphism.io/#e0e0e0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      neumorphism.io
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Free Illustrations
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://storyset.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      storyset.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Color Palettes
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://www.happyhues.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      happyhues.co
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    SVG Wave Generator
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://getwaves.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      getwaves.io
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Hero Inspirations
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://www.supahero.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      supahero.io
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Cool components
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://21st.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      21st.dev
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    AI UI Builder
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://v0.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      v0.dev
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    React UI Components
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://ui.shadcn.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      ui.shadcn.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Lowkey better than ShadCN
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://originui.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      originui.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Similar to Origin UI
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://hextaui.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      hextaui.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    UI Library
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://hextaui.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      magicui.design
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    UI Library
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://ui.aceternity.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      ui.aceternity.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Themes for ShadCN
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://tweakcn.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      tweakcn.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Font Library
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://fontsource.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      fontsource.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Design Inspiration
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://sprrrint.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      sprrrint.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Cool patterns and backgrounds
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://patterncraft.fun/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      patterncraft.fun
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Design Inspiration
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://mobbin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      mobbin.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Design Showcase
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://dribbble.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      dribbble.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Design Inspiration
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://behance.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      behance.net
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-zinc-400 border border-[#232323]">
                    Design Inspiration
                  </td>
                  <td className="py-2 px-3 border border-[#232323]">
                    <a
                      href="https://pinterest.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#38bdf8] underline"
                    >
                      pinterest.com
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Background>
  );
}
