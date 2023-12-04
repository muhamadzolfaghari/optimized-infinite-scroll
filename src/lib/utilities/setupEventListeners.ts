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

function handleResize() {
  // const root = event.target as HTMLDivElement;
  // const visibleRatios = 10;

  getPostByDetermine();
}

let timeoutId: number;
let caches: Record<string, IPost[]> = {};

const runPostsQuery = (since: number): Promise<IPost[]> => {
  clearTimeout(timeoutId);
  let result = caches[since];

  return new Promise((resolve) => {
    if (result) {
      resolve(result);
    }

    timeoutId = setTimeout(() => {
      result = [];

      for (let i = 0; i < 10; i++) {
        result.push(getPost());
      }
      caches[since] = result;

      resolve(result);
    }, 1000);
  });
};

let postContainers: HTMLDivElement[] = [];

async function renderPosts(since: number) {
  const app = document.querySelector("#app") as HTMLDivElement;
  const posts = await runPostsQuery(since);

  if (!postContainers.length) {
    const gutter = document.createElement("div");
    gutter.id = "gutter-top";
    app.appendChild(gutter);
  }

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let postContainer: HTMLDivElement;

    if (postContainers.length < 10) {
      postContainer = document.createElement("div");
      app.appendChild(postContainer);

      if (i === 9) {
        const gutter = document.createElement("div");
        gutter.id = "gutter-bottom";
        app.appendChild(gutter);
      }
    } else {
      postContainer = postContainers[i];
    }

    postContainer.className = "post";
    postContainer.textContent = post.text;
    postContainer.style.background = post.backgroundColor;
    postContainers.push(postContainer);
  }

  // window.scrollTo({
  //   top:
  //      postContainers.slice(-1)[0].getBoundingClientRect().bottom,
  // });
}

function isOutOfTopEdge() {
  const first = postContainers[0];
  const rect = first.getBoundingClientRect();
  const style = getComputedStyle(first);
  const topEdge = parseInt(style.paddingTop) + parseInt(style.marginTop);
  const ratio = (rect.top + topEdge) / window.outerHeight;
  console.log((ratio * 100) === 0)


  return topEdge - rect.top === 0;
}

function isOutOfBottomEdge() {
  const last = postContainers.slice(-1)[0];
  const rect = last.getBoundingClientRect();
  const style = getComputedStyle(last);
  const bottomEdge =
    parseInt(style.paddingBottom) + parseInt(style.marginBottom);
  const ratio = (rect.bottom + bottomEdge) / window.outerHeight;
  return Math.floor(ratio * 100) === 100;
}

let prevScrollY = 0;
let prevCount = 0;

async function handleScroll() {
  const gutterTop = document.querySelector("#gutter-top") as HTMLDivElement;
  const scrollDirection = prevScrollY > window.scrollY ? "up" : "bottom";
  prevScrollY = window.scrollY;

  if (postContainers.length) {
    if (scrollDirection === "bottom") {
      if (isOutOfBottomEdge()) {
        const l = document.body.scrollHeight;
        gutterTop.style.height = document.body.scrollHeight + "px";
        window.scrollTo({ top: l });
        await renderPosts(prevCount += 10);
      }
    } else if (scrollDirection === "up") {
      if (isOutOfTopEdge()) {
        if (prevCount === 0) {
          return;
        }

        await renderPosts(prevCount -= 10);
        const height = postContainers.reduce(
          (prev, cur) => prev + parseInt(getComputedStyle(cur).height),
          0
        );

        window.scrollTo({ top: height - window.scrollY });

        // if (height - parseInt(gutterTop.style.height) < 0) {
        //   return
        // }
        gutterTop.style.height =
          height - parseInt(gutterTop.style.height) + "px";
        //
        // window.scrollTo({ top: document.body.scrollHeight - height });
        // gutterTop.style.height =
        //   height - parseInt(gutterTop.style.height) + "px";

        // window.scrollTo({top: 0});
      }
    }
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
  renderPosts(0, 10);
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
}
