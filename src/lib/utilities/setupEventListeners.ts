import IPost from "../../interfaces/IPost.ts";

const WORDS =
  "Lorem ipsum faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Quis hendrerit dolor magna eget est lorem ipsum dolor. In aliquam sem fringilla ut. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Facilisis leo vel fringilla est. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Volutpat lacus laoreet non curabitur. Cum sociis natoque penatibus et magnis dis. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Nunc lobortis mattis aliquam faucibus. Arcu felis bibendum ut tristique et. Amet purus gravida quis blandit turpis cursus in hac habitasse. In fermentum et sollicitudin ac orci phasellus. Malesuada fames ac turpis egestas integer eget".split(
    " "
  );

const COLORS = [
  "#bba700",
  "#03a9f4",
  "#ff5722",
  "#4caf50",

  "#806e11",

  "#cd00e1",
];

function getPost(): IPost {
  const colorIndex = Math.floor(1 + Math.random() * COLORS.length - 1);
  const wordCount = Math.floor(1 + Math.random() * 50);
  let textArray = [];

  for (let i = 0; i < wordCount; i++) {
    const wordIndex = Math.floor(1 + Math.random() * WORDS.length - 1);
    textArray.push(WORDS[wordIndex]);
  }

  return {
    text: textArray.join(" "),
    backgroundColor: COLORS[colorIndex],
  };
}

function getPostByDetermine() {}

function handleResize(event: Event) {
  const root = event.target as HTMLDivElement;
  const visibleRatios = 10;
}

function handleScroll(event: Event) {
  const doc = event.target as Document;
  const app = doc.querySelector("#app") as HTMLDivElement;
  const rect = app.getBoundingClientRect();

  const pagination = 10;

  for (let i = 0; i < pagination; i++) {
    const post = getPost();
    const div = document.createElement("div");
    div.className = "post";
    div.style.background = post.backgroundColor;
    div.textContent = post.text;
    app.appendChild(div);
  }

  //
  // const visiblePx =
  //   ((rect.bottom - window.innerHeight - Math.abs(rect.height);
  // console.log(visiblePx);
  // console.log(app.offsetHeight, document.body.offsetHeight - window.outerHeight);

  if (window.scrollY > document.body.offsetHeight - window.outerHeight) {
    // console.log("It's working!");
    // }
  }
}

export default function setupEventListeners() {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
}
