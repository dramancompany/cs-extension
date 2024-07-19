function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function setupEmailClickListener() {
  const ticketNumber = window.location.href.replace(/\D/g, "");

  waitForElement(
    `div[id$="${ticketNumber}"] div[data-test-id="attribute-email-display"] div[color="blue"]`
  ).then((element) => {
    // 모든 기존 'click' 이벤트 리스너를 제거
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);

    // 새 'click' 이벤트 리스너 등록
    newElement.addEventListener("click", () => {
      const encodedEmail =
        newElement.textContent && encodeURIComponent(newElement.textContent);

      window.open(
        `https://foa-v2.rememberapp.co.kr/users/direct_search?value=${encodedEmail}`,
        "_blank",
        "noopener=yes,noreferrer=yes"
      );
    });
  });
}

setupEmailClickListener();
