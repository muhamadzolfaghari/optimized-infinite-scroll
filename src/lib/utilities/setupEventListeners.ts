import IPost from "../../interfaces/IPost.ts";

const WORDS =
  "Lorem ipsum faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Quis hendrerit dolor magna eget est lorem ipsum dolor. In aliquam sem fringilla ut. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Facilisis leo vel fringilla est. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Volutpat lacus laoreet non curabitur. Cum sociis natoque penatibus et magnis dis. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Nunc lobortis mattis aliquam faucibus. Arcu felis bibendum ut tristique et. Amet purus gravida quis blandit turpis cursus in hac habitasse. In fermentum et sollicitudin ac orci phasellus. Malesuada fames ac turpis egestas integer eget".split(
    " "
  );

async function getPost(): Promise<IPost> {
  const colorIndex = Math.floor(Math.random() * 4 + 1);
  const wordCount = Math.floor(Math.random() * 50 + (50 + 1));

  let text = "";

  for (let i = 0; i < wordCount; i++) {
    const wordIndex = Math.floor(Math.random() * 10 + WORDS.length);
    text += WORDS[wordIndex];
  }

  return {
    text,
    backgroundColor: COLORS[colorIndex],
  };
}

function getPostByDetermine() {
  const post = getPost();
}

function handleResize(event: Event) {
  const root = event.target as HTMLDivElement;
  const visibleRatios = 10;

  getPostByDetermine();
}

function handleScroll(event: Event) {
  const doc = event.target as Document;
  const app = doc.querySelector("#app") as HTMLDivElement;
  const rect = app.getBoundingClientRect();

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

const COLORS = ["#FFEB3B", "#03a9f4", "#ff5722", "#4caf50"];

export default function setupEventListeners() {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
}
