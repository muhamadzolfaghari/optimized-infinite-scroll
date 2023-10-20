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
  // const root = event.target as HTMLDivElement;
  // const visibleRatios = 10;

  getPostByDetermine();
}

const runPostsQuery = (): IPost[] => Array.from(new Array(10)).map(getPost);

const PAGE_THRESHOLD = 100;

function iteratorFactory() {
  let iterator: Iterator<IPost>;

  function* generatorPosts(): Generator<IPost> {
    const posts = runPostsQuery();

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      yield post;
    }
  }

  iterator = generatorPosts();

  function nextPost() {
    let result = iterator.next();

    if (result.done) {
      iterator = generatorPosts();
    }

    return result.value;
  }

  return { nextPost };
}

const { nextPost } = iteratorFactory();

let canLoad = true;
let lastTenPostContainers: HTMLDivElement[];

function handleScroll() {
  if (lastTenPostContainers) {
  }

  if (lastTenPostContainers) {
    const rect = lastTenPostContainers.slice(-1)[0];
    const style = getComputedStyle(lastTenPostContainers);
    const bottomEdge =
      parseInt(style.paddingBottom) + parseInt(style.marginBottom);

    const visibilityRatio = (rect.bottom + bottomEdge) / window.outerHeight;
    const visibilityPercent = Math.floor(visibilityRatio * 100);

    if (visibilityPercent === 100) {
      canLoad = true;
    }
  } else {
    canLoad = false;
  }

  if (canLoad) {
    const post = nextPost();
    const app = document.querySelector("#app") as HTMLDivElement;
    const div = document.createElement("div");
    app.appendChild(div);
    div.className = "post";
    div.textContent = post.text;
    div.style.background = post.backgroundColor;
    lastTenPostContainers.push(div);
  }

  // window.scrollY > rect.bottom - window.outerHeight

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
