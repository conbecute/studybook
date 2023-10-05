import buttonAm from "../../assets/images/mathquill/button/a_m.svg";
import buttonAMMun from "../../assets/images/mathquill/button/a_mmun.svg";
import buttonAMun1 from "../../assets/images/mathquill/button/amun1.svg";
import buttonCana from "../../assets/images/mathquill/button/cana.svg";
import buttonCanX from "../../assets/images/mathquill/button/canx.svg";

const BG_KEY_CALCULATOR = {
  Area1: "rgb(242, 242, 242)",
  Area2: "rgb(253, 242, 223)",
  Area3: "rgb(237, 230, 246)",
  Area4: "rgb(253, 242, 223)",
  Area5: "rgb(237, 230, 246)",
  Area6: "rgb(253, 242, 223)",
}

const LIST_KEY_CALCULATOR = [
  {
    colClass: "col4",
    bgColor: BG_KEY_CALCULATOR.Area1,
    keys: [
      { label: "+", keyValue: "+" },
      { label: "-", keyValue: "-" },
      { label: "\\times", keyValue: "\\times" },
      { label: "\\div", keyValue: "\\div" },
      { label: "=", keyValue: "=" },
      { label: "\\ne", keyValue: "\\ne" },
      { label: "\\approx", keyValue: "\\approx" },
      { label: "\\equiv", keyValue: "\\equiv" },
      { label: ">", keyValue: ">" },
      { label: "<", keyValue: "<" },
      { label: "\\le", keyValue: "\\le" },
      { label: "\\ge", keyValue: "\\ge" },
      { label: "\\pm", keyValue: "\\pm" },
      { label: "\\mp", keyValue: "\\mp" },
      { label: "\\vdots", keyValue: "\\vdots" },
      { label: "\\cdot", keyValue: "\\cdot" },
      { label: "\\cdots", keyValue: "\\cdots" },
      { label: "\\ldots", keyValue: "\\ldots" },
      { label: "\\pi", keyValue: "\\pi" },
    ]
  },
  {
    colClass: "col4",
    bgColor: BG_KEY_CALCULATOR.Area2,
    keys: [
      { label: "{a}^{n}", keyValue: "{}^{}", picture: buttonAMun1 },
      { label: "{a}_{m}", keyValue: "{}_{}", picture: buttonAm },
      { label: "{a}_{m}^{n}", keyValue: "{}_{}^{}", picture: buttonAMMun },
      { label: "\\dfrac{a}{b}", keyValue: "\\dfrac{}{}" },
      { label: "\\sqrt{a}", keyValue: "\\sqrt{}", picture: buttonCana },
      { label: "\\sqrt[x]{a}", keyValue: "\\sqrt[]{}", picture: buttonCanX },
      { label: "|a|", keyValue: "\\left |\\right |" },
      { label: "\\overline{a}", keyValue: "\\overline{}" },
      { label: "\\infty", keyValue: "\\infty" },
      { label: "+\\infty", keyValue: "+\\infty" },
      { label: "-\\infty", keyValue: "-\\infty" },
      { label: "\\C", keyValue: "\\C" },
      { label: "\\N", keyValue: "\\N" },
      { label: "\\Z", keyValue: "\\Z" },
      { label: "\\Q", keyValue: "\\Q" },
      { label: "\\R", keyValue: "\\R" },
      { label: "\\sum_{i=1}^{n}", keyValue: "\\sum_{i=1}^{n}", fontSize: "8px" },
      {
        label: "\\lim_{x \\to \\infty}",
        keyValue: "\\lim_{x \\to \\infty}",
        fontSize: "9px",
      },
      { label: "\\int_{a}^{b}", keyValue: "\\int_{a}^{b}", fontSize: "12px" },
      { label: "\\log_{x}", keyValue: "\\log_{x}" },
    ]
  },
  {
    colClass: "col4",
    bgColor: BG_KEY_CALCULATOR.Area3,
    keys: [
      { label: "\\in", keyValue: "\\in" },
      { label: "\\notin", keyValue: "\\notin" },
      { label: "\\ni", keyValue: "\\ni" },
      { label: "\\varnothing", keyValue: "\\varnothing" },
      { label: "\\subset", keyValue: "\\subset" },
      { label: "\\supset", keyValue: "\\supset" },
      { label: "\\subseteq", keyValue: "\\subseteq" },
      { label: "\\supseteq", keyValue: "\\supseteq" },
      { label: "\\nsubset", keyValue: "\\nsubset" },
      { label: "\\nsupset", keyValue: "\\nsupset" },
      { label: "\\nsubseteq", keyValue: "\\nsubseteq" },
      { label: "\\nsupseteq", keyValue: "\\nsupseteq" },
      { label: "\\forall", keyValue: "\\forall" },
      { label: "\\exists", keyValue: "\\exists" },
      { label: "\\vee", keyValue: "\\vee" },
      { label: "\\wedge", keyValue: "\\wedge" },
      { label: "\\cup", keyValue: "\\cup" },
      { label: "\\cap", keyValue: "\\cap" },
      { label: "\\setminus", keyValue: "\\setminus" },
    ]
  },
  {
    colClass: "col3",
    bgColor: BG_KEY_CALCULATOR.Area4,
    keys: [
      { label: "\\rightarrow", keyValue: "\\rightarrow" },
      { label: "\\leftarrow", keyValue: "\\leftarrow" },
      { label: "\\Downarrow", keyValue: "\\Downarrow" },
      { label: "\\Updownarrow", keyValue: "\\Updownarrow" },
      { label: "\\uparrow", keyValue: "\\uparrow" },
      { label: "\\downarrow", keyValue: "\\downarrow" },
      { label: "\\Leftrightarrow", keyValue: "\\Leftrightarrow" },
      { label: "\\leftrightarrow", keyValue: "\\leftrightarrow" },
      {
        label: "\\overleftrightarrow{abc}",
        keyValue: "\\overleftrightarrow{abc}",
      },
      { label: "", keyValue: "none" },
      { label: "", keyValue: "none" },
      { label: "", keyValue: "none" },
      { label: "", keyValue: "none" },
      { label: "", keyValue: "none" },
    ]
  },
  {
    colClass: "col3",
    bgColor: BG_KEY_CALCULATOR.Area5,
    keys: [
      { label: "\\parallel", keyValue: "\\parallel" },
      { label: "\\perp", keyValue: "\\perp" },
      { label: "\\sin", keyValue: "\\sin" },
      { label: "\\cos", keyValue: "\\cos" },
      { label: "\\tan", keyValue: "\\tan" },
      { label: "\\cot", keyValue: "\\cot" },
      { label: "\\^{\\circ}", keyValue: "\\circ" },
      { label: "\\triangle", keyValue: "\\triangle" },
      { label: "\\sim", keyValue: "\\sim" },
      { label: "\\overrightarrow{xy}", keyValue: "\\overrightarrow{xy}" },
      { label: "", keyValue: "none" },
      { label: "", keyValue: "none" },
      { label: "", keyValue: "none" },
      { label: "", keyValue: "none" },
      { label: "", keyValue: "none" },
    ]
  },
  {
    colClass: "col4",
    bgColor: BG_KEY_CALCULATOR.Area6,
    keys: [
      { label: "\\alpha", keyValue: "\\alpha" },
      { label: "\\beta", keyValue: "\\beta" },
      { label: "\\Delta", keyValue: "\\Delta" },
      { label: "\\varepsilon", keyValue: "\\varepsilon" },
      { label: "\\lambda", keyValue: "\\lambda" },
      { label: "\\mu", keyValue: "\\mu" },
      { label: "\\eta", keyValue: "\\eta" },
      { label: "\\varphi", keyValue: "\\varphi" },
      { label: "\\psi", keyValue: "\\psi" },
      { label: "\\phi", keyValue: "\\phi" },
      { label: "\\sigma", keyValue: "\\sigma" },
      { label: "\\omega", keyValue: "\\omega" },
      { label: "\\chi", keyValue: "\\chi" },
      { label: "\\gamma", keyValue: "\\gamma" },
      { label: "\\xi", keyValue: "\\xi" },
      { label: "\\zeta", keyValue: "\\zeta" },
      { label: "\\delta", keyValue: "\\delta" },
      { label: "\\theta", keyValue: "\\theta" },
      { label: "\\rho", keyValue: "\\rho" },
      { label: "\\Omega", keyValue: "\\Omega" },
    ]
  },
];

export { LIST_KEY_CALCULATOR };
