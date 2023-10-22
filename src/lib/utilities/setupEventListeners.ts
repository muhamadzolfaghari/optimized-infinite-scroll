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

function memorisable<T extends any[]>(func: Function) {
  let caches: Record<string, IPost[]> = {};

  return function (...args: T) {
    const key = args.map(String).join();
    const result = caches[key];

    console.log(key);

    if (!result) {
      return func.apply(func, args);
    }

    return result;
  };
}

const memorizedRunPostsQuery =
  memorisable<[start: number, end: number]>(runPostsQuery);

let canLoad = true;
let postContainers: HTMLDivElement[] = [];

function extracted() {
  const app = document.querySelector("#app") as HTMLDivElement;
  const posts = memorizedRunPostsQuery(
    postContainers.length,
    postContainers.length + 10
  );

  const gutter = document.createElement('div');
  gutter.className = "gutter";
  app.appendChild(gutter);

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let postContainer: HTMLDivElement;

    if (postContainers.length < 10) {
      postContainer = document.createElement("div");
      app.appendChild(postContainer);
    } else {
      postContainer = postContainers[i];

      if (i === 1) {
        console.log(postContainer.getBoundingClientRect().top);
        // window.scrollTo({ top: 0 });
      }
    }

    postContainer.className = "post";
    postContainer.textContent = post.text;
    postContainer.style.background = post.backgroundColor;
    postContainers.push(postContainer);
  }
}

function handleScroll() {
  const app = document.querySelector("#app") as HTMLDivElement;

  if (postContainers.length) {
    const lastPostContainer = postContainers.slice(-1)[0];
    const style = getComputedStyle(lastPostContainer);
    const rect = lastPostContainer.getBoundingClientRect();
    const bottomEdge =
      parseInt(style.paddingBottom) + parseInt(style.marginBottom);
    const visibilityRatio = (rect.bottom + bottomEdge) / window.outerHeight;
    const visibilityPercent = Math.floor(visibilityRatio * 100);

    if (visibilityPercent === 100) {
      canLoad = true;
    }
  }

  if (canLoad) {
    extracted(app);
    canLoad = false;
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
  extracted();

  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
}
