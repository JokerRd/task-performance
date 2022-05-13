const contacts = document.getElementsByClassName("contacts")[0];
const stickyHeader = document.getElementsByClassName("stickyHeader")[0];

function addContacts() {
  const fragment = document.createDocumentFragment();
  const children = [];
  for (let i = 0; i < 50000; i++) {
    const child = document.createElement("div");
    children.push(child);
  }
  for (let j = 0; j < children.length; j++) {
    children[j].textContent = j;
    children[j].classList.add("contact");
    fragment.appendChild(children[j]);
  }
  contacts.appendChild(fragment);
}

addContacts();

function throttle(callee, timeout) {
  let timer = null;
  return function perform(...args) {
    if (timer) return;
    timer = setTimeout(() => {
      callee(...args);
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

const items = Array.from(contacts.getElementsByClassName("contact"));
const itemsTextContent = items.map(item => item.textContent);
const itemOffsets = items.map((item) => item.offsetTop);

contacts.addEventListener("scroll", throttle(function () {
  const topItemIndex = itemOffsets.findIndex(
      (offset) =>{
        return contacts.scrollTop - offset <= -18
      }
  );
  if (topItemIndex !== -1) {
    stickyHeader.innerText = itemsTextContent[topItemIndex];
  }
}, 250))
