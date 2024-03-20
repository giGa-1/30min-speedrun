import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ButtonHTMLAttributes, FC, MouseEvent, ReactNode, useRef } from "react";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

type Coord = 0 | 50 | 100;
type Coords = { x: Coord; y: Coord };

interface ICpntrollerData {
  id: number;
  coords: Coords;
  node: string;
  active: boolean;
}

const controllerData: ICpntrollerData[] = [
  {
    id: 1,
    coords: { x: 0, y: 0 },
    node: "⇖",
    active: false,
  },
  {
    id: 2,
    coords: { x: 50, y: 0 },
    node: "⇑",
    active: false,
  },
  {
    id: 3,
    coords: { x: 100, y: 0 },
    node: "⇗",
    active: false,
  },
  {
    id: 4,
    coords: { x: 0, y: 50 },
    node: "⇐",
    active: false,
  },
  {
    id: 5,
    coords: { x: 50, y: 50 },
    node: "◯",
    active: false,
  },
  {
    id: 6,
    coords: { x: 100, y: 50 },
    node: "⇒",
    active: false,
  },
  {
    id: 7,
    coords: { x: 0, y: 100 },
    node: "⇙",
    active: false,
  },
  {
    id: 8,
    coords: { x: 50, y: 100 },
    node: "⇓",
    active: false,
  },
  {
    id: 9,
    coords: { x: 100, y: 100 },
    node: "⇘",
    active: false,
  },
];

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const CButton: FC<IButton> = ({ children, ...props }) => (
  <button
    className="bg-zinc-500/20 rounded-sm py-[3vh] px-[5vw] sm:px-[2vw] flex justify-center items-center"
    {...props}
  >
    {children}
  </button>
);

function App() {
  const boxRef = useRef<HTMLDivElement>(null);
  const tl = gsap.timeline({
    smoothChildTiming: true,
    defaults: { duration: 1, ease: "power2.inOut" },
  });

  const handleBtnCick = (e: MouseEvent<HTMLButtonElement>, coords: Coords) => {
    e.preventDefault();
    const box = boxRef.current as HTMLElement;

    box.dataset.x = coords.x.toString();
    box.dataset.y = coords.y.toString();

    const rects = box.getBoundingClientRect();
    const leftCoord = (window.innerWidth - rects.width) * coords.x * 0.01;
    const topCoord = (window.innerHeight - rects.height) * coords.y * 0.01;

    tl.to("#box", { left: leftCoord, top: topCoord, overwrite: "auto"});
  };

  window.addEventListener("resize", () => {
    const box = boxRef.current as HTMLElement;
    const rects = box.getBoundingClientRect();
    const { x, y } = box.dataset;
    if (x && y) {
      gsap.set(box, {
        left: (window.innerWidth - rects.width) * +x * 0.01,
        top: (window.innerHeight - rects.height) * +y * 0.01,
        duration: 0.25,
        ease: "sine.in",
      });
    }
  });

  return (
    <div className=" h-screen w-full relative">
      <div className="box" id="box" ref={boxRef}></div>
      <div className=" absolute bottom-[5vw] left-[5vw] sm:bottom-[2.5vw] sm:left-[2.5vw] grid grid-cols-3 grid-rows-3 gap-2">
        {controllerData.map((d) => (
          <CButton onClick={(e) => handleBtnCick(e, d.coords)} key={d.id}>
            {d.node}
          </CButton>
        ))}
      </div>
    </div>
  );
}

export default App;
